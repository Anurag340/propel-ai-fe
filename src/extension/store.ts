import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_CONFIG } from '../config/default.config';
import type { WidgetConfig } from '../config/types';

interface ExtensionState {
    config: WidgetConfig;
    activeSection: string;
    variant: 'light' | 'dark';
    setConfig: (config: WidgetConfig) => void;
    setActiveSection: (section: string) => void;
    setVariant: (variant: 'light' | 'dark') => void;
    updateConfigPath: (path: string, value: any) => void;

    resetConfig: () => void;
}

// Deep clone helper
const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

export const useExtensionStore = create<ExtensionState>()(
    persist(
        (set) => ({
            config: deepClone(DEFAULT_CONFIG),
            activeSection: 'search_bar',
            variant: 'light',

            setConfig: (config) => set({ config }),
            setActiveSection: (section) => set({ activeSection: section }),
            setVariant: (variant) => set({ variant }),

            updateConfigPath: (path, value) => set((state) => {
                const newConfig = deepClone(state.config);
                const keys = path.split('.');
                const lastKey = keys.pop();
                let current: any = newConfig;

                for (const key of keys) {
                    if (!current[key]) current[key] = {};
                    current = current[key];
                }

                if (lastKey) {
                    current[lastKey] = value;
                }

                return { config: newConfig };
            }),

            resetConfig: () => set({ config: deepClone(DEFAULT_CONFIG), activeSection: 'search_bar', variant: 'light' })
        }),
        {
            name: 'propel-extension-storage',
        }
    )
);
