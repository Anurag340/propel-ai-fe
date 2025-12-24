export interface LayoutConfig {
    height: string;
    width: string;
    padding_right?: string;
    margin_bottom?: string;
    border_radius: string;
    padding: string; // Added for flexibility
    margin?: string; // Added for SearchBar
}

export interface InputVariantConfig {
    background_value: string;
    text_color: string;
    subtext_color?: string; // Optional for cards
    placeholder_color?: string; // Optional for backward compatibility
    shadow_value?: string;
    hover_value?: string;
    hover_shadow_value?: string;
    border_color?: string; // Optional for borders
}

export interface SearchBarConfig {
    layout: LayoutConfig;
    light: InputVariantConfig;
    dark: InputVariantConfig;
    font_family: string;
    font_weight: string;
    placeholder_text: string;
}

export interface SendButtonConfig {
    layout: LayoutConfig;
    light: InputVariantConfig;
    dark: InputVariantConfig;
}

// Reusable Layout Interfaces (Partial to allow flexibility)
export interface BaseLayoutConfig {
    [key: string]: string | undefined;
}

export interface IconsLayoutConfig {
    size_default: string;
    svg_size: string;
    notification_size: string;
    search_icon_size: string;
    send_icon_size: string;
    button_border_radius: string;
}

export interface IconsConfig {
    notification_color: string;
    search_icon_color: string;
    arrow_icon_color: string;
    minimize_icon_color?: string; // Optional for backward compatibility
    close_icon_color?: string; // Optional for backward compatibility
    active_color?: string; // For active states (e.g. streaming/typing)
}

export interface IconsVariantConfig {
    layout: IconsLayoutConfig;
    light: IconsConfig;
    dark: IconsConfig;
}

// Response Window
export interface ResponseWindowLayout {
    width: string;
    height: string;
    border_radius: string;
    box_shadow: string;
}

export interface ResponseWindowConfig {
    layout: ResponseWindowLayout;
    light: InputVariantConfig;
    dark: InputVariantConfig;
}

// Hot Questions
export interface HotQuestionsLayout {
    width: string;
    padding: string;
    border_radius: string;
    item_padding: string;
    icon_size: string;
}

export interface HotQuestionsConfig {
    questions: string[];
    layout: HotQuestionsLayout;
    light: InputVariantConfig;
    dark: InputVariantConfig;
}

// Cards
export interface CardsLayout {
    grid_gap: string;
    border_radius: string; // Outer container radius
    card_border_radius: string; // Inner card radius
    padding: string;
}

export interface CardsConfig {
    layout: CardsLayout;
    light: InputVariantConfig;
    dark: InputVariantConfig;
}

// Suggested Questions (Related Questions)
export interface SuggestedQuestionsLayout {
    padding: string;
    border_radius: string;
    margin_bottom: string;
    item_padding: string;
    icon_size: string;
}

export interface SuggestedQuestionsConfig {
    questions: string[];
    layout: SuggestedQuestionsLayout;
    light: InputVariantConfig;
    dark: InputVariantConfig;
}

// Response Related Content (Container)
export interface ResponseRelatedContentLayout {
    padding_top: string;
    padding_bottom: string;
    padding_left: string;
    padding_right: string;
    margin_bottom: string;
    border_radius: string;
}

export interface ResponseRelatedContentConfig {
    layout: ResponseRelatedContentLayout;
    light: InputVariantConfig;
    dark: InputVariantConfig;
}

// Hot Questions Container
export interface HotQuestionsContainerLayout {
    padding: string;
    border_radius: string;
    width: string;
}

export interface HotQuestionsContainerConfig {
    layout: HotQuestionsContainerLayout;
    light: InputVariantConfig;
    dark: InputVariantConfig;
}

// Loader (Loading Animation)
export interface LoaderLayoutConfig {
    width: string;      // Container width
    height: string;     // Container height
    padding: string;
    border_radius: string;
}

export interface LoaderVariantConfig {
    spinner_color: string; // SVG fill color
    text_color: string;    // Text below spinner
    text_size: string;     // Font size for "Processing..."
}

export interface LoaderConfig {
    layout: LoaderLayoutConfig;
    light: LoaderVariantConfig;
    dark: LoaderVariantConfig;
}

export interface WidgetConfig {
    search_bar: SearchBarConfig;
    send_button: SendButtonConfig;
    icons: IconsVariantConfig;
    response_window: ResponseWindowConfig;
    hot_questions: HotQuestionsConfig;
    hot_questions_container: HotQuestionsContainerConfig;
    cards: CardsConfig;
    suggested_questions: SuggestedQuestionsConfig;
    response_related_content: ResponseRelatedContentConfig;
    loader: LoaderConfig;
}
