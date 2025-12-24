import { useEffect } from 'react';
import { useExtensionStore } from '../store';
import { WebflowSenderService } from '../services/sender.service';
import { DEFAULT_CONFIG } from '../../config/default.config';

// Modular Components
import { SidebarHeader } from './SidebarHeader';
import { SidebarFooter } from './SidebarFooter';
import { SectionHeader } from './SectionHeader';
import { Label } from './Label';
import { Input } from './Input';
import { ColorInput } from './ColorInput';
import { Select } from './Select';

const ArrayInput = ({ values, onChange }: { values: string[], onChange: (newValues: string[]) => void }) => {
    const handleAdd = () => {
        onChange([...values, 'New Question']);
    };

    const handleChange = (index: number, newValue: string) => {
        const newValues = [...values];
        newValues[index] = newValue;
        onChange(newValues);
    };

    const handleRemove = (index: number) => {
        const newValues = values.filter((_, i) => i !== index);
        onChange(newValues);
    };

    return (
        <div className="space-y-2">
            {values.map((value, index) => (
                <div key={index} className="flex gap-2">
                    <Input
                        value={value}
                        onChange={(e: any) => handleChange(index, e.target.value)}
                        className="flex-1"
                    />
                    <button
                        onClick={() => handleRemove(index)}
                        className="p-2 bg-[#444] text-white rounded hover:bg-[#555] transition-colors"
                        title="Remove"
                    >
                        ✕
                    </button>
                </div>
            ))}
            <button
                onClick={handleAdd}
                className="w-full py-2 bg-[#444] text-white rounded hover:bg-[#555] transition-colors text-sm"
            >
                + Add Question
            </button>
        </div>
    );
};

const SECTIONS = [
    { value: 'search_bar', label: 'Search Bar' },
    { value: 'response_window', label: 'Response Window' },
    { value: 'cards', label: 'Cards' },
    { value: 'hot_questions', label: 'Hot Questions' },
    { value: 'suggested_questions', label: 'Suggested Questions' },
    { value: 'loader', label: 'Loader' }
];

