import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { createUISlice, type UISlice } from './uiSlice';
import { createConfigSlice, type ConfigSlice } from './configSlice';
import { createSessionSlice, type SessionSlice } from './sessionSlice';
import { createSearchSlice, type SearchSlice } from './searchSlice';

export type AppState = UISlice & ConfigSlice & SessionSlice & SearchSlice;

export const useAppStore = create<AppState>()(
    devtools(
        persist(
            (...a) => ({
                ...createUISlice(...a),
                ...createConfigSlice(...a),
                ...createSessionSlice(...a),
                ...createSearchSlice(...a),
            }),
            {
                name: 'propel-widget-storage',
                storage: createJSONStorage(() => localStorage),

                partialize: (state) => ({
                    isOpen: state.isOpen,
                    isMinimized: state.isMinimized,
                    theme: state.theme,
                    visitorId: state.visitorId,
                    location: state.location,
                    config: state.config,
                }),
            }
        ),
        { name: 'Propel Widget Store' }
    )
);
