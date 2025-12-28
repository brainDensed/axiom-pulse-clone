import { useRef, useEffect, useMemo } from "react";


export const useDirectFlash = (value: number, defaultColor: string) => {
    const ref = useRef<HTMLSpanElement>(null);
    const prevValue = useRef(value);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (value > prevValue.current) {
            el.classList.remove('animate-flash-green', 'animate-flash-red');
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    el.classList.add('animate-flash-green');
                });
            });
        } else if (value < prevValue.current) {
            el.classList.remove('animate-flash-green', 'animate-flash-red');
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    el.classList.add('animate-flash-red');
                });
            });
        }
        prevValue.current = value;
    }, [value]);


    const style = useMemo(() => ({ color: defaultColor }), [defaultColor]);

    return { ref, style };
};
