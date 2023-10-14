import express from "express";
import validateRequest from "./src/middlewares/validation.middleware.js";
import ProductController from "./src/controllers/product.controller.js";
import UserController from "./src/controllers/user.conroller.js";
import ejsLayouts from "express-ejs-layouts";
import path from "path";
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";

const server = express();
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));
// setup view engine settings
server.set("view engine", "ejs");

// path of our views
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(ejsLayouts);

// create an instance of ProductController
const productController = new ProductController();
const userController = new UserController();

server.get("/register", userController.getRegister);
server.post("/register", userController.postRegister);
server.get("/login", userController.getLogin);
server.post("/login", userController.postLogin);
server.get("/", productController.getProducts);
server.get("/new", productController.getAddForm);
server.post(
  "/",
  uploadFile.single("imageUrl"),
  validateRequest,
  productController.addNewProduct
);
server.get("/update/:id", productController.getUpdateProductView);
server.post("/update", productController.postUpdateProduct);
server.post("/delete/:id", productController.deleteProduct);

server.use(express.static("src/views")); //doubt why css not work if i remove this line

server.listen(3400);
console.log("Server is listening on port 3400");
