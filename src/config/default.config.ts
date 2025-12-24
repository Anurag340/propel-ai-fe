import type { WidgetConfig } from './types';
import { DEFAULT_SVG_CONFIG as SVG_CONFIG } from './svg.config';
import { DEFAULT_BG_COLOR_CONFIG as BG_COLOR_CONFIG } from './bgcolor.config';
import { DEFAULT_TXT_COLOR_CONFIG as TXT_COLOR_CONFIG } from './txtcolor.config';
import { DEFAULT_LAYOUT_CONFIG as LAYOUT_CONFIG } from './layout.config';
import { DEFAULT_SHADOW_CONFIG as SHADOW_CONFIG } from './shadow.config';

export const DEFAULT_CONFIG: WidgetConfig = {
    search_bar: {
        layout: {
            height: LAYOUT_CONFIG.search_bar.height,
            width: LAYOUT_CONFIG.search_bar.width,
            padding: LAYOUT_CONFIG.search_bar.padding,
            margin: LAYOUT_CONFIG.search_bar.margin,
            border_radius: LAYOUT_CONFIG.search_bar.border_radius
        },
        light: {
            background_value: BG_COLOR_CONFIG.search_bar.light,
            text_color: TXT_COLOR_CONFIG.search_bar.light,
            placeholder_color: '#6b7280', // Gray-500
            shadow_value: SHADOW_CONFIG.search_bar.light
        },
        dark: {
            background_value: BG_COLOR_CONFIG.search_bar.dark,
            text_color: TXT_COLOR_CONFIG.search_bar.dark,
            placeholder_color: '#9ca3af', // Gray-400
            shadow_value: SHADOW_CONFIG.search_bar.dark
        },
        font_family: 'Inter',
        font_weight: '400',
        placeholder_text: "Find what you're looking for..."
    },
    send_button: {
        layout: {
            height: LAYOUT_CONFIG.send_button.height,
            width: LAYOUT_CONFIG.send_button.width,
            padding: LAYOUT_CONFIG.send_button.padding,
            margin: LAYOUT_CONFIG.send_button.margin,
            border_radius: LAYOUT_CONFIG.send_button.border_radius
        },
        light: {
            background_value: BG_COLOR_CONFIG.send_button.light,
            text_color: TXT_COLOR_CONFIG.buttons.send_light
        },
        dark: {
            background_value: BG_COLOR_CONFIG.send_button.dark,
            text_color: TXT_COLOR_CONFIG.buttons.send_dark
        }
    },
    icons: {
        layout: {
            size_default: LAYOUT_CONFIG.icons.size_default,
            svg_size: LAYOUT_CONFIG.icons.svg_size,
            notification_size: LAYOUT_CONFIG.icons.notification_size,
            search_icon_size: LAYOUT_CONFIG.icons.search_icon_size,
            send_icon_size: LAYOUT_CONFIG.icons.send_icon_size,
            button_border_radius: LAYOUT_CONFIG.icons.button_border_radius
        },
        light: {
            notification_color: SVG_CONFIG.bell_icon.light_variant,
            search_icon_color: SVG_CONFIG.search_icon.light_variant,
            arrow_icon_color: SVG_CONFIG.arrow_icon.light_variant,
            minimize_icon_color: SVG_CONFIG.minimize_icon.light_variant,
            close_icon_color: SVG_CONFIG.close_icon.light_variant
        },
        dark: {
            notification_color: SVG_CONFIG.bell_icon.dark_variant,
            search_icon_color: SVG_CONFIG.search_icon.dark_variant,
            arrow_icon_color: SVG_CONFIG.arrow_icon.dark_variant,
            minimize_icon_color: SVG_CONFIG.minimize_icon.dark_variant,
            close_icon_color: SVG_CONFIG.close_icon.dark_variant
        }
    },
    response_window: {
        layout: {
            width: LAYOUT_CONFIG.response_window.width,
            height: LAYOUT_CONFIG.response_window.height,
            border_radius: LAYOUT_CONFIG.response_window.border_radius,
            box_shadow: LAYOUT_CONFIG.response_window.box_shadow
        },
        light: {
            background_value: BG_COLOR_CONFIG.response_window.light,
            text_color: TXT_COLOR_CONFIG.response_window.light,
            shadow_value: SHADOW_CONFIG.response_window.light
        },
        dark: {
            background_value: BG_COLOR_CONFIG.response_window.dark,
            text_color: TXT_COLOR_CONFIG.response_window.dark,
            shadow_value: SHADOW_CONFIG.response_window.dark
        }
    },
    hot_questions: {
        questions: [
            "How do customers use Propel?",
            "Can Propel help reduce customer churn?",
            "What customer engagement platforms does Propel partner with?",
            "What industries use Propel most?",
            "What makes Propel better than hiring an in-house lifecycle marketer?"
        ],
        layout: {
            width: LAYOUT_CONFIG.hot_questions.width,
            padding: LAYOUT_CONFIG.hot_questions.padding,
            border_radius: LAYOUT_CONFIG.hot_questions.border_radius,
            item_padding: LAYOUT_CONFIG.hot_questions.item_padding,
            icon_size: LAYOUT_CONFIG.hot_questions.icon_size
        },
        light: {
            background_value: BG_COLOR_CONFIG.hot_questions.light,
            text_color: TXT_COLOR_CONFIG.hot_questions.light,
            shadow_value: SHADOW_CONFIG.hot_questions.light,
            hover_value: BG_COLOR_CONFIG.hot_questions.hover_light,
            hover_shadow_value: 'none' // Default hover shadow
        },
        dark: {
            background_value: BG_COLOR_CONFIG.hot_questions.dark,
            text_color: TXT_COLOR_CONFIG.hot_questions.dark,
            shadow_value: SHADOW_CONFIG.hot_questions.dark,
            hover_value: BG_COLOR_CONFIG.hot_questions.hover_dark,
            hover_shadow_value: 'none'
        }
    },
    hot_questions_container: {
        layout: {
            width: LAYOUT_CONFIG.hot_questions_container.width,
            padding: LAYOUT_CONFIG.hot_questions_container.padding,
            border_radius: LAYOUT_CONFIG.hot_questions_container.border_radius
        },
        light: {
            background_value: BG_COLOR_CONFIG.hot_questions_container.light,
            text_color: TXT_COLOR_CONFIG.hot_questions.light,
            shadow_value: SHADOW_CONFIG.hot_questions.light
        },
        dark: {
            background_value: BG_COLOR_CONFIG.hot_questions_container.dark,
            text_color: TXT_COLOR_CONFIG.hot_questions.dark,
            shadow_value: SHADOW_CONFIG.hot_questions.dark
        }
    },
    cards: {
        layout: {
            grid_gap: LAYOUT_CONFIG.cards.grid_gap,
            border_radius: LAYOUT_CONFIG.cards.border_radius, // Outer
            card_border_radius: '0.75rem', // Inner default
            padding: LAYOUT_CONFIG.cards.padding
        },
        light: {
            background_value: BG_COLOR_CONFIG.cards.light,
            text_color: TXT_COLOR_CONFIG.cards.light,
            shadow_value: SHADOW_CONFIG.cards.light,
            hover_shadow_value: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border_color: '#e5e7eb'
        },
        dark: {
            background_value: BG_COLOR_CONFIG.cards.dark,
            text_color: TXT_COLOR_CONFIG.cards.dark,
            shadow_value: SHADOW_CONFIG.cards.dark,
            hover_shadow_value: SHADOW_CONFIG.cards.hover_dark,
            border_color: 'rgba(255, 255, 255, 0.1)'
        }
    },
    suggested_questions: {
        questions: [
            "How do I configure the search bar?",
            "Is there a dark mode option available?",
            "Can I customize the response window layout?",
            "Where can I find the API documentation?"
        ],
        layout: {
            padding: '1.5rem 1rem',
            border_radius: '0.75rem',
            margin_bottom: '1.5rem',
            item_padding: LAYOUT_CONFIG.suggested_questions.item_padding,
            icon_size: LAYOUT_CONFIG.suggested_questions.icon_size
        },
        light: {
            background_value: 'transparent',
            text_color: TXT_COLOR_CONFIG.response_window.light,
            shadow_value: SHADOW_CONFIG.suggested_questions.light,
            hover_value: BG_COLOR_CONFIG.suggested_questions.hover_light,
            hover_shadow_value: 'none'
        },
        dark: {
            background_value: 'transparent',
            text_color: TXT_COLOR_CONFIG.response_window.dark,
            shadow_value: SHADOW_CONFIG.suggested_questions.dark,
            hover_value: BG_COLOR_CONFIG.suggested_questions.hover_dark,
            hover_shadow_value: 'none'
        }
    },
    response_related_content: {
        layout: {
            padding_top: LAYOUT_CONFIG.response_related_content.padding_top,
            padding_bottom: LAYOUT_CONFIG.response_related_content.padding_bottom,
            padding_left: LAYOUT_CONFIG.response_related_content.padding_left,
            padding_right: LAYOUT_CONFIG.response_related_content.padding_right,
            margin_bottom: LAYOUT_CONFIG.response_related_content.margin_bottom,
            border_radius: LAYOUT_CONFIG.response_related_content.border_radius
        },
        light: {
            background_value: BG_COLOR_CONFIG.response_related_content.light,
            text_color: TXT_COLOR_CONFIG.cards.light
        },
        dark: {
            background_value: BG_COLOR_CONFIG.response_related_content.dark,
            text_color: TXT_COLOR_CONFIG.cards.dark
        }
    },
    loader: {
        layout: {
            width: LAYOUT_CONFIG.loader.width,
            height: LAYOUT_CONFIG.loader.height,
            padding: LAYOUT_CONFIG.loader.padding,
            border_radius: LAYOUT_CONFIG.loader.border_radius
        },
        light: {
            spinner_color: TXT_COLOR_CONFIG.loader.light,
            text_color: TXT_COLOR_CONFIG.loader.light,
            text_size: '14px'
        },
        dark: {
            spinner_color: TXT_COLOR_CONFIG.loader.dark,
            text_color: TXT_COLOR_CONFIG.loader.dark,
            text_size: '14px'
        }
    }
};
