import { useState } from 'react';

export const SidebarFooter = ({ onSave }: { onSave: () => void }) => {
    const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

    const handleClick = async () => {
        if (status !== 'idle') return;

        setStatus('saving');
        await onSave();

        // Simulate save delay for better UX
        setTimeout(() => {
            setStatus('saved');
            setTimeout(() => {
                setStatus('idle');
            }, 2000);
        }, 800);
    };

    const getButtonText = () => {
        switch (status) {
            case 'saving': return 'Saving...';
            case 'saved': return 'Saved!';
            default: return 'Save Changes';
        }
    };

    const getButtonColor = () => {
        switch (status) {
            case 'saving': return 'bg-[#2563eb] opacity-80 cursor-wait';
            case 'saved': return 'bg-[#10b981] hover:bg-[#059669]'; // Green for success
            default: return 'bg-[#2563eb] hover:bg-[#1d4ed8]';
        }
    };

    return (
        <div className="p-3 border-t border-[#444444] bg-[#2b2b2b] shrink-0">
            <button
                onClick={handleClick}
                disabled={status === 'saving'}
                className={`w-full h-[40px] font-semibold rounded transition-colors text-white ${getButtonColor()}`}
            >
                {getButtonText()}
            </button>

            <a href="http://localhost:5173/widget" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center w-full h-[40px] mt-3 font-semibold rounded text-white bg-[#525252] hover:bg-[#666666] transition-colors"
                style={{ textDecoration: 'none' }}>
                Go to widget {'->'}
            </a>
        </div>
    );
};
