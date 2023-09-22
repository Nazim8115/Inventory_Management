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
}
