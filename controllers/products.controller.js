const productsServices = require("../services/products.services");
const upload = require("../middleware/upload.js");

// Create and Save a new Product
exports.create = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      next(err);
    } else {
      const url = req.protocol + "://" + req.get("host");

      const path =
        req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

      var model = {
        productname: req.body.productname,
        productdescription: req.body.productdescription,
        productprice: req.body.productprice,
        productimage: path != "" ? url + "/" + path : "",
      };

      productsServices.createProduct(model, (error, results) => {
        if (error) {
          return next(error);
        }
        return res.status(200).send({
          // results
          //message: "Success",
         data: results,
        });
      });
    }
  });
};

// Retrieve all Products from the database.
exports.findAll = (req, res, next) => {
  var model = {
    productname: req.query.productname,
  };

  productsServices.getProducts(model, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      
      //message: "Success",
     data: results,
    });
  });
};

// Find a single Tutorial with an id
exports.findOne = (req, res, next) => {
  var model = {
    productid: req.params.id,
  };

  productsServices.getProductById(model, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      
      //message: "Success",
      data: results,
    });
  });
};

// Update a Product by the id in the request
exports.update = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      next(err);
    } else {
      const url = req.protocol + "://" + req.get("host");

      const path =
        req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

      var model = {
        productid: req.params.id,
        productname: req.body.productname,
        productdescription: req.body.productdescription,
        productprice: req.body.productprice,
        productimage: path != "" ? url + "/" + path : "",
      };

      console.log(model);

      productsServices.updateProduct(model, (error, results) => {
        if (error) {
          return next(error);
        }
        return res.status(200).send({
          
          //message: "Success",
          data: results,
        });
      });
    }
  });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res, next) => {
  var model = {
    productid: req.params.id,
  };

  productsServices.deleteProduct(model, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      
      //message: "Success",
      data: results,
    });
  });
};