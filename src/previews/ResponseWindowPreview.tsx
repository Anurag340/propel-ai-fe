import { ResponseWindow } from '../components/ResponseWindow';
import { useAppStore } from '../stores/useAppStore';
import { useEffect } from 'react';
import { MOCK_ANSWER_MARKDOWN } from '../config/mock/answer.response';
import { MOCK_CARDS } from '../config/mock/cards.response';
import { MOCK_RELATED_QUESTIONS } from '../config/mock/questions.response';

export const ResponseWindowPreview = () => {
    // Inject mock data for preview
    useEffect(() => {
        const store = useAppStore.getState();
        if (!store.query) useAppStore.setState({ query: 'How does Propel help with customer retention?' });
        if (!store.answerHtml) useAppStore.setState({ answerHtml: MOCK_ANSWER_MARKDOWN });
        if (!store.cards || store.cards.length === 0) useAppStore.setState({ cards: MOCK_CARDS });
        if (!store.relatedQuestions || store.relatedQuestions.length === 0) useAppStore.setState({ relatedQuestions: MOCK_RELATED_QUESTIONS });
    }, []);

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
            <div style={{ position: 'relative', width: '100%', maxWidth: '720px', height: '80vh', boxShadow: 'none' }}>
                <div className="response-preview-wrapper" style={{ transform: 'none', position: 'static' }}>
                    <ResponseWindow />
                </div>
                <style>{`
                    #responseWindow { 
                        position: absolute !important; 
                        top: 0 !important; 
                        left: 0 !important; 
                        bottom: auto !important;
                        transform: none !important; 
                        width: 100% !important;
                        height: 100% !important;
                    }
                `}</style>
            </div>
        </div>
    );
};