const LoaderSettings = ({ config, updateConfigPath, variant, setVariant }: { config: any, updateConfigPath: any, variant: 'light' | 'dark', setVariant: any }) => {
    return (
        <div className="space-y-6 fade-in">
            <VariantToggle variant={variant} setVariant={setVariant} />
            <div>
                <SectionHeader>Colors ({variant})</SectionHeader>
                <div className="space-y-4">
                    <div className="flex flex-col gap-2 bg-[#2b2b2b] p-2 rounded border border-[#444]">
                        <Label>Spinner Color</Label>
                        <ColorInput value={config.loader[variant].spinner_color} onChange={(val) => updateConfigPath(`loader.${variant}.spinner_color`, val)} />
                    </div>
                    <div className="flex flex-col gap-2 bg-[#2b2b2b] p-2 rounded border border-[#444]">
                        <Label>Text Color</Label>
                        <ColorInput value={config.loader[variant].text_color} onChange={(val) => updateConfigPath(`loader.${variant}.text_color`, val)} />
                    </div>
                    <div className="grid grid-cols-[1fr,80px] gap-4 items-center bg-[#2b2b2b] p-2 rounded border border-[#444]">
                        <Label>Text Size</Label>
                        <Input value={config.loader[variant].text_size} onChange={(e: any) => updateConfigPath(`loader.${variant}.text_size`, e.target.value)} className="text-right" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const VariantToggle = ({ variant, setVariant }: { variant: 'light' | 'dark', setVariant: (v: 'light' | 'dark') => void }) => (
    <div className="flex bg-[#2b2b2b] p-1 rounded border border-[#444]">
        <button
            onClick={() => setVariant('light')}
            className={`flex-1 py-1 text-[12px] rounded transition-colors ${variant === 'light' ? 'bg-[#444] text-white' : 'text-[#888] hover:text-[#bbb]'}`}
        >
            Light Mode
        </button>
        <button
            onClick={() => setVariant('dark')}
            className={`flex-1 py-1 text-[12px] rounded transition-colors ${variant === 'dark' ? 'bg-[#444] text-white' : 'text-[#888] hover:text-[#bbb]'}`}
        >
            Dark Mode
        </button>
    </div>
);

const SearchBarSettings = ({ config, updateConfigPath, variant, setVariant }: { config: any, updateConfigPath: any, variant: 'light' | 'dark', setVariant: any }) => {

    return (
        <div className="space-y-6 fade-in">
            <VariantToggle variant={variant} setVariant={setVariant} />

            {/* Layout Section */}
            <div>
                <SectionHeader>Layout</SectionHeader>
                <div className="space-y-4">
                    <div className="grid grid-cols-[1fr,80px] gap-4 items-center">
                        <Label>Height</Label>
                        <Input
                            value={config.search_bar.layout.height}
                            onChange={(e: any) => updateConfigPath('search_bar.layout.height', e.target.value)}
                            className="text-right"
                        />
                    </div>
                    <div className="grid grid-cols-[1fr,80px] gap-4 items-center">
                        <Label>Border Radius</Label>
                        <Input
                            value={config.search_bar.layout.border_radius}
                            onChange={(e: any) => updateConfigPath('search_bar.layout.border_radius', e.target.value)}
                            className="text-right"
                        />
                    </div>
                </div>
            </div>

            {/* Colors Section */}
            <div>
                <SectionHeader>Colors ({variant === 'light' ? 'Light' : 'Dark'})</SectionHeader>
                <div className="space-y-4">
                    <div className="flex flex-col gap-2 bg-[#2b2b2b] p-2 rounded border border-[#444]">
                        <Label>Background</Label>
                        <ColorInput
                            value={config.search_bar[variant].background_value}
                            onChange={(val) => updateConfigPath(`search_bar.${variant}.background_value`, val)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 bg-[#2b2b2b] p-2 rounded border border-[#444]">
                        <Label>Text Color</Label>
                        <ColorInput
                            value={config.search_bar[variant].text_color}
                            onChange={(val) => updateConfigPath(`search_bar.${variant}.text_color`, val)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 bg-[#2b2b2b] p-2 rounded border border-[#444]">
                        <Label>Icon Color</Label>
                        <ColorInput
                            value={config.icons[variant].search_icon_color}
                            onChange={(val) => updateConfigPath(`icons.${variant}.search_icon_color`, val)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 bg-[#2b2b2b] p-2 rounded border border-[#444]">
                        <Label>Shadow</Label>
                        <Input
                            value={config.search_bar[variant].shadow_value || ''}
                            onChange={(e: any) => updateConfigPath(`search_bar.${variant}.shadow_value`, e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 bg-[#2b2b2b] p-2 rounded border border-[#444]">
                        <Label>Placeholder Color</Label>
                        <ColorInput
                            value={config.search_bar[variant].placeholder_color || '#6b7280'}
                            onChange={(val) => updateConfigPath(`search_bar.${variant}.placeholder_color`, val)}
                        />
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div>
                <SectionHeader>Content</SectionHeader>
                <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <Label>Placeholder Text</Label>
                        <Input
                            value={config.search_bar.placeholder_text}
                            onChange={(e: any) => updateConfigPath('search_bar.placeholder_text', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Send Button Section */}
            <div>
                <SectionHeader>Send Button</SectionHeader>
                <div className="space-y-4">
                    <div className="grid grid-cols-[1fr,80px] gap-4 items-center">
                        <Label>Width</Label>
                        <Input
                            value={config.send_button.layout.width}
                            onChange={(e: any) => updateConfigPath('send_button.layout.width', e.target.value)}
                            className="text-right"
                        />
                    </div>
                    <div className="grid grid-cols-[1fr,80px] gap-4 items-center">
                        <Label>Height</Label>
                        <Input
                            value={config.send_button.layout.height}
                            onChange={(e: any) => updateConfigPath('send_button.layout.height', e.target.value)}
                            className="text-right"
                        />
                    </div>
                    <div className="flex flex-col gap-2 bg-[#2b2b2b] p-2 rounded border border-[#444]">
                        <Label>Background ({variant})</Label>
                        <ColorInput
                            value={config.send_button[variant].background_value}
                            onChange={(val) => updateConfigPath(`send_button.${variant}.background_value`, val)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 bg-[#2b2b2b] p-2 rounded border border-[#444]">
                        <Label>Icon Color ({variant})</Label>
                        <ColorInput
                            value={config.send_button[variant].text_color}
                            onChange={(val) => updateConfigPath(`send_button.${variant}.text_color`, val)}
                        />
                    </div>
                </div>
            </div>

            {/* Notification Button Section */}
            <div>
                <SectionHeader>Notification Button</SectionHeader>
                <div className="space-y-4">
                    <div className="flex flex-col gap-2 bg-[#2b2b2b] p-2 rounded border border-[#444]">
                        <Label>Icon Color ({variant})</Label>
                        <ColorInput
                            value={config.icons[variant].notification_color}
                            onChange={(val) => updateConfigPath(`icons.${variant}.notification_color`, val)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ResponseWindowSettings = ({ config, updateConfigPath, variant, setVariant }: { config: any, updateConfigPath: any, variant: 'light' | 'dark', setVariant: any }) => {

    // Initialize missing icon colors if they don't exist in the persisted config
    useEffect(() => {
        const variants = ['light', 'dark'] as const;
        variants.forEach(v => {
            if (!config.icons[v].minimize_icon_color) {
                updateConfigPath(`icons.${v}.minimize_icon_color`, DEFAULT_CONFIG.icons[v].minimize_icon_color);
            }
            if (!config.icons[v].close_icon_color) {
                updateConfigPath(`icons.${v}.close_icon_color`, DEFAULT_CONFIG.icons[v].close_icon_color);
            }
        });
    }, [config.icons, updateConfigPath]);

    return (
        <div className="space-y-6 fade-in">
            <VariantToggle variant={variant} setVariant={setVariant} />
            <div>
                <SectionHeader>Layout</SectionHeader>
                <div className="space-y-4">
                    <div className="grid grid-cols-[1fr,80px] gap-4 items-center">
                        <Label>Width</Label>
                        <Input value={config.response_window.layout.width} onChange={(e: any) => updateConfigPath('response_window.layout.width', e.target.value)} className="text-right" />
                    </div>
                    <div className="grid grid-cols-[1fr,80px] gap-4 items-center">
                        <Label>Height</Label>
                        <Input value={config.response_window.layout.height} onChange={(e: any) => updateConfigPath('response_window.layout.height', e.target.value)} className="text-right" />
                    </div>
                    <div className="grid grid-cols-[1fr,80px] gap-4 items-center">
                        <Label>Radius</Label>
                        <Input value={config.response_window.layout.border_radius} onChange={(e: any) => updateConfigPath('response_window.layout.border_radius', e.target.value)} className="text-right" />
                    </div>
                </div>
            </div>
            <div>
                <SectionHeader>Colors ({variant})</SectionHeader>
                <div className="space-y-4">
                    <div className="flex flex-col gap-2 bg-[#2b2b2b] p-2 rounded border border-[#444]">
                        <Label>Background</Label>
                        <ColorInput value={config.response_window[variant].background_value} onChange={(val) => updateConfigPath(`response_window.${variant}.background_value`, val)} />
                    </div>
                    <div className="flex flex-col gap-2 bg-[#2b2b2b] p-2 rounded border border-[#444]">
                        <Label>Text Color</Label>
                        <ColorInput value={config.response_window[variant].text_color} onChange={(val) => updateConfigPath(`response_window.${variant}.text_color`, val)} />
                    </div>
                    <div className="flex flex-col gap-2 bg-[#2b2b2b] p-2 rounded border border-[#444]">
                        <Label>Shadow</Label>
                        <Input value={config.response_window[variant].shadow_value || ''} onChange={(e: any) => updateConfigPath(`response_window.${variant}.shadow_value`, e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2 bg-[#2b2b2b] p-2 rounded border border-[#444]">
                        <Label>Minimize Icon</Label>
                        <ColorInput value={config.icons[variant].minimize_icon_color} onChange={(val) => updateConfigPath(`icons.${variant}.minimize_icon_color`, val)} />
                    </div>
                    <div className="flex flex-col gap-2 bg-[#2b2b2b] p-2 rounded border border-[#444]">
                        <Label>Close Icon</Label>
                        <ColorInput value={config.icons[variant].close_icon_color} onChange={(val) => updateConfigPath(`icons.${variant}.close_icon_color`, val)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const CardsSettings = ({ config, updateConfigPath, variant, setVariant }: { config: any, updateConfigPath: any, variant: 'light' | 'dark', setVariant: any }) => {

    // Initialize missing card radius and hover shadow if needed
    useEffect(() => {
        if (!config.cards.layout.card_border_radius) {
            updateConfigPath('cards.layout.card_border_radius', DEFAULT_CONFIG.cards.layout.card_border_radius || '0.75rem');
        }
        if (!config.cards[variant].hover_shadow_value) {
            updateConfigPath(`cards.${variant}.hover_shadow_value`, DEFAULT_CONFIG.cards[variant].hover_shadow_value || 'none');
        }
    }, [config.cards, variant, updateConfigPath]);

    return (
        <div className="space-y-6 fade-in">
            <VariantToggle variant={variant} setVariant={setVariant} />
            <div>
                <SectionHeader>Layout</SectionHeader>
                <div className="space-y-4">
                    <div className="grid grid-cols-[1fr,80px] gap-4 items-center">
                        <Label>Grid Gap</Label>
                        <Input value={config.cards.layout.grid_gap} onChange={(e: any) => updateConfigPath('cards.layout.grid_gap', e.target.value)} className="text-right" />
                    </div>

                    <div className="grid grid-cols-[1fr,80px] gap-4 items-center">
                        <Label>Card Radius</Label>
                        <Input value={config.cards.layout.card_border_radius} onChange={(e: any) => updateConfigPath('cards.layout.card_border_radius', e.target.value)} className="text-right" />
                    </div>
                    <div className="grid grid-cols-[1fr,80px] gap-4 items-center">
                        <Label>Padding</Label>
                        <Input value={config.cards.layout.padding} onChange={(e: any) => updateConfigPath('cards.layout.padding', e.target.value)} className="text-right" />
                    </div>
                </div>
            </div>
            <div>
                <SectionHeader>Colors ({variant})</SectionHeader>
                <div className="space-y-4">
                    <div className="flex flex-col gap-2 bg-[#2b2b2b] p-2 rounded border border-[#444]">
                        <Label>Background</Label>
                        <ColorInput value={config.cards[variant].background_value} onChange={(val) => updateConfigPath(`cards.${variant}.background_value`, val)} />
                    </div>
                    <div className="flex flex-col gap-2 bg-[#2b2b2b] p-2 rounded border border-[#444]">
                        <Label>Text Color</Label>
                        <ColorInput value={config.cards[variant].text_color} onChange={(val) => updateConfigPath(`cards.${variant}.text_color`, val)} />
                    </div>
                    <div className="flex flex-col gap-2 bg-[#2b2b2b] p-2 rounded border border-[#444]">
                        <Label>Shadow</Label>
                        <Input value={config.cards[variant].shadow_value || ''} onChange={(e: any) => updateConfigPath(`cards.${variant}.shadow_value`, e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2 bg-[#2b2b2b] p-2 rounded border border-[#444]">
                        <Label>Hover Shadow</Label>
                        <Input value={config.cards[variant].hover_shadow_value || ''} onChange={(e: any) => updateConfigPath(`cards.${variant}.hover_shadow_value`, e.target.value)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const HotQuestionsSettings = ({ config, updateConfigPath, variant, setVariant }: { config: any, updateConfigPath: any, variant: 'light' | 'dark', setVariant: any }) => {

    // Initialize missing hover shadow if needed
    useEffect(() => {
        if (!config.hot_questions[variant].hover_shadow_value) {
            updateConfigPath(`hot_questions.${variant}.hover_shadow_value`, DEFAULT_CONFIG.hot_questions[variant].hover_shadow_value || 'none');
        }
    }, [config.hot_questions, variant, updateConfigPath]);

    return (
        <div className="space-y-6 fade-in">
            <VariantToggle variant={variant} setVariant={setVariant} />
            <div>
                <SectionHeader>Questions</SectionHeader>
                <div className="space-y-4">
                    <ArrayInput
                        values={config.hot_questions.questions || []}
                        onChange={(newValues) => updateConfigPath('hot_questions.questions', newValues)}
                    />
                </div>
            </div>
            <div>
                <SectionHeader>Layout</SectionHeader>
                <div className="space-y-4">
                    <div className="grid grid-cols-[1fr,80px] gap-4 items-center">
                        <Label>Width</Label>
                        <Input value={config.hot_questions.layout.width} onChange={(e: any) => updateConfigPath('hot_questions.layout.width', e.target.value)} className="text-right" />
                    </div>
                    <div className="grid grid-cols-[1fr,80px] gap-4 items-center">
                        <Label>Padding</Label>
                        <Input value={config.hot_questions.layout.padding} onChange={(e: any) => updateConfigPath('hot_questions.layout.padding', e.target.value)} className="text-right" />
                    </div>
                    <div className="grid grid-cols-[1fr,80px] gap-4 items-center">
                        <Label>Radius</Label>
                        <Input value={config.hot_questions.layout.border_radius} onChange={(e: any) => updateConfigPath('hot_questions.layout.border_radius', e.target.value)} className="text-right" />
                    </div>
                </div>
            </div>
            <div>
                <SectionHeader>Colors ({variant})</SectionHeader>
                <div className="space-y-4">
                    <div className="flex flex-col gap-2 bg-[#2b2b2b] p-2 rounded border border-[#444]">
                        <Label>Background</Label>
                        <ColorInput value={config.hot_questions[variant].background_value} onChange={(val) => updateConfigPath(`hot_questions.${variant}.background_value`, val)} />
                    </div>
                    <div className="flex flex-col gap-2 bg-[#2b2b2b] p-2 rounded border border-[#444]">
                        <Label>Text Color</Label>
                        <ColorInput value={config.hot_questions[variant].text_color} onChange={(val) => updateConfigPath(`hot_questions.${variant}.text_color`, val)} />
                    </div>
                    <div className="flex flex-col gap-2 bg-[#2b2b2b] p-2 rounded border border-[#444]">
                        <Label>Shadow</Label>
                        <Input value={config.hot_questions[variant].shadow_value || ''} onChange={(e: any) => updateConfigPath(`hot_questions.${variant}.shadow_value`, e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2 bg-[#2b2b2b] p-2 rounded border border-[#444]">
                        <Label>Hover Shadow</Label>
                        <Input value={config.hot_questions[variant].hover_shadow_value || ''} onChange={(e: any) => updateConfigPath(`hot_questions.${variant}.hover_shadow_value`, e.target.value)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const SuggestedQuestionsSettings = ({ config, updateConfigPath, variant, setVariant }: { config: any, updateConfigPath: any, variant: 'light' | 'dark', setVariant: any }) => {

    useEffect(() => {
        if (!config.suggested_questions) {
            updateConfigPath('suggested_questions', DEFAULT_CONFIG.suggested_questions);
        } else if (!config.suggested_questions[variant].hover_shadow_value) {
            updateConfigPath(`suggested_questions.${variant}.hover_shadow_value`, DEFAULT_CONFIG.suggested_questions[variant].hover_shadow_value || 'none');
        }
    }, [config.suggested_questions, updateConfigPath]);

    if (!config.suggested_questions) return null;

    return (
        <div className="space-y-6 fade-in">
            <VariantToggle variant={variant} setVariant={setVariant} />
            <div>
                <SectionHeader>Questions</SectionHeader>
                <div className="space-y-4">
                    <ArrayInput
                        values={config.suggested_questions.questions || []}
                        onChange={(newValues) => updateConfigPath('suggested_questions.questions', newValues)}
                    />
                </div>
            </div>
            <div>
                <SectionHeader>Layout</SectionHeader>
                <div className="space-y-4">
                    <div className="grid grid-cols-[1fr,80px] gap-4 items-center">
                        <Label>Padding</Label>
                        <Input value={config.suggested_questions.layout.padding} onChange={(e: any) => updateConfigPath('suggested_questions.layout.padding', e.target.value)} className="text-right" />
                    </div>
                    <div className="grid grid-cols-[1fr,80px] gap-4 items-center">
                        <Label>Radius</Label>
                        <Input value={config.suggested_questions.layout.border_radius} onChange={(e: any) => updateConfigPath('suggested_questions.layout.border_radius', e.target.value)} className="text-right" />
                    </div>
                    <div className="grid grid-cols-[1fr,80px] gap-4 items-center">
                        <Label>Margin Bottom</Label>
                        <Input value={config.suggested_questions.layout.margin_bottom} onChange={(e: any) => updateConfigPath('suggested_questions.layout.margin_bottom', e.target.value)} className="text-right" />
                    </div>
                </div>
            </div>
            <div>
                <SectionHeader>Colors ({variant})</SectionHeader>
                <div className="space-y-4">
                    <div className="flex flex-col gap-2 bg-[#2b2b2b] p-2 rounded border border-[#444]">
                        <Label>Background</Label>
                        <ColorInput value={config.suggested_questions[variant].background_value} onChange={(val) => updateConfigPath(`suggested_questions.${variant}.background_value`, val)} />
                    </div>
                    <div className="flex flex-col gap-2 bg-[#2b2b2b] p-2 rounded border border-[#444]">
                        <Label>Text Color</Label>
                        <ColorInput value={config.suggested_questions[variant].text_color} onChange={(val) => updateConfigPath(`suggested_questions.${variant}.text_color`, val)} />
                    </div>
                    <div className="flex flex-col gap-2 bg-[#2b2b2b] p-2 rounded border border-[#444]">
                        <Label>Shadow</Label>
                        <Input value={config.suggested_questions[variant].shadow_value || ''} onChange={(e: any) => updateConfigPath(`suggested_questions.${variant}.shadow_value`, e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2 bg-[#2b2b2b] p-2 rounded border border-[#444]">
                        <Label>Hover Shadow</Label>
                        <Input value={config.suggested_questions[variant].hover_shadow_value || ''} onChange={(e: any) => updateConfigPath(`suggested_questions.${variant}.hover_shadow_value`, e.target.value)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Sidebar = () => {
    const config = useExtensionStore(state => state.config);
    const activeSection = useExtensionStore(state => state.activeSection);
    const setActiveSection = useExtensionStore(state => state.setActiveSection);
    const updateConfigPath = useExtensionStore(state => state.updateConfigPath);
    const resetConfig = useExtensionStore(state => state.resetConfig);
    const variant = useExtensionStore(state => state.variant);
    const setVariant = useExtensionStore(state => state.setVariant);

    // Listen for Widget Ready handshake
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.type === 'WIDGET_READY') {
                WebflowSenderService.sendConfigUpdate(config);
                WebflowSenderService.sendTheme(variant);
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [config, variant]);

    useEffect(() => {
        WebflowSenderService.sendConfigUpdate(config);
    }, [config]);

    // Send focus message when active section changes
    useEffect(() => {
        WebflowSenderService.sendFocusComponent(activeSection);
    }, [activeSection]);

    // Send theme update when variant changes
    useEffect(() => {
        WebflowSenderService.sendTheme(variant);
    }, [variant]);

    const handleReset = () => {
        if (confirm('Are you sure you want to reset all settings to default?')) {
            resetConfig();
        }
    };

    const handleSave = () => {
        // Send save request to Webflow Designer/Host
        WebflowSenderService.saveConfig(config);
    };

    return (
        <div className="flex flex-col h-full bg-[#333333] text-[#e5e5e5] font-sans antialiased text-[13px]">
            {/* Header */}
            <div className="border-b border-[#444444] bg-[#2b2b2b]">
                <SidebarHeader onReset={handleReset} />
            </div>

            {/* Component Selector */}
            <div className="p-4 border-b border-[#444444] bg-[#2b2b2b]">
                <Label>Customize Component</Label>
                <Select
                    options={SECTIONS}
                    value={activeSection}
                    onChange={(e) => setActiveSection(e.target.value)}
                />
            </div>

            {/* Scrollable Area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-[#333333] p-4">

                {activeSection === 'search_bar' && (
                    <SearchBarSettings config={config} updateConfigPath={updateConfigPath} variant={variant} setVariant={setVariant} />
                )}

                {activeSection === 'response_window' && (
                    <ResponseWindowSettings config={config} updateConfigPath={updateConfigPath} variant={variant} setVariant={setVariant} />
                )}

                {activeSection === 'cards' && (
                    <CardsSettings config={config} updateConfigPath={updateConfigPath} variant={variant} setVariant={setVariant} />
                )}

                {activeSection === 'hot_questions' && (
                    <HotQuestionsSettings config={config} updateConfigPath={updateConfigPath} variant={variant} setVariant={setVariant} />
                )}

                {activeSection === 'suggested_questions' && (
                    <SuggestedQuestionsSettings config={config} updateConfigPath={updateConfigPath} variant={variant} setVariant={setVariant} />
                )}

                {activeSection === 'loader' && (
                    <LoaderSettings config={config} updateConfigPath={updateConfigPath} variant={variant} setVariant={setVariant} />
                )}

            </div>

            <SidebarFooter onSave={handleSave} />
        </div>
    );
};
