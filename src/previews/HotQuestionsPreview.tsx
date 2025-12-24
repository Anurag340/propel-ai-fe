import { HotQuestions } from '../components/HotQuestions';

export const HotQuestionsPreview = () => {
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
            <div style={{ width: '100%', maxWidth: '720px' }}>
                <HotQuestions />
            </div>
        </div>
    );
};
