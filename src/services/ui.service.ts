export const UIService = {
    // Detect theme based on elements behind the widget (Webflow logic)
    detectThemeFromAttributes: (): 'light' | 'dark' => {
        try {
            // Placeholder: In React we might need a Ref to the container
            // For now, we assume global document access like the original script
            const inputContainer = document.querySelector('.input-container');
            if (!inputContainer || !inputContainer.parentElement) return 'light';

            const widgetContainer = inputContainer.parentElement;
            const containerRect = widgetContainer.getBoundingClientRect();

            // Check specific points behind the widget
            const checkPoints = [
                { x: Math.round(containerRect.left + containerRect.width / 2), y: Math.round(containerRect.bottom - 50) },
                { x: Math.round(containerRect.left + containerRect.width / 2), y: Math.round(containerRect.bottom - 100) }
            ];

            let detectedVariant: 'light' | 'dark' = 'light';


            for (const point of checkPoints) {
                const elementBelow = document.elementFromPoint(point.x, point.y);
                if (!elementBelow) continue;

                let currentElement: Element | null = elementBelow;
                while (currentElement && currentElement !== document.body) {
                    const variant = currentElement.getAttribute('data-variant') ||
                        currentElement.getAttribute('variant') ||
                        currentElement.getAttribute('data-test-variant');

                    if (variant === 'light' || variant === 'dark') {
                        detectedVariant = variant;
                        break;
                    }
                    currentElement = currentElement.parentElement;
                }
                if (detectedVariant !== 'light') break;
            }

            return detectedVariant;

        } catch (e) {
            console.warn('Theme detection failed:', e);
            return 'light';
        }
    },

    // Mobile Detection
    isMobile: (): boolean => {
        return window.innerWidth <= 768;
    },

    // Navigation Safety (Prevent leaving during stream)
    setupNavigationSafety: (isStreaming: boolean) => {
        // 1. Browser Level (Refresh/Close)
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isStreaming) {
                e.preventDefault();
                e.returnValue = ''; // Trigger browser prompt
            }
        };

        // 2. Client Side Level (History API - Webflow/React Router)
        // Store originals to restore later
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;

        const interceptHistory = () => {
            const handleInterception = (originalMethod: Function) => {
                return function (this: History, ...args: any[]) {
                    if (isStreaming) {
                        const confirmLeave = window.confirm('Your query is still processing. Are you sure you want to navigate away?');
                        if (!confirmLeave) return;
                    }
                    return originalMethod.apply(this, args);
                };
            };

            history.pushState = handleInterception(originalPushState) as any;
            history.replaceState = handleInterception(originalReplaceState) as any;
        };

        const restoreHistory = () => {
            history.pushState = originalPushState;
            history.replaceState = originalReplaceState;
        };

        if (isStreaming) {
            window.addEventListener('beforeunload', handleBeforeUnload);
            interceptHistory();
        } else {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            restoreHistory();
        }

        // Cleanup function for useEffect
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            restoreHistory();
        };
    }
};

