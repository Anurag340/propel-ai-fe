import React from 'react';

interface SidebarHeaderProps {
    onReset: () => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ onReset }) => {
    return (
        <div className="px-[16px] py-[12px] bg-[#2b2b2b] border-b border-[#444444] flex justify-between items-center shrink-0">
            <div>
                <h1 className="font-semibold text-white text-[14px] m-0">Propel AI</h1>
                <span className="text-[10px] bg-[#525252] text-[#bbb] px-[6px] py-[2px] rounded-[4px] uppercase font-[700] tracking-wider">
                    Config
                </span>
            </div>
            <button
                onClick={onReset}
                className="text-[11px] bg-[#444444] hover:bg-[#555] text-white border border-[#555] px-3 py-1.5 rounded transition-colors"
            >
                Reset
            </button>
        </div>
    );
};
