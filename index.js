import express from "express";
import validateRequest from "./src/middlewares/validation.middleware.js";
import ProductController from "./src/controllers/product.controller.js";
import ejsLayouts from "express-ejs-layouts";
import path from "path";

const server = express();
server.use(express.urlencoded({ extended: true }));
// setup view engine settings
server.set("view engine", "ejs");
// path of our views
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(ejsLayouts);

// create an instance of ProductController
const productController = new ProductController();
server.get("/", productController.getProducts);
server.get("/new", productController.getAddForm);
server.post("/", validateRequest, productController.addNewProduct);
server.use(express.static("src/views")); //doubt why css not work if i remove this line

server.listen(3400);
console.log("Server is listening on port 3400");
