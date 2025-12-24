export const FUNCTIONALITY_CONFIG = {
    // Search Bar Input
    search_bar: {
        on_focus: "handleInputFocus", // Shows hot questions
        on_blur: "handleInputBlur",   // Hides hot questions
        on_input: "handleInputChange", // Expands input container
        on_keypress: "handleInputKeypress" // Handles Enter key -> sendMessage
    },

    // Main Action Buttons
    send_button: {
        on_click: "sendMessage"
    },

    // Response Window Controls
    response_window: {
        minimize_button: {
            on_click: "toggleMinimizeState"
        },
        close_button: {
            on_click: "closeResponseWindowTransition"
        },
        notification_button: {
            on_click: "toggleResponseWindow" // Toggles visibility/restore
        }
    },

    // Interactive Lists
    hot_questions: {
        item: {
            on_click: "handleHotQuestionClick" // Sets input value -> sendMessage
        }
    },

    related_cards: {
        card: {
            on_click: "handleCardClick" // Tracks event -> opens URL
        }
    },

    // Global / Window Events
    window: {
        on_scroll: "scheduleVariantCheck",
        on_resize: "scheduleVariantCheck"
    },

    // System / Background Services
    system: {
        init: "initializeWidget", // Setup listener, loadConfig, restoreUIState
        api: {
            load_config: "loadApiConfig"
        },
        theming: {
            detect_variant: "detectVariantFromWebflowAttributes",
            update_variant: "updateVariantFromWebflowAttributes"
        },
        persistence: {
            save_state: "saveUIState",
            restore_state: "restoreUIState",
            clear_state: "clearUIState"
        },
        analytics: {
            track_event: "trackEvent",
            init_session: "initializeSessionIds" // UUID generation logic
        },
        location: {
            detect: "detectUserLocation"
        },
        navigation: {
            intercept: "handleNavigationSafety" // beforeunload, popstate, pushState overrides
        }
    }
};
