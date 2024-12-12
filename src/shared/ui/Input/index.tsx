import React from 'react';

interface InputProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void ;
    value: string;
    placeholder?: string;
    className?: string;

}

const Input:React.FC<InputProps> =
    ({
         onChange,
         value,
         placeholder,
         className
     }) => {

        return (
            <input onChange={onChange} value={value} placeholder={placeholder} className={className} />
        );
    };

export default Input;