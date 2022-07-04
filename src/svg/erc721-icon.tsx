export default function ERC721Icon({color, props}) {
    const bgColor = color === 'dark' ? '#0B163C' : '#fff';
    const strokeColor = color === 'dark' ? '#fff' : '#0B163C';

    return (
        `<svg ${props} width="77" height="77" viewBox="0 0 77 77" fill="${bgColor}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="38.5" cy="38.5" r="37.5" stroke="${strokeColor}" strokeWidth="2"/>
            <path fill="${strokeColor}" d="M29.78 30.44V34H18.14V20H29.52V23.56H22.78V25.2H28.7V28.6H22.78V30.44H29.78ZM37.597 30.48H36.317V34H31.597V20H38.337C39.6304 20 40.757 20.2133 41.717 20.64C42.677 21.0667 43.417 21.68 43.937 22.48C44.457 23.28 44.717 24.2133 44.717 25.28C44.717 26.28 44.4904 27.1533 44.037 27.9C43.5837 28.6467 42.9304 29.24 42.077 29.68L45.017 34H39.977L37.597 30.48ZM39.957 25.28C39.957 24.76 39.797 24.36 39.477 24.08C39.157 23.7867 38.677 23.64 38.037 23.64H36.317V26.92H38.037C38.677 26.92 39.157 26.78 39.477 26.5C39.797 26.2067 39.957 25.8 39.957 25.28ZM53.7394 34.32C52.2594 34.32 50.926 34.0133 49.7394 33.4C48.5527 32.7733 47.6194 31.9067 46.9394 30.8C46.2727 29.68 45.9394 28.4133 45.9394 27C45.9394 25.5867 46.2727 24.3267 46.9394 23.22C47.6194 22.1 48.5527 21.2333 49.7394 20.62C50.926 19.9933 52.2594 19.68 53.7394 19.68C55.0994 19.68 56.3127 19.92 57.3794 20.4C58.446 20.88 59.326 21.5733 60.0194 22.48L57.0394 25.14C56.1727 24.0467 55.1527 23.5 53.9794 23.5C52.9927 23.5 52.1994 23.82 51.5994 24.46C50.9994 25.0867 50.6994 25.9333 50.6994 27C50.6994 28.0667 50.9994 28.92 51.5994 29.56C52.1994 30.1867 52.9927 30.5 53.9794 30.5C55.1527 30.5 56.1727 29.9533 57.0394 28.86L60.0194 31.52C59.326 32.4267 58.446 33.12 57.3794 33.6C56.3127 34.08 55.0994 34.32 53.7394 34.32Z"/>
            <path fill="${strokeColor}" d="M34.4 43V45.9L29.74 57H24.58L29.02 46.66H26.32V48.7H22.42V43H34.4ZM46.6706 53.34V57H35.4506V54.1L40.5106 49.42C40.9506 49.0067 41.244 48.6533 41.3906 48.36C41.5373 48.0667 41.6106 47.78 41.6106 47.5C41.6106 47.1533 41.4906 46.8867 41.2506 46.7C41.024 46.5 40.6906 46.4 40.2506 46.4C39.824 46.4 39.424 46.5133 39.0506 46.74C38.6773 46.9667 38.3906 47.2867 38.1906 47.7L34.6306 45.92C35.164 44.92 35.944 44.1333 36.9706 43.56C37.9973 42.9733 39.2373 42.68 40.6906 42.68C41.7973 42.68 42.7773 42.86 43.6306 43.22C44.484 43.58 45.1506 44.0933 45.6306 44.76C46.1106 45.4267 46.3506 46.1933 46.3506 47.06C46.3506 47.8333 46.184 48.56 45.8506 49.24C45.5306 49.9067 44.8973 50.6667 43.9506 51.52L41.9506 53.34H46.6706ZM54.2786 43V57H49.5586V46.56H47.1586V43H54.2786Z"/>
        </svg>`
    );
}
