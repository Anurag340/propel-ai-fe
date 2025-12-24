import React from 'react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: SelectOption[];
}

export const Select = ({ value, onChange, options, className = '', ...props }: SelectProps) => (
    <div style={{ position: 'relative' }}>
        <select
            value={value}
            onChange={onChange}
            className={`
                w-full bg-[#262626] border border-[#444444] rounded-[4px]
                px-[12px] py-[10px] text-[13px] text-white font-sans 
                focus:outline-none 
                ${className}
            `}
            style={{
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                cursor: 'pointer',
                color: '#ffffff',
                backgroundColor: '#262626'
            }}
            {...props}
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
        {/* Custom Chevron Icon */}
        <div style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            color: '#aaaaaa',
            display: 'flex',
            alignItems: 'center'
        }}>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    </div>
);
