

export const TabButton = ({ active, onClick, children }: any) => (
    <button
        onClick={onClick}
        className={`
            flex-1 py-[10px] text-[12px] text-center font-sans transition-all duration-200 border-b-2
            ${active 
                ? 'border-[#3b82f6] text-white bg-[#333333]' 
                : 'border-transparent text-[#aaaaaa] hover:text-white hover:bg-[#3a3a3a]'}
        `}
    >
        {children}
    </button>
);
