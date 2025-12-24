export const DEFAULT_SHADOW_CONFIG = {
    search_bar: {
        light: '0 10px 60px rgba(62, 36, 135, .5)',
        dark: '20px 10px 60px rgba(62, 36, 135, .6), -12px 4px 20px rgba(85, 22, 84, .3)'
    },
    response_window: {
        light: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 20px -5px rgba(0, 0, 0, 0.1)',
        dark: '20px 10px 60px rgba(62, 36, 135, .6), -12px 4px 20px rgba(85, 22, 84, .3), 0 25px 50px -12px rgba(0, 0, 0, 0.4)'
    },
    hot_questions: {
        light: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        dark: '20px 10px 60px rgba(62, 36, 135, .6), -12px 4px 20px rgba(85, 22, 84, .3)'
    },
    cards: {
        light: 'none', // Default state usually has no shadow or subtle border, hover has shadow
        dark: 'none',
        hover_light: '0 12px 24px -10px rgba(0, 0, 0, .15)',
        hover_dark: '20px 10px 60px rgba(62, 36, 135, .6), -12px 4px 20px rgba(85, 22, 84, .3)'
    },
    suggested_questions: {
        light: 'none',
        dark: 'none' // Usually clean list, but can be customizable
    }
};
