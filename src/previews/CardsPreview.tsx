import { Cards } from '../components/Cards';
import { useAppStore } from '../stores/useAppStore';
import { useEffect } from 'react';
import { MOCK_CARDS } from '../config/mock/cards.response';

export const CardsPreview = () => {
    // Inject mock data for preview
    useEffect(() => {
        const store = useAppStore.getState();
        if (!store.cards || store.cards.length === 0) {
            useAppStore.setState({ cards: MOCK_CARDS });
        }
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
            <div style={{ width: '100%', maxWidth: '720px' }}>
                <Cards />
            </div>
        </div>
    );
};
