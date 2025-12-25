import { useEffect, useState } from 'react';
import { useAppStore } from './stores/useAppStore';
import { UIService } from './services/ui.service';
import { WebflowIntegrationService } from './services/webflow.service';
import { ResponseWindow } from './components/ResponseWindow';
import { HotQuestions } from './components/HotQuestions';
import { SearchBar } from './components/SearchBar';
import { NotificationButton } from './components/NotificationButton';
import { NotificationPanel } from './components/NotificationPanel';
import { SendButton } from './components/SendButton';

// Preview Components
import { SearchBarPreview } from './previews/SearchBarPreview';
import { HotQuestionsPreview } from './previews/HotQuestionsPreview';
import { ResponseWindowPreview } from './previews/ResponseWindowPreview';
import { CardsPreview } from './previews/CardsPreview';
import { SuggestedQuestionsPreview } from './previews/SuggestedQuestionsPreview';
import { LoaderPreview } from './previews/LoaderPreview';

export const Widget = () => {
    // Check enable state (default true)
    const [isEnabled, setIsEnabled] = useState(() => {
        return localStorage.getItem('propel_widget_enabled') !== 'false';
    });

    // Listen for storage changes (to sync with Dashboard if open in same window/tab context)
    useEffect(() => {
        const handleStorage = () => {
            setIsEnabled(localStorage.getItem('propel_widget_enabled') !== 'false');
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const detectInitialTheme = useAppStore(state => state.detectInitialTheme);
    const initializeSession = useAppStore(state => state.initializeSession);
    const isStreaming = useAppStore(state => state.isStreaming);
    const setOpen = useAppStore(state => state.setOpen);
    const setFullConfig = useAppStore(state => state.setFullConfig);
    const resetConfig = useAppStore(state => state.resetConfig);
    const focusedComponent = useAppStore(state => state.focusedComponent);
    const setFocusedComponent = useAppStore(state => state.setFocusedComponent);

    // NOTE: Logic moved below hooks to ensure listeners are attached.

    useEffect(() => {
        // Initial setup and message listeners - Force Refresh 3 (LocalStorage)
        detectInitialTheme();
        initializeSession();
        WebflowIntegrationService.sendWidgetReady();

        // Listen for Webflow Designer updates
        const cleanupListener = WebflowIntegrationService.setupMessageListener(
            (newConfig) => setFullConfig(newConfig),
            () => resetConfig(),
            (theme) => useAppStore.getState().setTheme(theme),
            (component) => {
                // Update focused component state for Isolation Mode
                setFocusedComponent(component);
            }
        );

        return () => {
            cleanupListener();
        };
    }, [detectInitialTheme, initializeSession, setFullConfig, resetConfig, setFocusedComponent]);

    const isOpen = useAppStore(state => state.isOpen);

    useEffect(() => {
        if (isStreaming) {
            setOpen(true);
        }
        return UIService.setupNavigationSafety(isStreaming);
    }, [isStreaming, setOpen]);

    // Resize Logic (Communicates with embed.ts)
    // State for Hot Questions visibility logic (Matches HotQuestions.tsx)
    const isInputFocused = useAppStore(state => state.isInputFocused);
    const answerHtml = useAppStore(state => state.answerHtml);
    // focusedComponent is already declared above, so we don't redeclare it here.
    // Explicitly derive "Hot Questions Visible" state
    const isHotQuestionsVisible = focusedComponent === 'hot_questions' || (isInputFocused && !isStreaming && !answerHtml);

    // Resize Logic (Communicates with embed.ts)
    useEffect(() => {
        try {
            if (isOpen) {
                // Expanded State: Full Window (Answer Visible)
                // Use 95vh to ensure the 80vh window + shadows + book button fit comfortably
                window.parent.postMessage({
                    type: 'PROPEL_RESIZE',
                    width: '800px',
                    height: '95vh'
                }, '*');
            } else if (isHotQuestionsVisible) {
                // Intermediate State: Search Focused + Hot Questions Visible
                // Needs enough space for the list (approx 300-400px) + Input Bar
                window.parent.postMessage({
                    type: 'PROPEL_RESIZE',
                    width: '800px',
                    height: '600px'
                }, '*');
            } else {
                // Collapsed State: Bottom Strip Only
                window.parent.postMessage({
                    type: 'PROPEL_RESIZE',
                    width: '800px',
                    height: '160px'
                }, '*');
            }
        } catch (e) {
            console.error("Failed to post resize message", e);
        }
    }, [isOpen, isHotQuestionsVisible]);


    const bottomPanelStyle = {
        display: 'flex',
        position: 'fixed' as const,
        right: 0,
        bottom: 0,
        left: 0,
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingBottom: '1.5rem',
        flexDirection: 'column' as const,
        alignItems: 'center',
        transitionProperty: 'all',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '300ms',
        zIndex: 999999,
        pointerEvents: 'none' as const
    };

    // If disabled, render nothing (after hooks execution is debatable, 
    // but safe here as we returned null. Ideally hooks should always run, 
    // so we return null after hooks).
    if (!isEnabled) return null;

    // ISOLATION MODE RENDERER
    if (focusedComponent) {
        switch (focusedComponent) {
            case 'search_bar':
                return <SearchBarPreview />;
            case 'hot_questions':
                return <HotQuestionsPreview />;
            case 'response_window':
                return <ResponseWindowPreview />;
            case 'cards':
                return <CardsPreview />;
            case 'suggested_questions':
                return <SuggestedQuestionsPreview />;
            case 'loader':
                return <LoaderPreview />;
            default:
                // Fallback or specific future cases
                break;
        }
    }

    return (
        <div style={{ margin: 0, padding: 0, overflow: 'hidden', position: 'relative', height: '100vh', width: '100vw', background: 'transparent', pointerEvents: 'none' }}>
            <div id="chatWidget"
                style={{ zIndex: 9999999, position: 'fixed', right: 0, bottom: 0, left: 0, width: '100%', maxHeight: '80vh', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', pointerEvents: 'auto' }}>

                <ResponseWindow />

                <div id="bottomPanel" style={bottomPanelStyle}>

                    <HotQuestions />

                    {/* Input Bar */}
                    <div style={{ width: '100%', maxWidth: '42rem', display: 'flex', justifyContent: 'center' }}>
                        <SearchBar>
                            <div className="input-bar-buttons" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                                <NotificationPanel />
                                <NotificationButton />
                                <SendButton />
                            </div>
                        </SearchBar>
                    </div>
                </div>
            </div>
        </div>
    )
}
