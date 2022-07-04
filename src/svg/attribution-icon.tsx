export default function AttributionIcon({ color, props }) {
    const bgColor = color === "dark" ? "#0B163C" : "#fff";
    const strokeColor = color === "dark" ? "#fff" : "#0B163C";
  
    return (
      `<svg ${props} width="77" height="77" viewBox="0 0 75 75" fill="${bgColor}" xmlns="http://www.w3.org/2000/svg">
          <path stroke="${strokeColor}" strokeWidth="2" strokeLinecap="round" d="M37.5 1.30969C44.6577 1.30969 51.6547 3.43222 57.6062 7.40885C63.5577 11.3855 68.1963 17.0376 70.9354 23.6505C73.6746 30.2635 74.3913 37.5401 72.9949 44.5603C71.5984 51.5806 68.1517 58.0291 63.0904 63.0904C58.0291 68.1517 51.5806 71.5984 44.5603 72.9949C37.5401 74.3913 30.2635 73.6746 23.6505 70.9354C17.0376 68.1963 11.3855 63.5577 7.40885 57.6062C3.43222 51.6547 1.30969 44.6577 1.30969 37.5C1.30969 27.9017 5.12259 18.6966 11.9096 11.9096C18.6966 5.12259 27.9017 1.30969 37.5 1.30969V1.30969Z"/>
          <path fill="${strokeColor}" d="M42.0002 21.723C42.0002 22.6006 41.7399 23.4585 41.2523 24.1882C40.7648 24.918 40.0717 25.4867 39.2609 25.8226C38.4501 26.1584 37.5579 26.2463 36.6971 26.0751C35.8364 25.9038 35.0457 25.4812 34.4252 24.8607C33.8046 24.2401 33.382 23.4494 33.2108 22.5887C33.0395 21.7279 33.1274 20.8357 33.4633 20.0249C33.7991 19.2141 34.3679 18.5211 35.0976 18.0335C35.8273 17.5459 36.6852 17.2856 37.5628 17.2856C38.7396 17.286 39.868 17.7536 40.7001 18.5857C41.5322 19.4178 41.9998 20.5462 42.0002 21.723"/>
          <path fill="${strokeColor}" d="M32.9723 56.9808H42.1521V42.2307H44.9301C44.9301 42.2307 44.9301 31.6848 44.9301 30.0241C44.9671 29.6764 44.9334 29.3249 44.831 28.9906C44.7286 28.6564 44.5596 28.3463 44.3341 28.0791C44.0675 27.8523 43.7573 27.6825 43.4226 27.58C43.0879 27.4775 42.7358 27.4446 42.3879 27.4832C41.9347 27.4832 33.1884 27.4832 32.7339 27.4832C32.3864 27.4448 32.0348 27.4779 31.7005 27.5803C31.3663 27.6828 31.0565 27.8525 30.7903 28.0791C30.5647 28.3462 30.3957 28.6563 30.2932 28.9906C30.1908 29.3249 30.1572 29.6764 30.1944 30.0241C30.1944 31.6848 30.1944 42.2307 30.1944 42.2307H32.9723V56.9808Z"/>
      </svg>`
    );
  }