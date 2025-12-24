import type { StateCreator } from 'zustand';
import { UIService } from '../services/ui.service';

export interface UISlice {
    isOpen: boolean;
    isMinimized: boolean;
    theme: 'light' | 'dark';

    // Actions
    toggleOpen: () => void;
    setOpen: (open: boolean) => void;
    toggleMinimize: () => void;
    setMinimized: (minimized: boolean) => void;
    setTheme: (theme: 'light' | 'dark') => void;
    focusedComponent: string | null;
    setFocusedComponent: (component: string | null) => void;

    isInputFocused: boolean;
    setInputFocused: (focused: boolean) => void;

    isNotificationOpen: boolean;
    toggleNotification: () => void;
    toggleResponseWindow: () => void;

    // Logic
    detectInitialTheme: () => void;
}

export const createUISlice: StateCreator<UISlice> = (set) => ({
    isOpen: false,
    isMinimized: false,
    theme: 'light', // Default, will override on mount

    toggleOpen: () => set((state) => ({ isOpen: !state.isOpen, isMinimized: false })),

    setOpen: (open) => set((state) => ({
        isOpen: open,
        isMinimized: open ? false : state.isMinimized
    })),

    toggleMinimize: () => set((state) => ({ isMinimized: !state.isMinimized })),

    setMinimized: (minimized) => set({ isMinimized: minimized }),

    setTheme: (theme) => set({ theme }),

    focusedComponent: null,
    setFocusedComponent: (component) => set({ focusedComponent: component }),

    isInputFocused: false,
    setInputFocused: (focused) => set({ isInputFocused: focused }),

    detectInitialTheme: () => {
        // Use service to probe DOM/Context
        const detected = UIService.detectThemeFromAttributes();
        set({ theme: detected });
    },

    toggleResponseWindow: () => set((state) => {
        if (!state.isOpen) {
            // Case 1: Window Hidden -> Open it
            return { isOpen: true, isMinimized: false, isNotificationOpen: false };
        } else if (state.isMinimized) {
            // Case 2: Window Minimized -> Restore it
            return { isMinimized: false, isNotificationOpen: false };
        } else {
            // Case 3: Window Open -> Minimize it
            return { isMinimized: true, isNotificationOpen: false };
        }
    }),

    isNotificationOpen: false,
    toggleNotification: () => set((state) => ({ isNotificationOpen: !state.isNotificationOpen }))
});
