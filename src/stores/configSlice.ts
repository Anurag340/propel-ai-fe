import type { StateCreator } from 'zustand';
import { DEFAULT_CONFIG } from '../config/default.config';
import type { WidgetConfig } from '../config/types';

export interface ConfigSlice {
    config: WidgetConfig;
    // Generic update for "search_bar.light.background_value" -> "red"
    updateConfig: (path: string, value: any) => void;
    // Bulk update (e.g. loading from API)
    setFullConfig: (newConfig: Partial<WidgetConfig>) => void;
    resetConfig: () => void;
    isEnabled: boolean;
    toggleEnabled: () => void;
    setIsEnabled: (enabled: boolean) => void;
}

// Helper for deep merging configurations
const deepMerge = (target: any, source: any): any => {
    const output = { ...target };
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target)) {
                    Object.assign(output, { [key]: source[key] });
                } else {
                    output[key] = deepMerge(target[key], source[key]);
                }
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
};

const isObject = (item: any) => {
    return (item && typeof item === 'object' && !Array.isArray(item));
};

export const createConfigSlice: StateCreator<ConfigSlice> = (set) => ({
    config: DEFAULT_CONFIG,

    updateConfig: (path: string, value: any) => set((state) => {
        const newConfig = JSON.parse(JSON.stringify(state.config));
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

    setFullConfig: (newConfig) => set((state) => ({
        config: deepMerge(state.config, newConfig)
    })),

    resetConfig: () => set({ config: DEFAULT_CONFIG }),

    // Enable/Disable Widget
    isEnabled: false, // Default to disabled as per flow "OnClick Enable -> Appear"
    toggleEnabled: () => set((state) => ({ isEnabled: !state.isEnabled })),
    setIsEnabled: (enabled: boolean) => set({ isEnabled: enabled })
});
