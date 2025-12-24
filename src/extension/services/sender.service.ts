export const WebflowSenderService = {
    // Send full update
    sendConfigUpdate: (config: any) => {
        // In the real Webflow Designer, we might need to target a specific iframe or use the Webflow API.
        // For 'Hybrid App' mode where this extension runs in an iframe alongside the site canvas:
        // We broadcast to the parent (Designer) or if we are a peer, we might need a specific target.
        // Assuming standard 'postMessage' to window.parent or specific frame integration.
        // For local dev with the Simulator, we target '*' or specific frame.

        // Use a slight throttle/debounce if needed in the UI layer, but here we just send.
        const target = window.parent || window;
        target.postMessage({
            type: 'UPDATE_CONFIG',
            payload: config
        }, '*');
    },

    sendReset: () => {
        const target = window.parent || window;
        target.postMessage({
            type: 'RESET_CONFIG'
        }, '*');
    },

    sendFocusComponent: (component: string) => {
        const target = window.parent || window;
        target.postMessage({
            type: 'FOCUS_COMPONENT',
            payload: { component }
        }, '*');
    },

    sendTheme: (theme: 'light' | 'dark') => {
        const target = window.parent || window;
        target.postMessage({
            type: 'SET_THEME',
            payload: theme
        }, '*');
    },

    saveConfig: (config: any) => {
        const target = window.parent || window;
        target.postMessage({
            type: 'SAVE_CONFIG',
            payload: config
        }, '*');
    }
};
