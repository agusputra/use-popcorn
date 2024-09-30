import { useEffect } from "react";

export function useKey(key, callback) {
    useEffect(() => {
        function handleKeydown(event) {
            if (event.key.toLowerCase() === key.toLowerCase()) {
                callback();
            }
        }
        window.addEventListener("keydown", handleKeydown);
        return () => {
            window.removeEventListener("keydown", handleKeydown);
        };
    }, [key, callback]);
}