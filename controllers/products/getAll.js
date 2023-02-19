const productOperations = require("../../models/products");

const getAll = async (req, res) => {
  const products = await productOperations.getAll();
  res.json({
    status: 200,
    code: 200,
    data: {
      result: products,
    },
  });
};

module.exports = getAll;
