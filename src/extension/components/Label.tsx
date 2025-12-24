import React from 'react';

export const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="text-[13px] font-[500] text-[#cccccc] block mb-[6px] select-none font-sans">
        {children}
    </label>
);
