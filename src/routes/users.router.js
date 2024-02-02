import {Router} from "express";
import * as usersController from "../controller/user.controllers.js";
import {auth} from "../middlewares/auth.js";
import {getFiles} from "../util.js";

const router = Router();

router.get("/", usersController.getAll);//DTO

router.get("/by?", usersController.getBy);

router.post("/", usersController.post);

router.post(
  "/documents",
  [auth(["user", "premium"]), getFiles],
  usersController.postDocuments
);

router.put("/by?", usersController.putBy);

router.put("/premium/by?", usersController.putPremiumRole);

router.delete("/:id", usersController.deleteBy);

router.delete("/", usersController.deleteAllOffTime);

export default router;