import React from 'react';
import { useAppStore } from '../stores/useAppStore';


export const Cards = () => {
    const config = useAppStore(state => state.config);
    const theme = useAppStore(state => state.theme);
    const cards = useAppStore(state => state.cards);

    if (!cards || cards.length === 0) return null;

    const styles = config.cards[theme];
    const layout = config.cards.layout;
    const containerConfig = config.response_related_content;
    const containerStyles = containerConfig ? containerConfig[theme] : { background_value: styles.background_value, text_color: styles.text_color, shadow_value: 'none' };
    const containerLayout = containerConfig ? containerConfig.layout : { width: '100%', padding: layout.padding, border_radius: layout.border_radius };

    return (
        <div id="responseRelatedContent" style={{
            display: 'block',
            paddingLeft: (containerLayout as any).padding_left || (containerLayout as any).padding || '1rem',
            paddingRight: (containerLayout as any).padding_right || (containerLayout as any).padding || '1rem',
            paddingTop: '1.5rem',
            paddingBottom: '1.5rem',
            marginBottom: '1.5rem',
            borderRadius: containerLayout.border_radius || '0.375rem',
            backgroundColor: containerStyles.background_value,
            boxShadow: containerStyles.shadow_value && containerStyles.shadow_value !== 'none' ? containerStyles.shadow_value : undefined,
            border: containerStyles.border_color ? `1px solid ${containerStyles.border_color}` : undefined
        }}>
            <h3 style={{
                marginBottom: '1.5rem',
                fontSize: '1.125rem',
                lineHeight: '1.75rem',
                fontWeight: 600,
                letterSpacing: '0.025em',
                textTransform: 'uppercase',
                color: containerStyles.text_color || styles.text_color
            }}>
                YOU MIGHT BE ALSO INTERESTED IN
            </h3>
            <div id="responseRelatedCards"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: layout.grid_gap || '0.75rem'
                }}>
                {cards.map((card, index) => (
                    <CardItem key={index} card={card} styles={styles} layout={layout} />
                ))}
            </div>
        </div>
    );
};

const CardItem = ({ card, styles, layout }: { card: any, styles: any, layout: any }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const shadow = isHovered
        ? (styles.hover_shadow_value || '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)')
        : (styles.shadow_value && styles.shadow_value !== 'none' ? styles.shadow_value : undefined);

    return (
        <div className="resource-card fade-in"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                backgroundColor: styles.background_value,
                borderRadius: layout.card_border_radius || '0.75rem',
                padding: '1rem',
                border: `1px solid ${styles.border_color || (useAppStore.getState().theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#e5e7eb')}`, // Ensure visible default
                cursor: 'pointer',
                opacity: 1,
                boxShadow: shadow,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isHovered ? 'translateY(-2px)' : 'none'
            }}
            onClick={() => window.open(card.url || card.link || card.href, '_blank')}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {card.image && (
                    <img src={card.image} alt={card.title} style={{ width: '100%', height: '6rem', borderRadius: '0.5rem', objectFit: 'cover', display: 'block' }} onError={(e) => e.currentTarget.style.display = 'none'} />
                )}
                <div style={{ flex: '1 1 0%' }}>
                    <h4 style={{ fontWeight: 600, color: styles.text_color, fontSize: '0.9rem', marginBottom: '0.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {card.title}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: styles.subtext_color || styles.text_color, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '0.75rem', opacity: 0.8 }}>
                        {card.description}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', color: '#3B82F6', fontSize: '0.8rem', fontWeight: 500 }}>
                        <span>Read more</span>
                        <svg style={{ width: '1rem', height: '1rem', marginLeft: '0.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const RelatedQuestions = () => {
    const config = useAppStore(state => state.config);
    const theme = useAppStore(state => state.theme);
    const relatedQuestions = useAppStore(state => state.relatedQuestions);
    const setQuery = useAppStore(state => state.setQuery);
    const submitSearch = useAppStore(state => state.submitSearch);


    if (!relatedQuestions || relatedQuestions.length === 0) return null;

    const styles = config.hot_questions[theme]; // Reusing hot_questions styles for consistency
    // Determine text color based on theme for the header
    const headerColor = theme === 'light' ? '#1F2937' : '#E5E7EB';

    const handleQuestionClick = (text: string) => {
        setQuery(text);
        setTimeout(() => submitSearch(), 0);
    };

    return (
        <div id="responseRelatedQuestions"
            style={{
                display: 'block', // Always block if content exists
                paddingLeft: '1rem',
                paddingRight: '1rem',
                paddingTop: '1.5rem',
                paddingBottom: '1.5rem',
                marginBottom: '1.5rem',
                borderRadius: '0.75rem'
            }}>
            <h3 style={{
                marginBottom: '1.5rem',
                fontSize: '1.125rem',
                lineHeight: '1.75rem',
                fontWeight: 600,
                letterSpacing: '0.025em',
                textTransform: 'uppercase',
                color: headerColor
            }}>
                RELATED QUESTIONS
            </h3>

            <div id="responseQuestionsList" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {relatedQuestions.map((item, index) => {
                    // Normalize question text structure
                    const questionText = item.content ? item.content.question : item.question;
                    if (!questionText) return null;

                    return (
                        <div key={index} className="question-item fade-in"
                            onClick={() => handleQuestionClick(questionText)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                opacity: 1, // Animation handled by CSS class
                                backgroundColor: 'transparent', // Default, hover handled by CSS
                                '--suggested-hover-bg': styles.hover_value || 'rgba(0,0,0,0.05)'
                            } as React.CSSProperties} >
                            <svg style={{ width: '1.25rem', height: '1.25rem', color: '#3B82F6', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span style={{ fontSize: '0.875rem', color: styles.text_color }}>
                                {questionText}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div >
    );
};
