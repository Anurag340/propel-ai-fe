import { Input } from './Input';

export const ColorInput = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => (
    <div className="flex items-center gap-2 w-full">
        {/* Color Picker Wrapper */}
        <div className="relative w-[32px] h-[32px] cursor-pointer rounded-[4px] bg-[#262626] border border-[#444] flex items-center justify-center overflow-hidden shrink-0">
            <input
                type="color"
                value={(value || '').startsWith('#') ? value : '#000000'} // Fallback for gradients
                onChange={(e) => onChange(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer p-0 border-0"
            />
            <div
                className="w-full h-full"
                style={{ background: value }} // Use background to support gradients
            />
        </div>

        {/* Text Input for Hex or Gradient */}
        <Input
            value={value}
            onChange={(e: any) => onChange(e.target.value)}
            className="flex-1 text-[12px] font-mono"
            placeholder="#FFFFFF or linear-gradient..."
        />
    </div>
);
