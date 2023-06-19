import React, { useEffect, useRef } from 'react';

const OutsideClickHandler = ({ onOutsideClick, children, openModal }) => {
    const containerRef = useRef();
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                onOutsideClick();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [onOutsideClick]);

    return (
        <div
            className={`${
                openModal
                    ? 'opacity-1 visible scale-100 backdrop-blur-sm'
                    : 'opacity-0 invisible scale-90 backdrop-blur-none'
            } transition-all fixed z-40 items-center  justify-center overflow-x-hidden overflow-y-auto inset-0 h-modal sm:h-full flex`}>
            <div
                ref={containerRef}
                className="w-full h-full max-w-md md:h-auto modal-body px-3 z-50">
                {children}
            </div>
        </div>
    );
};

export default OutsideClickHandler;
