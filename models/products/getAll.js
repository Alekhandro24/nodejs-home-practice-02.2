const fs = require("fs/promises");

// console.log(__dirname);
// console.log(__filename);

// const path = require("path");
// const filePath = path.join(__dirname, "products.json");

const filePath = require("./filePath");

const getAll = async () => {
  const data = await fs.readFile(filePath);
  const products = JSON.parse(data);
  return products;
};

module.exports = getAll;
