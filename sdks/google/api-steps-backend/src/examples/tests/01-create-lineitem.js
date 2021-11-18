/**
 * Create lineitems
 * @param {any} sdk 
 * @param {[object]} lineitems 
 * @returns 
 */
 module.exports = async function createLineItems(sdk, lineitems) {
  const result = await sdk.LineItem.create({ lineitems });

  return result;
}