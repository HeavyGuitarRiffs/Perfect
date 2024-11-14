// reportWebVitals.js

// Function to report web vitals
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import the web-vitals package
    import('web-vitals')
      .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        // Measure and report various web vitals metrics
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      })
      .catch((error) => {
        console.error('Error importing web-vitals:', error);
      });
  }
};

export default reportWebVitals;

