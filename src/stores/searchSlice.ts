import type { StateCreator } from 'zustand';
import { MessageService } from '../services/message.service';
import type { SessionSlice } from './sessionSlice';
import type { ConfigSlice } from './configSlice';

import type { UISlice } from './uiSlice';

export interface SearchSlice {
    query: string;
    submittedQuery: string; // New state for header display
    isTyping: boolean;
    isStreaming: boolean;
    // Current Answer State (Replaces old history)
    answerHtml: string | null;
    cards: any[];
    relatedQuestions: any[];
    error: string | null;
    requestId: string | null;
    hasUnreadResponse: boolean;

    // Actions
    setQuery: (q: string) => void;
    markResponseRead: () => void;
    submitSearch: () => Promise<void>;
    abortSearch: () => void;
    resetSearch: () => void;
}

// Combine slices for store access
type AppState = SearchSlice & SessionSlice & ConfigSlice & UISlice;

let abortController: AbortController | null = null;

export const createSearchSlice: StateCreator<
    AppState,
    [],
    [],
    SearchSlice
> = (set, get) => ({
    query: '',
    submittedQuery: '', // Initial state
    isTyping: false,
    isStreaming: false,
    answerHtml: null,
    cards: [],
    relatedQuestions: [],
    error: null,
    requestId: null,

    hasUnreadResponse: false,
    markResponseRead: () => set({ hasUnreadResponse: false }),

    setQuery: (q) => set({ query: q }),

    submitSearch: async () => {
        const { query, visitorId, sessionId, location } = get();

        if (!query.trim()) return;

        // Abort previous if any
        if (abortController) abortController.abort();
        abortController = new AbortController();

        // Updated for "Search Engine" behavior: Reset previous results immediately
        set({
            submittedQuery: query, // Save for header
            isTyping: true,
            isStreaming: true,
            error: null,
            answerHtml: '', // Clear previous answer to show loading/fresh stream
            cards: [],
            relatedQuestions: [],
            query: '', // Clear input to show "Continue conversation" placeholder
            hasUnreadResponse: false, // Reset unread badge
            // Open the window if hidden, but don't force it if minimized (legacy behavior might differ, but generally we want to see the answer)
            // Actually index.js says: responseWindow.classList.remove('hidden'); isMinimized = false;
            isOpen: true,
            isMinimized: false
        });

        // Generate Request ID
        // Note: In a real app we might use a service, here simple UUID
        const requestId = crypto.randomUUID();
        set({ requestId });

        try {
            await MessageService.sendMessageStream(
                {
                    message: query,
                    visitor_id: visitorId,
                    session_id: sessionId,
                    chat_id: sessionId, // Assuming 1:1 mapping for now
                    request_id: requestId,
                    location: location
                },
                (event) => {
                    // Handle different event types from the stream
                    if (event.type === 'chunk') {
                        set((state) => ({
                            answerHtml: (state.answerHtml || '') + event.content
                        }));
                    } else if (event.type === 'card') {
                        set((state) => ({
                            cards: [...state.cards, event]
                        }));
                    } else if (event.type === 'question') {
                        set((state) => ({
                            relatedQuestions: [...state.relatedQuestions, event]
                        }));
                    } else if (event.type === 'done') {
                        set((state) => {
                            // Logic: If window is minimized or closed when done, mark as unread
                            const isHiddenOrMinimized = !state.isOpen || state.isMinimized;
                            console.log('[SearchSlice] DONE Event. isOpen:', state.isOpen, 'isMinimized:', state.isMinimized, 'SETTING hasUnread:', isHiddenOrMinimized);
                            return {
                                isTyping: false,
                                isStreaming: false,
                                hasUnreadResponse: isHiddenOrMinimized
                            };
                        });
                        abortController = null;
                    } else if (event.type === 'error') {
                        set({ error: event.content, isTyping: false, isStreaming: false });
                    }
                },
                (err) => {
                    console.error('Stream error:', err);
                    set({ error: 'Failed to get response. Please try again.', isTyping: false, isStreaming: false });
                },
                () => {
                    // Complete handler (called after stream closes)
                    // We handle 'done' event above, but this is a fallback cleanup
                    set((state) => {
                        if (state.isStreaming) {
                            // Fallback: If for some reason 'done' wasn't fired but stream closed
                            const isHiddenOrMinimized = !state.isOpen || state.isMinimized;
                            return { isTyping: false, isStreaming: false, hasUnreadResponse: isHiddenOrMinimized };
                        }
                        return {};
                    });
                    abortController = null;
                },
                abortController.signal
            );
        } catch (e: any) {
            if (e.name !== 'AbortError') {
                set({ error: e.message, isTyping: false, isStreaming: false });
            }
        }
    },

    abortSearch: () => {
        if (abortController) {
            abortController.abort();
            abortController = null;
            set({ isTyping: false, isStreaming: false });
        }
    },

    resetSearch: () => {
        if (abortController) abortController.abort();
        set({
            query: '',
            submittedQuery: '', // Clear header display
            isTyping: false,
            isStreaming: false,
            answerHtml: null,
            cards: [],
            relatedQuestions: [],
            error: null,
            hasUnreadResponse: false,
            requestId: null
        });
    }
});
