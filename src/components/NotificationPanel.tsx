import { useAppStore } from '../stores/useAppStore';

export const NotificationPanel = () => {
    const config = useAppStore(state => state.config);
    const theme = useAppStore(state => state.theme);
    const isOpen = useAppStore(state => state.isNotificationOpen);

    if (!isOpen) return null;

    const styles = config.response_window[theme]; // Reuse window styles for consistency

    return (
        <div style={{
            position: 'absolute',
            bottom: '100%',
            marginBottom: '10px',
            right: 0,
            width: '300px',
            backgroundColor: styles.background_value,
            color: styles.text_color,
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            padding: '1rem',
            zIndex: 50,
            border: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}`
        }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', fontWeight: 600 }}>Notifications</h3>
            <p style={{ fontSize: '0.875rem', color: theme === 'light' ? '#6b7280' : '#9ca3af' }}>
                No new notifications.
            </p>
        </div>
    );
};
