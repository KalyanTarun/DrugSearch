/**
 * Utility function which formats the drug data to render UI.
 * @param {*} data 
 * @returns formattedDrugData
 */
export const flattenDrugData = (data) => {
    const result = [];
  
    data.forEach(group => {
      group.conceptProperties.forEach(property => {
        if (property.rxcui && property.name) {
          result.push({
            rxcui: property.rxcui,
            name: property.name,
            synonym: property.synonym || ""
          });
        }
      });
    });
  
    return result;
  };