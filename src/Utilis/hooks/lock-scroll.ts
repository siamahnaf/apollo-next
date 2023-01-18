import React from 'react';
export const useScrollLock = () => {
    function preventScroll(e: any) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    const lockScroll = React.useCallback(() => {
        document.querySelector('.conversation-scroll')?.addEventListener('wheel', preventScroll);
    }, [])

    const unlockScroll = React.useCallback(() => {
        document.querySelector('.conversation-scroll')?.removeEventListener('wheel', preventScroll);
    }, []);

    return {
        lockScroll,
        unlockScroll
    };
}