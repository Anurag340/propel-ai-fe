import type { StateCreator } from 'zustand';
import { SessionService } from '../services/session.service';

export interface SessionSlice {
    visitorId: string;
    sessionId: string;
    location: string | null;
    initializeSession: () => Promise<void>;
}

export const createSessionSlice: StateCreator<SessionSlice> = (set) => ({
    visitorId: '',
    sessionId: '',
    location: null,

    initializeSession: async () => {
        // 1. Get/Create ephemeral Visitor ID (persisted only in sessionStorage by service for safety, 
        //    but here we load it into state)
        const vid = SessionService.getVisitorId();

        // 2. Get/Create Session ID
        const sid = SessionService.getSessionId();

        set({ visitorId: vid, sessionId: sid });

        // 3. Detect Location (Async)
        // Check if we already have it in cookie to avoid re-fetch overhead
        const existingLoc = SessionService.getCookie('propel_user_location');
        if (existingLoc) {
            set({ location: existingLoc });
        } else {
            // Fire and forget location detection
            SessionService.detectUserLocation().then(loc => {
                if (loc) set({ location: loc });
            });
        }
    }
});
