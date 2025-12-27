import { useRef, useEffect, useMemo } from "react";

// Optimized hook using CSS Animations
export const useDirectFlash = (value: number, defaultColor: string) => {
    const ref = useRef<HTMLSpanElement>(null);
    const prevValue = useRef(value);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Reset animation
        el.classList.remove('animate-flash-green', 'animate-flash-red');

        if (value > prevValue.current) {
            // Trigger reflow to restart animation
            void el.offsetWidth;
            el.classList.add('animate-flash-green');
        } else if (value < prevValue.current) {
            void el.offsetWidth;
            el.classList.add('animate-flash-red');
        }
        prevValue.current = value;
    }, [value]);

    // IMPORTANT: Memoize style object to prevent React render diffs
    const style = useMemo(() => ({ color: defaultColor }), [defaultColor]);

    return { ref, style };
};
