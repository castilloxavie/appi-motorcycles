import { Router } from "express";

import { checkValidationResult, validateRegisterUser } from "../config/plugins/expressValidateUser.js";
import { proctect, protectAccount, validateExistUser } from "./user.middlewere.js"
import { deleteUser, findAllUsers, findOneUser, login, register, updateUser } from "./users.controller.js";

export const router = Router();


router.post("/login", login)
router.post("/register",proctect, validateRegisterUser, checkValidationResult, register)

router.route("/").get(findAllUsers);
router
    .route("/:id")
    .get(validateExistUser, findOneUser)
    .patch(protectAccount, updateUser)
    .delete(proctect, validateExistUser, protectAccount, deleteUser);


//!1. siempre que se valla a utilisar la funccion restrictTo debe de ir la funcion proctect
//!2. siempre cuando vayamos a utilizar protectAccount antes debe de ir proctect, validateExistUser