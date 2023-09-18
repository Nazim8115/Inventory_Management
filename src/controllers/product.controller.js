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
    const { name, price, imageUrl } = req.body;
    let errors = [];
    if (!name || name.trim() == "") {
      errors.push("Name is required");
    }
    if (!price || parseFloat(price) < 1) {
      errors.push("price must be a positive value");
    }
    try {
      const validUrl = new URL(imageUrl);
    } catch (err) {
      errors.push("Url is invalid");
    }

    if (errors.length > 0) {
      return res.render("new-product", { errorMessage: errors[0] });
    }

    var data = req.body;
    ProductModel.add(data.name, data.price, data.desc, data.imageUrl);
    const result = ProductModel.get();
    return res.render("products.ejs", { products: result });
  }
}
