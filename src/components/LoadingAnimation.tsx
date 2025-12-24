import { useAppStore } from '../stores/useAppStore';
import { DEFAULT_CONFIG } from '../config/default.config';

export const LoadingAnimation = () => {
    const config = useAppStore(state => state.config);
    const theme = useAppStore(state => state.theme);

    // Fallback to default if config.loader is missing (e.g., old config state)
    const loaderConfig = config.loader || DEFAULT_CONFIG.loader;
    const styles = loaderConfig[theme];
    const layout = loaderConfig.layout;

    return (
        <div id="loadingAnimation" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: layout.padding || '2rem',
            borderRadius: layout.border_radius || '0.5rem',
            margin: '1rem'
        }}>
            <div style={{
                width: layout.width || '200px',
                height: layout.height || '200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <svg fill={styles.spinner_color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{
                    width: '40px',
                    height: '40px',
                    marginBottom: '1rem'
                }}>
                    <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                        <animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" />
                    </path>
                </svg>
                <div style={{
                    color: styles.text_color,
                    fontSize: styles.text_size || '14px'
                }}>Processing...</div>
            </div>
        </div>
    );
};
