import { useAppStore } from '../stores/useAppStore';

export const SendButton = () => {
    const config = useAppStore(state => state.config);
    const theme = useAppStore(state => state.theme);
    const submitSearch = useAppStore(state => state.submitSearch);
    const isTyping = useAppStore(state => state.isTyping);
    const isStreaming = useAppStore(state => state.isStreaming);

    const styles = config.send_button[theme];
    const layout = config.send_button.layout;
    const isDisabled = isTyping || isStreaming;

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

    return (
        <button id="sendButton" className="input-button"
            onClick={submitSearch}
            disabled={isDisabled}
            style={{
                height: layout.height,
                width: layout.width,
                padding: layout.padding,
                margin: layout.margin,
                borderRadius: layout.border_radius,
                ...backgroundStyles,
                color: styles.text_color,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: isDisabled ? 'default' : 'pointer',
                opacity: isDisabled ? 0.7 : 1,
                transition: 'all 0.3s ease'
            }}>
            <svg width={config.icons.layout.send_icon_size} height={config.icons.layout.send_icon_size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M3.24633 0.000654366L12.7923 0.000653691C12.9403 0.000397438 13.087 0.0293715 13.2238 0.0859164C13.3607 0.142459 13.485 0.22546 13.5897 0.330158C13.6944 0.434856 13.7774 0.559193 13.834 0.696038C13.8905 0.832881 13.9195 0.979541 13.9192 1.12761L13.9192 10.6735C13.9192 10.9724 13.8005 11.2591 13.5891 11.4704C13.3778 11.6818 13.0912 11.8005 12.7923 11.8005C12.4934 11.8005 12.2067 11.6818 11.9954 11.4704C11.7841 11.2591 11.6653 10.9724 11.6653 10.6735L11.6653 3.84422L1.92051 13.589C1.70953 13.8 1.42338 13.9185 1.12501 13.9185C0.826642 13.9185 0.540494 13.8 0.329516 13.589C0.118538 13.3781 1.12881e-05 13.0919 1.12302e-05 12.7935C1.1188e-05 12.4952 0.118538 12.209 0.329516 11.998L10.0743 2.25323L3.24434 2.2539C2.94546 2.2539 2.65881 2.13516 2.44747 1.92382C2.23612 1.71247 2.11739 1.42583 2.11739 1.12694C2.11739 0.828058 2.23612 0.541412 2.44747 0.330067C2.65881 0.118724 2.94546 -7.17132e-06 3.24434 -7.17132e-06L3.24633 0.000654366Z"
                    fill="currentColor" />
            </svg>
        </button>
    );
};
