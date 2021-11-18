/**
 * Create creatives
 * @param {any} sdk 
 * @param {[object]} creatives 
 * @returns 
 */
module.exports = async function createCreatives(sdk, creatives) {
  const result = await sdk.Creative.create({ creatives });

  return result;
}