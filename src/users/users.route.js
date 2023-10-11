import { Router } from "express";

import { createUser, deleteUser, findAllUsers, findOneUser, updateUser } from "./users.controller.js";
import {validateExistUser} from "./user.middlewere.js"
export const router = Router();

router.route("/").get(findAllUsers).post(createUser);
router
    .route("/:id")
    .get(validateExistUser, findOneUser)
    .patch(updateUser)
    .delete(validateExistUser, deleteUser);


