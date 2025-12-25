import { marked } from 'marked';
import { useMemo, useEffect, useState } from 'react';
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
    const minimizeColor = icons.minimize_icon_color || styles.text_color;
    const closeColor = icons.close_icon_color || styles.text_color;
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [animateIn, setAnimateIn] = useState(false);

    useEffect(() => {
        let timeout: any;
        let openDelay: any;

        if (isOpen) {
            // Debounce Opening: Wait 100ms to confirm it's a real open event, not a flicker
            openDelay = setTimeout(() => {
                setShouldRender(true);
                // Double RAF to ensure DOM update (display:flex) happens before transform
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        setAnimateIn(true);
                    });
                });
            }, 50); // 50ms buffer
        } else {
            // Closing: Immediate cleanup trigger
            setAnimateIn(false);
            // Wait for CSS transition (400ms) to complete before hiding
            timeout = setTimeout(() => {
                setShouldRender(false);
            }, 400);
        }
        return () => {
            clearTimeout(timeout);
            clearTimeout(openDelay);
        };
    }, [isOpen]);

    const transformStyle = animateIn
        ? 'translateX(-50%) translateY(0)'
        : 'translateX(-50%) translateY(100%)';

    const renderStyle = {
        display: shouldRender ? 'flex' : 'none',
        // Ensure it is physically hidden if not rendering, redundant safety
        visibility: shouldRender ? 'visible' : 'hidden'
    };

    return (
        <div id="responseWindow" className={`response-window-${theme} ${!isOpen ? 'pointer-events-none' : ''}`}
            style={{
                position: 'fixed',
                bottom: 0,
                left: '50%',
                zIndex: 30,
                flexDirection: 'column',
                borderTopLeftRadius: '0.375rem',
                borderTopRightRadius: '0.375rem',
                width: layout.width || '720px',
                height: layout.height || '80vh',
                transform: transformStyle,
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                overflow: 'hidden',
                backgroundColor: styles.background_value,
                color: styles.text_color,
                ...renderStyle as any
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
