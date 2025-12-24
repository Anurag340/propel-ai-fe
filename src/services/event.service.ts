import { SessionService } from './session.service';

// Event Tracking Service
// Handles logging user interactions to the backend

interface EventAttributes {
    [key: string]: any;
}

interface EventPayload {
    visitor_id: string;
    session_id: string;
    event: string;
    attributes: EventAttributes | null;
}

// TODO: Move this to a central API config
const API_URL = import.meta.env.VITE_API_URL || 'https://propelwebsiteagent-h2hcc0cae9a6eqdp.centralindia-01.azurewebsites.net';

export const EventService = {
    trackEvent: async (eventName: string, attributes: EventAttributes | null = null) => {
        try {
            const vid = SessionService.getVisitorId();
            const sid = SessionService.getSessionId();

            if (!vid || !sid) {
                console.warn('Cannot track event: Missing IDs');
                return;
            }

            const payload: EventPayload = {
                visitor_id: vid,
                session_id: sid,
                event: eventName,
                attributes: attributes
            };

            // Non-blocking fire-and-forget
            fetch(`${API_URL}/events/track`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'X-API-Key': ... if needed
                },
                body: JSON.stringify(payload)
            }).then(res => {
                if (!res.ok) console.warn('Event tracking failed:', res.status);
            }).catch(err => {
                console.warn('Event tracking error:', err);
            });

        } catch (error) {
            console.warn('Event tracking exception:', error);
        }
    }
};
