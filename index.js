import express from "express";
import validateRequest from "./src/middlewares/validation.middleware.js";
import ProductController from "./src/controllers/product.controller.js";
import UserController from "./src/controllers/user.conroller.js";
import ejsLayouts from "express-ejs-layouts";
import path from "path";
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";
import session from "express-session";
import { auth } from "./src/middlewares/auth.middleware.js";

const server = express();
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));
// setup view engine settings
server.set("view engine", "ejs");

// path of our views
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(ejsLayouts);
server.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// create an instance of ProductController
const productController = new ProductController();
const userController = new UserController();

server.get("/register", userController.getRegister);
server.post("/register", userController.postRegister);
server.get("/login", userController.getLogin);
server.post("/login", userController.postLogin);
server.get("/logout", userController.logout);
server.get("/", auth, productController.getProducts);
server.get("/new", auth, productController.getAddForm);
server.post(
  "/",
  auth,
  uploadFile.single("imageUrl"),
  validateRequest,
  productController.addNewProduct
);
server.get("/update/:id", auth, productController.getUpdateProductView);
server.post("/update", auth, productController.postUpdateProduct);
server.post("/delete/:id", auth, productController.deleteProduct);

server.use(express.static("src/views")); //doubt why css not work if i remove this line

server.listen(3400);
console.log("Server is listening on port 3400");
