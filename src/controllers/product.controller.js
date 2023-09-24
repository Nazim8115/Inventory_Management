import path from "path";
import ProductModel from "../models/product.model.js";

export default class ProductController {
  getProducts(req, res) {
    // return res.sendFile(
    //   path.join(path.resolve(), "src", "views", "product.html")
    // );

    const result = ProductModel.get();
    return res.render("products.ejs", { products: result });
    // res.json(result);
  }

  getAddForm(req, res) {
    res.render("new-product", { errorMessage: null });
  }

  addNewProduct(req, res) {
    var data = req.body;
    ProductModel.add(data.name, data.price, data.desc, data.imageUrl);
    const result = ProductModel.get();
    return res.render("products.ejs", { products: result });
  }

  getUpdateProductView(req, res) {
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (productFound) {
      res.render("update-product", { errorMessage: null, data: productFound });
    } else {
      res.status(401).send("product not found");
    }
  }

  postUpdateProduct(req, res) {
    ProductModel.update(req.body);
    return res.redirect("/");
  }

  deleteProduct(req, res) {
    console.log(req.params.id);
    ProductModel.findAndDelete(req.params.id);
    return res.redirect("/");
  }
}
