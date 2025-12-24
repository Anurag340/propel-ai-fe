import { RelatedQuestions } from '../components/Cards';
import { useAppStore } from '../stores/useAppStore';
import { useEffect } from 'react';
import { MOCK_RELATED_QUESTIONS } from '../config/mock/questions.response';

export const SuggestedQuestionsPreview = () => {
    const config = useAppStore(state => state.config);
    const theme = useAppStore(state => state.theme);

    // Inject data for preview: Prefer config, fallback to mock
    useEffect(() => {
        const store = useAppStore.getState();
        const configQuestions = config.suggested_questions?.questions;

        if (configQuestions && configQuestions.length > 0) {
            // Map config strings to the object structure expected by RelatedQuestions
            const formattedQuestions = configQuestions.map(q => ({ question: q }));
            useAppStore.setState({ relatedQuestions: formattedQuestions });
        } else if (!store.relatedQuestions || store.relatedQuestions.length === 0) {
            useAppStore.setState({ relatedQuestions: MOCK_RELATED_QUESTIONS });
        }
    }, [config.suggested_questions]);

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            padding: '20px'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '720px',
                // Simulate Response Window context for realistic preview
                backgroundColor: config.response_window[theme].background_value,
                color: config.response_window[theme].text_color,
                borderRadius: config.response_window.layout.border_radius,
                boxShadow: config.response_window[theme].shadow_value,
                padding: '1rem'
            }}>
                <RelatedQuestions />
            </div>
        </div>
    );
};
