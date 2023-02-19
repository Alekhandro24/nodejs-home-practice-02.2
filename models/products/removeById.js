const getAll = require("./getAll");
const updateProducts = require("./updateProducts");

const removeById = async (id) => {
  const products = await getAll();
  const idx = products.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  const [removeProdact] = products.splice(idx, 1);
  await updateProducts(products);
  return removeProdact;
};

// const removeById = async (id) => {
//   const products = await getAll();
//   const idx = products.findIndex((item) => item.id === id);
//   if (idx === -1) {
//     return null;
//   }
//   const newProducts = products.filter((_, index) => index !== idx);
//   await updateProducts(newProducts);
//   return products[idx];
// };

module.exports = removeById;
