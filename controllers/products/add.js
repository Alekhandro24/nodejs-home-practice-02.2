// const Joi = require("joi");

// const productSchema = Joi.object({
//   name: Joi.string().required(),
//   price: Joi.number().min(0.01).required(),
//   location: Joi.string().required(),
// });

const productOperations = require("../../models/products");

const add = async (req, res) => {
  const result = await productOperations.add(req.body);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = add;
