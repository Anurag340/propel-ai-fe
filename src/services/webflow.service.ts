export class WebflowIntegrationService {
    private static isListenerAttached = false;

    static setupMessageListener(
        onUpdateConfig: (config: any) => void,
        onResetConfig: () => void,
        onSetTheme: (theme: 'light' | 'dark') => void,
        onFocusComponent: (component: string) => void
    ): () => void {
        console.log('WebflowService: Listener Setup (LocalStorage Sync Active)');

        const handleMessage = (event: MessageEvent) => {
            if (!event.data || typeof event.data !== 'object') {
                return;
            }

            const { type, payload } = event.data;

            if (type === 'UPDATE_CONFIG') {
                onUpdateConfig(payload);
            }

            if (type === 'RESET_CONFIG') {
                console.log('Widget received config reset');
                onResetConfig();
            }

            if (type === 'SET_THEME') {
                console.log('Widget received theme set:', payload);
                onSetTheme(payload);
            }

            if (type === 'SAVE_CONFIG') {
                console.log('Full Widget Config Save:', payload);
                onUpdateConfig(payload);

                // Trigger cross-tab sync via localStorage
                try {
                    localStorage.setItem('PROPEL_SYNC_TRIGGER', JSON.stringify({
                        timestamp: Date.now(),
                        payload
                    }));
                } catch (e) {
                    console.error('Failed to trigger storage sync:', e);
                }
            }

            if (type === 'FOCUS_COMPONENT') {
                console.log('Widget received focus request:', payload);
                onFocusComponent(payload.component);
            }
        };

        // Handle cross-tab storage events
        const handleStorage = (event: StorageEvent) => {
            if (event.key === 'PROPEL_SYNC_TRIGGER' && event.newValue) {
                try {
                    const data = JSON.parse(event.newValue);
                    if (data && data.payload) {
                        console.log('Received Storage Sync:', data.payload);
                        onUpdateConfig(data.payload);
                    }
                } catch (e) {
                    console.error('Error parsing sync data:', e);
                }
            }
        };

        if (!this.isListenerAttached) {
            window.addEventListener('message', handleMessage);
            window.addEventListener('storage', handleStorage);
            this.isListenerAttached = true;
        }

        return () => {
            window.removeEventListener('message', handleMessage);
            window.removeEventListener('storage', handleStorage);
            this.isListenerAttached = false;
        };
    }
    static sendWidgetReady() {
        const target = window.parent || window;
        target.postMessage({
            type: 'WIDGET_READY'
        }, '*');
    }
}
