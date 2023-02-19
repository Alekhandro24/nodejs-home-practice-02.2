const { NotFound } = require("http-errors");

const productOperations = require("../../models/products");

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await productOperations.removeById(id);
  if (!result) {
    throw new NotFound(`Product with id=${id} not find`);
  }
  // res.status(204).json();
  res.json({
    status: "success",
    code: 200,
    message: "product deleted",
    data: {
      result,
    },
  });
};

module.exports = removeById;
