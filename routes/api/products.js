// const express = require("express");

// // const createError = require("http-errors");
// const { NotFound } = require("http-errors");
// const Joi = require("joi");

// const productSchema = Joi.object({
//   name: Joi.string().required(),
//   price: Joi.number().min(0.01).required(),
//   location: Joi.string().required(),
// });

// const productOperations = require("../../models/products");
// const router = express.Router();

// // (req, res) =  контролер
// // який статус повинен бути?
// router.get("/", async (req, res, next) => {
//   try {
//     const products = await productOperations.getAll();
//     res.json({
//       status: 200,
//       code: 200,
//       data: {
//         result: products,
//       },
//     });
//   } catch (error) {
//     next(error);
//     // res.status(500).json({
//     //   status: "error",
//     //   code: 500,
//     //   message: "Server error",
//     // });
//   }
// });

// router.get("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await productOperations.getById(id);
//     if (!result) {
//       throw new NotFound(`Product with id=${id} not find`);
//       // throw createError(404, `Product with id=${id} not find`);
//       // const error = new Error(`Product with id=${id} not find`);
//       // error.status = 404;
//       // throw error;
//       // res.status(404).json({
//       //   status: "error",
//       //   code: 404,
//       //   message: `Product with id=${id} not find`,
//       // });
//       // return;
//     }
//     res.json({
//       status: 200,
//       code: 200,
//       data: {
//         result,
//       },
//     });
//   } catch (error) {
//     next(error);
//     // res.status(500).json({
//     //   status: "error",
//     //   code: 500,
//     //   message: "Server error",
//     // });
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const { error } = productSchema.validate(req.body);
//     if (error) {
//       error.status = 400;
//       throw error;
//     }
//     const result = await productOperations.add(req.body);

//     res.status(201).json({
//       status: "succes",
//       code: 200,
//       data: {
//         result,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/:id", async (req, res, next) => {
//   try {
//     const { error } = productSchema.validate(req.body);
//     if (error) {
//       error.status = 400;
//       throw error;
//     }
//     // достаємо id з парамс
//     const { id } = req.params;
//     // //що обновляємо => id на що => req.body
//     const result = await productOperations.updateById(id, req.body);
//     if (!result) {
//       throw new NotFound(`Product with id=${id} not find`);
//     }
//     res.json({
//       status: "succes",
//       code: 200,
//       data: {
//         result,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await productOperations.removeById(id);
//     if (!result) {
//       throw new NotFound(`Product with id=${id} not find`);
//     }
//     // res.status(204).json();
//     res.json({
//       status: "success",
//       code: 200,
//       message: "product deleted",
//       data: {
//         result,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });
// module.exports = router;

// ------------  version -2 ---------------------

const express = require("express");
// const productOperations = require("../../models/products");

const { validation, ctlrWrapper } = require("../../middlewares");
const { productSchema } = require("../../schemas");
const { products: ctrl } = require("../../controllers");

const validateMiddleware = validation(productSchema);

/*
validateMiddleware = (req, res, next)=> {
    const {error} = productSchema.validate(req.body);
    if(error){
    error.status = 400;
    next(error);
    }
    next();
}
*/
const router = express.Router();

router.get("/", ctlrWrapper(ctrl.getAll));
router.get("/:id", ctlrWrapper(ctrl.getById));
router.post("/", validateMiddleware, ctlrWrapper(ctrl.add));
router.put("/:id", validation(productSchema), ctlrWrapper(ctrl.updateById));
router.delete("/:id", ctlrWrapper(ctrl.removeById));

module.exports = router;
