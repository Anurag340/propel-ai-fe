import { useState, useEffect } from 'react';
import { useAppStore } from '../stores/useAppStore';

const QuestionItem = ({ text, onClick, styles, theme, iconSize }: { text: string, onClick: () => void, styles: any, theme: string, iconSize: string }) => {
    // Fallback if config is missing hover_value
    const hoverColor = styles.hover_value || (theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgb(243, 244, 246)');

    return (
        <div className="question-item"
            onClick={onClick}
            style={{
                display: 'flex',
                padding: '0.75rem',
                gap: '0.75rem',
                alignItems: 'center',
                borderRadius: '0.5rem',
                transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDuration: '300ms',
                cursor: 'pointer',
                // Use CSS variable to allow index.css to pick it up, or override if possible. 
                // Since index.css has !important on :hover, we must rely on the variable it uses.
                // @ts-ignore
                '--suggested-hover-bg': hoverColor,
                boxShadow: 'none' // Force no shadow as requested
            }}>
            <svg width={iconSize} height={iconSize} style={{ color: '#3B82F6', flexShrink: 0 }} fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span style={{ fontSize: '0.875rem', color: styles.text_color }}>{text}</span>
        </div>
    );
};

export const HotQuestions = () => {
    const config = useAppStore(state => state.config);
    const theme = useAppStore(state => state.theme);
    const isStreaming = useAppStore(state => state.isStreaming);
    const focusedComponent = useAppStore(state => state.focusedComponent);
    const answerHtml = useAppStore(state => state.answerHtml);
    const setQuery = useAppStore(state => state.setQuery);
    const submitSearch = useAppStore(state => state.submitSearch);

    const isInputFocused = useAppStore(state => state.isInputFocused);

    // Logic for smooth transition (Mount -> Fade In -> Fade Out -> Unmount)
    const shouldBeVisible = focusedComponent === 'hot_questions' || (isInputFocused && !isStreaming && !answerHtml);
    const [shouldRender, setShouldRender] = useState(false);
    const [animateVisible, setAnimateVisible] = useState(false);

    useEffect(() => {
        let timeout: any;
        let openDelay: any;

        if (shouldBeVisible) {
            // Debounce Opening: Wait 50ms to confirm it's a real focus event
            openDelay = setTimeout(() => {
                setShouldRender(true);
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        setAnimateVisible(true);
                    });
                });
            }, 50);
        } else {
            setAnimateVisible(false);
            // Wait for transition to finish before unmounting
            timeout = setTimeout(() => {
                setShouldRender(false);
            }, 300); // Matches CSS duration
        }
        return () => {
            clearTimeout(timeout);
            clearTimeout(openDelay);
        };
    }, [shouldBeVisible]);

    const styles = config.hot_questions[theme];
    const layout = config.hot_questions.layout;

    // Container styles from specific config
    const containerStyles = config.hot_questions_container ? config.hot_questions_container[theme] : { background_value: styles.background_value, text_color: styles.text_color, shadow_value: styles.shadow_value };
    const containerLayout = config.hot_questions_container ? config.hot_questions_container.layout : { width: '640px', padding: layout.padding, border_radius: layout.border_radius };

    const handleQuestionClick = (text: string) => {
        setQuery(text);
        setTimeout(() => submitSearch(), 0);
    };

    const questions = config.hot_questions.questions || [];

    return (
        <div id="hotQuestions" className={`hot-questions-transition ${!shouldRender ? 'hidden' : ''}`}
            style={{
                marginBottom: '1rem',
                width: '100%',
                opacity: animateVisible ? 1 : 0,
                transform: animateVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: animateVisible ? 'auto' : 'none',
                display: shouldRender ? 'flex' : 'none',
                justifyContent: 'center'
            }}>
            <div id="hotQuestionsContainer"
                style={{
                    width: containerLayout.width,
                    margin: '0 auto',
                    padding: containerLayout.padding,
                    borderRadius: containerLayout.border_radius,
                    borderWidth: '1px',
                    borderColor: 'rgba(0,0,0,0.1)', // Add subtle border if missing in config or as default
                    backgroundColor: containerStyles.background_value,
                    color: containerStyles.text_color,
                    boxShadow: containerStyles.shadow_value || 'none',
                    pointerEvents: 'auto'
                }}>
                <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column' }}>
                    {questions.map((q, i) => (
                        <QuestionItem key={i} text={q} onClick={() => handleQuestionClick(q)} styles={styles} theme={theme} iconSize={layout.icon_size} />
                    ))}
                </div>
            </div>
        </div>
    );
};
