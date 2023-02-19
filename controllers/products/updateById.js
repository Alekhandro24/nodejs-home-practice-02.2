const { NotFound } = require("http-errors");
// const Joi = require("joi");

const productOperations = require("../../models/products");
// const productSchema = Joi.object({
//   name: Joi.string().required(),
//   price: Joi.number().min(0.01).required(),
//   location: Joi.string().required(),
// });

const updateById = async (req, res) => {
  // const { error } = productSchema.validate(req.body);
  // if (error) {
  //   error.status = 400;
  //   throw error;
  // }

  // достаємо id з парамс
  const { id } = req.params;

  // //що обновляємо => id на що => req.body
  const result = await productOperations.updateById(id, req.body);

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

module.exports = updateById;
