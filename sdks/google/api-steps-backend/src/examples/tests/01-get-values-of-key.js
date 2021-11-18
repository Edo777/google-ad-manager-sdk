// For more information about targetingValues -> 
// !!! https://developers.google.com/ad-manager/api/reference/v202111/CustomTargetingService.CustomTargetingValue?hl=en

// For more information about targetingKeys -> 
// !!! https://developers.google.com/ad-manager/api/reference/v202111/CustomTargetingService.CustomTargetingKey?hl=en


/**
 * Create key-values
 * @param {[{
 *   displayName: string,
 *   name: string,
 *   type: 'PREDEFINED' | 'FREEFORM'
 * }]} keys 
 * @param {[{
 *   displayName: string,
 *   name: string,
 *   matchType: "EXACT" | "BROAD" | "PREFIX" | "BROAD_PREFIX" | "SUFFIX" | "CONTAINS"
 * }]} values 
 * @param {"IS_NOT" | "IS"} operator
 * @returns 
 */
module.exports = async function getValues(sdk , key) {
  const result = await sdk.TargetingData.getValuesByKeyIds({ keys: [key] }) //values, operator 

  return result;
}