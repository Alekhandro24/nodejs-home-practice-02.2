const { NotFound } = require("http-errors");
const productOperations = require("../../models/products");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await productOperations.getById(id);
  if (!result) {
    throw new NotFound(`Product with id=${id} not find`);
  }
  res.json({
    status: "succes",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getById;
