import React from 'react';
import { useAppStore } from '../stores/useAppStore';
import { DEFAULT_SVG_CONFIG } from '../config/svg.config';

export const SearchBar = ({ children }: { children?: React.ReactNode }) => {
    const config = useAppStore(state => state.config);
    const theme = useAppStore(state => state.theme);
    const query = useAppStore(state => state.query);
    const setQuery = useAppStore(state => state.setQuery);
    const submitSearch = useAppStore(state => state.submitSearch);
    // Derived states
    const isTyping = useAppStore(state => state.isTyping);
    const isStreaming = useAppStore(state => state.isStreaming);
    const isProcessing = isTyping || isStreaming;
    // Optimize: Only re-render when existence changes, not content
    const isConversationActive = useAppStore(state => !!state.answerHtml);

    const styles = config.search_bar[theme];
    const layout = config.search_bar.layout;
    const font = config.search_bar.font_family;
    const iconColor = config.icons[theme].search_icon_color;

    const placeholderText = isProcessing
        ? "Processing..."
        : isConversationActive
            ? "Continue conversation"
            : config.search_bar.placeholder_text;

    const placeholderColor = styles.placeholder_color || '#9ca3af';

    // Helper to determine background styles
    const getBackgroundStyles = (value: string) => {
        const isComplex = /url\(|gradient\(/i.test(value);
        if (isComplex) {
            return {
                backgroundImage: value,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            };
        }
        return {
            backgroundColor: value
        };
    };

    const backgroundStyles = getBackgroundStyles(styles.background_value);




    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !isProcessing) {
            submitSearch();
        }
    };

    return (
        <div id="inputContainer" className="input-container"
            style={{
                display: 'flex',
                width: layout.width,
                padding: layout.padding,
                margin: layout.margin,
                borderRadius: layout.border_radius,
                ...backgroundStyles,
                // Add visual cue for processing: pulsing border or shadow
                boxShadow: isProcessing
                    ? `0 0 0 2px ${config.icons[theme].active_color || '#3b82f6'}, ${styles.shadow_value || 'none'}`
                    : (styles.shadow_value || 'none'),
                transition: 'all .3s ease',
                pointerEvents: 'auto',
                height: layout.height,
                opacity: isProcessing ? 0.95 : 1
            }}>
            <div className="input-content" style={{ flex: 1, display: 'flex', gap: '8px', alignItems: 'center' }}>
                {/* Search Icon / Loader / Pencil */}
                <div className="input-icon"
                    style={{ width: config.icons.layout.search_icon_size, height: config.icons.layout.search_icon_size, display: 'flex', alignItems: 'center', justifyContent: 'center', color: iconColor }}>
                    {isProcessing ? (
                        /* Loader Icon */
                        <div style={{ width: '100%', height: '100%', display: 'flex' }} dangerouslySetInnerHTML={{ __html: DEFAULT_SVG_CONFIG.loader_icon.svg }} />
                    ) : isConversationActive ? (
                        /* Pencil Icon */
                        <div style={{ width: '100%', height: '100%', display: 'flex' }} dangerouslySetInnerHTML={{ __html: DEFAULT_SVG_CONFIG.pencil_icon.svg }} />
                    ) : (
                        /* Search Icon */
                        <svg width={config.icons.layout.search_icon_size} height={config.icons.layout.search_icon_size} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16.6165 15.29L12.9064 11.5783C14.0188 10.1286 14.5382 8.31013 14.3591 6.49165C14.1801 4.67318 13.316 2.99089 11.9422 1.78607C10.5684 0.581238 8.78776 -0.0559155 6.96147 0.00385482C5.13517 0.0636252 3.4 0.815844 2.10792 2.10792C0.815844 3.4 0.0636252 5.13517 0.00385482 6.96147C-0.0559155 8.78776 0.581238 10.5684 1.78607 11.9422C2.99089 13.316 4.67318 14.1801 6.49165 14.3591C8.31013 14.5382 10.1286 14.0188 11.5783 12.9064L15.2915 16.6204C15.3787 16.7077 15.4823 16.7768 15.5962 16.824C15.7102 16.8712 15.8323 16.8955 15.9556 16.8955C16.0789 16.8955 16.2011 16.8712 16.315 16.824C16.4289 16.7768 16.5325 16.7077 16.6197 16.6204C16.7069 16.5332 16.7761 16.4297 16.8232 16.3158C16.8704 16.2018 16.8947 16.0797 16.8947 15.9564C16.8947 15.8331 16.8704 15.7109 16.8232 15.597C16.7761 15.4831 16.7069 15.3795 16.6197 15.2923L16.6165 15.29ZM1.89076 7.20326C1.89076 6.15255 2.20233 5.12543 2.78608 4.2518C3.36982 3.37816 4.19952 2.69724 5.17026 2.29515C6.14099 1.89306 7.20916 1.78786 8.23968 1.99284C9.2702 2.19782 10.2168 2.70379 10.9598 3.44676C11.7027 4.18972 12.2087 5.13632 12.4137 6.16684C12.6187 7.19737 12.5135 8.26554 12.1114 9.23627C11.7093 10.207 11.0284 11.0367 10.1547 11.6204C9.28109 12.2042 8.25398 12.5158 7.20326 12.5158C5.79474 12.5143 4.44433 11.9541 3.44836 10.9582C2.45238 9.96219 1.89221 8.61178 1.89076 7.20326Z"
                                fill="currentColor" />
                        </svg>
                    )}
                </div>

                {/* Search Input */}
                <input type="text" id="messageInput" placeholder={placeholderText} className="input-text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => useAppStore.getState().setInputFocused(true)}
                    onBlur={() => {
                        // Small delay to allow clicking on hot questions before they hide
                        setTimeout(() => useAppStore.getState().setInputFocused(false), 200);
                    }}
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        outline: 'none',
                        flex: 1,
                        fontSize: '17px',
                        fontWeight: config.search_bar.font_weight as any,
                        fontFamily: font,
                        color: styles.text_color,
                        '--placeholder-color': placeholderColor
                    } as React.CSSProperties}
                    autoComplete="off"
                    disabled={isProcessing}
                />
            </div>
            {children}
        </div>
    );
};
