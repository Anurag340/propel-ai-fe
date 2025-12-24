export const Input = ({ value, onChange, className = '', ...props }: any) => (
    <input
        type="text"
        value={value}
        onChange={onChange}
        className={`
            w-[80vw] bg-[#262626] border border-[#444444] rounded-[4px]
            px-[8px] py-[8px] text-[13px] text-white  font-sans 
            focus:border-[#3b82f6] focus:outline-none 
            placeholder-[#666] box-border
            ${className}
        `}
        spellCheck={false}
        {...props}
    />
);
