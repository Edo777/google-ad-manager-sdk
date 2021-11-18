/**
 * Create association
 * @param {any} sdk 
 * @param {[number]} lineItems 
 * @param {[number]} creatives 
 * @returns 
 */
module.exports = async function createAssociation(sdk, lineItems, creatives, sizes) {
  const result = await sdk.LineItemCreativeAsso.create({
    lineitemIds: lineItems,
    creativeIds: creatives,
    sizes
  })

  return result;
}