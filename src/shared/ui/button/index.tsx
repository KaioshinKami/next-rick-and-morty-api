import React from "react";
import cn from "classnames";
import '@/shared/ui/button/index.scss'

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: string;
    size?: string;
    fullwidth?: boolean;
    className?: string
    children?: React.ReactNode;
}

const Button: React.FC<IButton> = (
    {
        variant = 'primary',
        size = 'sm',
        fullwidth,
        className,
        children,
        ...rest
    }) => {
    const buttonClasses = [
        'a-button',
        `a-button--${variant}`,
        `a-button--${size}`,
        fullwidth ? 'a-button--fullwidth' : null
    ];

    return (
        <button className={cn(className, buttonClasses.join(' '))} {...rest}>
            {children || 'Добавить'}
        </button>
    );
};

export default Button;