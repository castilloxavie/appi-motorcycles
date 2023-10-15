import { Router } from "express";

import {
    createRepair,
    deleteRepair,
    findAllRepairs,
    findOnerepair,
    updateRepair,
} from "./repairs.controller.js";
import { validatePendingREpairs } from "./repairs.middlewere.js";
import { proctect, restrictTo } from "../users/user.middlewere.js";
import {
    validateCreateRepairs,
    checkValidationResult,
} from "../config/plugins/expressValidateRepairs.js";

export const router = Router();

router.use(proctect);
router
    .route("/")
    .get(restrictTo("employee"), findAllRepairs)
    .post(
        restrictTo("employee"),
        validateCreateRepairs,
        checkValidationResult,
        createRepair
    );
router
    .route("/:id")
    .get(validatePendingREpairs, restrictTo("employee"), findOnerepair)
    .patch(restrictTo("employee"), updateRepair)
    .delete(restrictTo("employee"), deleteRepair);
