import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import ButtonIcon from './ButtonIcon';

function ThemeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const isDark = localStorage.getItem('isDarkMode') === 'true';
        setIsDarkMode(isDark);
        document.body.classList.toggle('dark', isDark);
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('isDarkMode', !isDarkMode);
        document.body.classList.toggle('dark', !isDarkMode);
    };

    return (
        <ButtonIcon clickEvent={toggleTheme}>
            {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
        </ButtonIcon>
    );
}

export default ThemeToggle;
