import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { productController } from "../controllers/product.controller";

const router = Router();

//users
router.post("/user", userController.create);
router.get("/user/:id", userController.read);
router.get("/users", userController.readAll);
router.put("/user/:id", userController.update);
router.put("/user/password/:id", userController.updatePassword);
router.delete("/user/:id", userController.delete); 


//products
router.post("/product", productController.create);
router.get("/products", productController.readAll);
router.get("/product/:id", productController.read);
router.put("/product/:id", productController.update);
router.delete("/product/:id", productController.delete);


export default router;
