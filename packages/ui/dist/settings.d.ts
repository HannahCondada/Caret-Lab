import { type ReactNode } from "react";
export type ThemeSettings = {
    colors?: {
        positiveActive?: string;
        positiveHover?: string;
        positiveDisabled?: string;
        negativeActive?: string;
        negativeHover?: string;
        negativeDisabled?: string;
        textDefault?: string;
        textOnAction?: string;
        surfaceRaised?: string;
        surfaceBorder?: string;
    };
    typography?: {
        fontFamily?: "sans" | "serif" | "mono";
        bodySize?: "sm" | "md" | "lg";
    };
    radius?: "none" | "sm" | "md";
};
export declare function ThemeScope({ settings, children, className }: {
    settings?: ThemeSettings;
    children: ReactNode;
    className?: string;
}): import("react").JSX.Element;
