import { useAppStore } from '../stores/useAppStore';

export const NotificationButton = () => {
    const config = useAppStore(state => state.config);
    const theme = useAppStore(state => state.theme);

    // Logic: Toggle Response Window (Open -> Minimize -> Restore)
    const toggleResponseWindow = useAppStore(state => state.toggleResponseWindow);

    // Badge State: Show if unread response exists
    const hasUnreadResponse = useAppStore(state => state.hasUnreadResponse);

    // Also clear badge if window is open and not minimized (instant feedback if store update is delayed)
    const isOpen = useAppStore(state => state.isOpen);
    const isMinimized = useAppStore(state => state.isMinimized);

    const showBadge = hasUnreadResponse && (isMinimized || !isOpen);

    const defaultColor = config.icons[theme].notification_color;
    // Highlight icon if badge is active or window is open
    const activeColor = config.icons[theme].active_color || '#3b82f6';
    const iconColor = (isOpen && !isMinimized) ? activeColor : defaultColor;

    return (
        <button id="propelNotifyButton" title="View Response" onClick={toggleResponseWindow}
            style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                width: 'auto',
                height: 'auto',
                borderRadius: config.icons.layout.button_border_radius,
                border: 'none',
                cursor: 'pointer',
                color: iconColor
            }}>
            <svg data-custom-id="BellIcon" width={config.icons.layout.notification_size} height={config.icons.layout.notification_size} viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M14 21H10M18 8C18 6.4087 17.3679 4.88258 16.2427 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.8826 2.63214 7.75738 3.75736C6.63216 4.88258 6.00002 6.4087 6.00002 8C6.00002 11.0902 5.22049 13.206 4.34968 14.6054C3.61515 15.7859 3.24788 16.3761 3.26134 16.5408C3.27626 16.7231 3.31488 16.7926 3.46179 16.9016C3.59448 17 4.19261 17 5.38887 17H18.6112C19.8074 17 20.4056 17 20.5382 16.9016C20.6852 16.7926 20.7238 16.7231 20.7387 16.5408C20.7522 16.3761 20.3849 15.7859 19.6504 14.6054C18.7795 13.206 18 11.0902 18 8Z"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span id="propelNotifyBadge"
                style={{
                    display: showBadge ? 'block' : 'none',
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    width: '8px',
                    height: '8px',
                    background: '#ef4444',
                    borderRadius: '9999px',
                    border: '1px solid white'
                }}></span>
        </button>
    );
};
