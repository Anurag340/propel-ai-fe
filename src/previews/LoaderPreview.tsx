import { useAppStore } from '../stores/useAppStore';
import { LoadingAnimation } from '../components/LoadingAnimation';

export const LoaderPreview = () => {
    const theme = useAppStore(state => state.theme);

    const config = useAppStore(state => state.config);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
            background: 'transparent', // Transparent to let parent/bg show if needed, but here usually just container
            padding: '20px'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '720px', // Match Response Window max width
                backgroundColor: config.response_window[theme].background_value,
                color: config.response_window[theme].text_color,
                borderRadius: config.response_window.layout.border_radius,
                boxShadow: config.response_window[theme].shadow_value,
                padding: '1rem',
                minHeight: '400px', // Simulate window height
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <LoadingAnimation />
            </div>
        </div>
    );
};
