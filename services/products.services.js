const { product } = require("../models/products.model");

async function createProduct(params, callback) {
  if (!params.productname) {
    return callback(
      {
        message: "Product Name Required",
      },
      ""
    );
  }

  const productModel = new product(params);
  productModel
    .save()
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function getProducts(params, callback) {
  const productname = params.productname;
  var condition = productname
    ? { productname: { $regex: new RegExp(productname), $options: "i" } }
    : {};

  product
    .find(condition)
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function getProductById(params, callback) {
  const productid = params.productid;

  product
    .findById(productid)
    .then((response) => {
      if (!response) callback("Not found Product with id " + productid);
      else callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function updateProduct(params, callback) {
  const productid = params.productid;

  product
    .findByIdAndUpdate(productid, params, { useFindAndModify: false })
    .then((response) => {
      if (!response) callback(`Cannot update Tutorial with id=${productid}. Maybe Tutorial was not found!`);
      else callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function deleteProduct(params, callback) {
  const productid = params.productid;

  product
    .findByIdAndRemove(productid)
    .then((response) => {
      if (!response) callback(`Cannot delete Product with id=${productid}. Maybe Product was not found!`);
      else callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};