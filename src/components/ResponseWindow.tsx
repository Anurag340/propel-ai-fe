import { marked } from 'marked';
import { useMemo, useEffect } from 'react';
import { Cards, RelatedQuestions } from './Cards';
import { LoadingAnimation } from './LoadingAnimation';
import { useAppStore } from '../stores/useAppStore';
import { DEFAULT_SVG_CONFIG } from '../config/svg.config';

export const ResponseWindow = () => {
    const config = useAppStore(state => state.config);
    const theme = useAppStore(state => state.theme);
    const isOpen = useAppStore(state => state.isOpen);
    const isMinimized = useAppStore(state => state.isMinimized);

    const setOpen = useAppStore(state => state.setOpen);
    const toggleMinimize = useAppStore(state => state.toggleMinimize);
    const query = useAppStore(state => state.submittedQuery); // Use persisting query
    const answerHtml = useAppStore(state => state.answerHtml);
    const isStreaming = useAppStore(state => state.isStreaming);
    const markResponseRead = useAppStore(state => state.markResponseRead);
    const resetSearch = useAppStore(state => state.resetSearch);

    // Effect: Mark as read when window is visible
    // Effect: Mark as read when window is visible
    useEffect(() => {
        if (isOpen && !isMinimized && !isStreaming) {
            // Use timeout to allow render cycle to complete, preventing flicker
            const timer = setTimeout(() => markResponseRead(), 100);
            return () => clearTimeout(timer);
        }
    }, [isOpen, isMinimized, isStreaming, markResponseRead]);

    const handleClose = () => {
        resetSearch(); // Flush all content including inputs and results
        setOpen(false); // Close the window
    };

    const styles = config.response_window[theme];
    const layout = config.response_window.layout;
    const icons = config.icons[theme]; // Get icon colors

    // Fallback if not yet in config (backward compat)
    const minimizeColor = icons.minimize_icon_color || styles.text_color;
    const closeColor = icons.close_icon_color || styles.text_color;

    const transformStyle = isOpen && !isMinimized
        ? 'translateX(-50%) translateY(0)'
        : 'translateX(-50%) translateY(100%)';

    return (
        <div id="responseWindow"
            style={{
                display: 'flex',
                position: 'fixed',
                bottom: 0,
                left: '50%',
                zIndex: 30,
                flexDirection: 'column',
                borderTopLeftRadius: layout.border_radius || '0.375rem',
                borderTopRightRadius: layout.border_radius || '0.375rem',
                boxShadow: styles.shadow_value || '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                width: layout.width || '720px',
                height: layout.height || '80vh',
                transform: transformStyle,
                // Fix Flicker: Delay visibility hidden until transform completes
                visibility: isOpen ? 'visible' : 'hidden',
                transition: `transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), visibility 0s linear ${isOpen ? '0s' : '0.4s'}`,
                overflow: 'hidden',
                backgroundColor: styles.background_value,
                color: styles.text_color
            }}>

            {/* Response Container */}
            <div className="response-container"
                style={{ display: 'flex', flexDirection: 'column', flex: '1 1 0%', minHeight: 0 }}>

                {/* Top Header */}
                <div className="response-header" style={{ borderBottomWidth: '1px', borderBottomColor: '#E5E7EB', padding: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {/* Question Text */}
                        <div style={{ flex: '1 1 0%', minWidth: 0, maxWidth: 'calc(100% - 120px)' }}>
                            <h3 id="responseQuestion" className="response-question"
                                style={{
                                    fontSize: '1rem',
                                    lineHeight: '1.25rem',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    width: '100%',
                                    color: styles.text_color, // Explicit color from config
                                    margin: 0                 // Reset default margins
                                }}>
                                {query}
                            </h3>
                        </div>

                        {/* Right Controls */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            {/* Minimize Button */}
                            <button id="minimizeResponseWindow" title="Minimize" onClick={toggleMinimize}
                                style={{ padding: '0.5rem', borderRadius: '0.375rem', transition: 'all .2s', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', color: minimizeColor }}>
                                <div style={{ width: '1.25rem', height: '1.25rem', display: 'flex' }} dangerouslySetInnerHTML={{ __html: DEFAULT_SVG_CONFIG.minimize_icon.svg }} />
                            </button>

                            {/* Close Button */}
                            <button id="closeResponseWindow" title="Close" className="close-button" onClick={handleClose}
                                style={{ padding: '0.5rem', transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', transitionDuration: '300ms', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: closeColor }}>
                                <div style={{ width: '1.25rem', height: '1.25rem', display: 'flex' }} dangerouslySetInnerHTML={{ __html: DEFAULT_SVG_CONFIG.close_icon.svg }} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Response Content */}
                <div id="responseScrollContainer"
                    style={{ overflowY: 'auto', padding: '1rem', paddingBottom: '6rem', flex: '1 1 0%', minHeight: 0 }}>
                    <div style={{ maxWidth: '72rem', margin: '0 auto' }}>

                        {/* Rendering Loader */}
                        {((useAppStore(state => state.isTyping) || isStreaming) && !answerHtml) && (
                            <LoadingAnimation />
                        )}

                        {/* Text Content */}
                        <div id="responseContent"
                            style={{ paddingLeft: '1rem', paddingRight: '1rem', borderRadius: '0.5rem', minHeight: '2rem' }}>
                            <div id="responseMessages" className="answer-content" style={{ display: 'flex', flexDirection: 'column' }}
                                dangerouslySetInnerHTML={{ __html: useMemo(() => marked.parse(answerHtml || '') as string, [answerHtml]) }}
                            />
                        </div>

                        <Cards />
                        <RelatedQuestions />

                    </div>
                </div>
            </div>
        </div>
    );
};
