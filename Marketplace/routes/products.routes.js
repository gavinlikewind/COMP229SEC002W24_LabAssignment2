import express from "express";
import productsCtrl from "../controllers/products.controller.js";
const router = express.Router();

//connect the route to controller
router.route("/api/products?:name?").get(productsCtrl.list);
router.route("/api/products").post(productsCtrl.create);
router.route("/api/products").delete(productsCtrl.removeAll);

router.param('id', productsCtrl.recordById);
router.route("/api/products/:id").get(productsCtrl.read);
router.route("/api/products/:id").put(productsCtrl.update);
router.route("/api/products/:id").delete(productsCtrl.remove);

router.get("/api/products?*", productsCtrl.searchNN);
//router.get("/api/products:name/:id").get(productsCtrl.search);

export default router;