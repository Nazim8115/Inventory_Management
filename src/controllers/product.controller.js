import path from "path";
import ProductModel from "../models/product.model.js";

export default class ProductController {
  getProducts(req, res) {
    var result = ProductModel.get();
    res.render("products.ejs", {
      products: result,
      userEmail: req.session.userEmail,
    });
  }

  getAddForm(req, res, next) {
    res.render("new-product", {
      errorMessage: null,
      userEmail: req.session.userEmail,
    });
  }

  addNewProduct(req, res, next) {
    const { name, desc, price } = req.body;
    const imageUrl = "images/" + req.file.filename;
    ProductModel.add(name, price, desc, imageUrl);
    const result = ProductModel.get();
    return res.render("products.ejs", {
      products: result,
      userEmail: req.session.userEmail,
    });
  }

  getUpdateProductView(req, res) {
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (productFound) {
      res.render("update-product", {
        errorMessage: null,
        data: productFound,
        userEmail: req.session.userEmail,
      });
    } else {
      res.status(401).send("product not found");
    }
  }

  postUpdateProduct(req, res) {
    const x = {
      id: req.body.id,
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
      imageUrl: req.file ? req.file.path : req.body.imageUrl,
    };
    console.log(x);
    ProductModel.update(req.body);
    return res.redirect("/");
  }

  deleteProduct(req, res) {
    const id = req.params.id;
    ProductModel.findAndDelete(id);
    const result = ProductModel.get();
    return res.render("products.ejs", { products: result });
  }
}
