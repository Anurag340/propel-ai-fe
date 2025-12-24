export const DEFAULT_LAYOUT_CONFIG = {
    // Search Bar / Input Container
    search_bar: {
        height: '48px',
        width: '640px',
        collapsed_width: '260px', // From .input-container.input-collapsed
        collapsed_radius: '9999px',
        padding: '8px',
        padding_collapsed: '6px',
        margin: '0px',
        border_radius: '4px',
        transition: 'all .3s ease'
    },

    // Internal Input Content (Text + Icon)
    input_content: {
        width: '480px',
        width_collapsed: '170px',
        gap: '8px',
        gap_collapsed: '6px'
    },

    // Send Button
    send_button: {
        height: '32px',
        width: '32px',
        padding: '0px',
        margin: '0px',
        border_radius: '4px',
        border_radius_collapsed: '9999px'
    },

    // Icons
    icons: {
        size_default: '32px', // container size
        svg_size: '28px',
        svg_size_collapsed: '12px',
        notification_size: '23px',
        search_icon_size: '17px',
        send_icon_size: '14px',
        button_border_radius: '6px'
    },

    // Response Window
    response_window: {
        width: '720px',
        height: '80vh',
        border_radius: '0.375rem', // 6px
        box_shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        header_padding: '1rem 2rem'
    },

    // Hot Questions Floating Menu
    hot_questions: {
        width: '640px',
        padding: '0.75rem',
        border_radius: '0.75rem',
        margin_bottom: '1rem',
        item_padding: '0.75rem',
        item_gap: '0.75rem',
        icon_size: '1rem'
    },

    // Hot Questions Container
    hot_questions_container: {
        width: '640px',
        padding: '0.75rem',
        border_radius: '0.75rem'
    },

    // Cards (Related Content, etc.)
    cards: {
        grid_gap: '0.75rem',
        border_radius: '0.5rem',
        padding: '1rem'
    },

    // Response Related Content (Container)
    response_related_content: {
        padding_top: '1.5rem',
        padding_bottom: '1.5rem',
        padding_left: '1rem',
        padding_right: '1rem',
        margin_bottom: '1.5rem',
        border_radius: '0.375rem' // 6px
    },

    // Suggested Questions
    suggested_questions: {
        item_padding: '0.75rem',
        icon_size: '1.25rem'
    },

    // Loader
    loader: {
        width: '200px',
        height: '200px',
        padding: '2rem',
        border_radius: '0.5rem' // 8px
    },

    // Global Z-Index
    z_index: {
        widget_container: 9999999,
        bottom_panel: 999999,
        response_window: 30
    }
};
