import { type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";
export { ThemeScope, type ThemeSettings } from "./settings.js";
export declare function Avatar({ name, src }: {
    name: string;
    src?: string;
}): import("react").JSX.Element;
export declare function Tag({ children, onRemove }: {
    children: ReactNode;
    onRemove?: () => void;
}): import("react").JSX.Element;
export declare function Timeline({ items }: {
    items: {
        title: string;
        detail?: string;
        time?: string;
    }[];
}): import("react").JSX.Element;
export declare function FileUpload({ label, accept, onFiles }: {
    label: string;
    accept?: string;
    onFiles?: (f: File[]) => void;
}): import("react").JSX.Element;
export declare function CurrencyField({ label, currency }: {
    label: string;
    currency?: string;
}): import("react").JSX.Element;
export declare function Search({ label, ...p }: {
    label: string;
} & InputHTMLAttributes<HTMLInputElement>): import("react").JSX.Element;
export declare function Select({ label, options }: {
    label: string;
    options: {
        value: string;
        label: string;
    }[];
}): import("react").JSX.Element;
export declare function Combobox({ label, options }: {
    label: string;
    options: string[];
}): import("react").JSX.Element;
export declare function Tabs({ items }: {
    items: {
        value: string;
        label: string;
        content: ReactNode;
    }[];
}): import("react").JSX.Element;
export declare function Table({ columns, rows }: {
    columns: string[];
    rows: ReactNode[][];
}): import("react").JSX.Element;
export declare function Badge({ intent, children }: {
    intent?: "positive" | "negative" | "neutral";
    children: ReactNode;
}): import("react").JSX.Element;
export declare function Button({ intent, variant, children, type, ...p }: {
    intent?: "positive" | "negative";
    variant?: "primary" | "secondary";
    children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>): import("react").JSX.Element;
export declare function Drawer({ trigger, title, children }: {
    trigger: ReactNode;
    title: string;
    children: ReactNode;
}): import("react").JSX.Element;
export declare function Input({ label, ...p }: {
    label: string;
} & InputHTMLAttributes<HTMLInputElement>): import("react").JSX.Element;
export declare function Textarea({ label, rows, ...p }: {
    label: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>): import("react").JSX.Element;
export declare function Menu({ label, items }: {
    label: string;
    items: {
        label: string;
        onSelect?: () => void;
    }[];
}): import("react").JSX.Element;
export declare function Dialog({ trigger, title, children, confirmLabel, defaultOpen, onConfirm }: {
    trigger: ReactNode;
    title: string;
    children: ReactNode;
    confirmLabel?: string;
    defaultOpen?: boolean;
    onConfirm?: () => void;
}): import("react").JSX.Element;
export declare function Toast({ trigger, message }: {
    trigger: ReactNode;
    message: string;
}): import("react").JSX.Element;
export declare function DateField({ label, ...p }: {
    label: string;
} & InputHTMLAttributes<HTMLInputElement>): import("react").JSX.Element;
export declare function Quantity({ label, min, max }: {
    label: string;
    min?: number;
    max?: number;
}): import("react").JSX.Element;
export declare function Alert({ title, children }: {
    title: string;
    children?: ReactNode;
}): import("react").JSX.Element;
export declare function Link({ href, children }: {
    href: string;
    children: ReactNode;
}): import("react").JSX.Element;
export declare function Checkbox({ label, ...p }: {
    label: string;
} & InputHTMLAttributes<HTMLInputElement>): import("react").JSX.Element;
