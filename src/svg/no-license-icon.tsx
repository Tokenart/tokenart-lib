export default function NoLicenseIcon({color, props}) {
    const bgColor = color === 'dark' ? '#0B163C' : '#fff';
    const strokeColor = color === 'dark' ? '#fff' : '#0B163C';

    return (
        `<svg ${props} width="77" height="77" viewBox="0 0 77 77" fill="${bgColor}" xmlns="http://www.w3.org/2000/svg">
            <path fill="${strokeColor}" d="M38.5 75.3202C58.8352 75.3202 75.3201 58.8353 75.3201 38.5001C75.3201 18.1649 58.8352 1.67993 38.5 1.67993C18.1648 1.67993 1.67987 18.1649 1.67987 38.5001C1.67987 58.8353 18.1648 75.3202 38.5 75.3202Z"/>
            <path fill="${strokeColor}" d="M17.7072 22.3168H26.8578V54.6818H17.7072V22.3168Z"/>
            <path fill="${strokeColor}" d="M62.5585 34.2936C62.5585 41.6474 57.0109 46.2207 48.1788 46.2207H42.5344V54.6873H33.3838V22.3168H48.1828C57.0109 22.3168 62.5585 26.8954 62.5585 34.2936ZM53.3138 34.2936C53.3138 31.2873 51.4189 29.5295 47.6237 29.5295H42.5411V39.0093H47.6184C51.4189 39.008 53.3138 37.2502 53.3138 34.2936Z"/>
            <line x1="63.8085" y1="64.8436" x2="11.1153" y2="14.322" stroke="#DB504A" strokeWidth="4"/>
            <line x1="13.6002" y1="65.1926" x2="64.1217" y2="12.4994" stroke="#DB504A" strokeWidth="4"/>
        </svg>`
    );
}
