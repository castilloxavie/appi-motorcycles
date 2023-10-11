import { Router } from "express";

import { createRepair, deleteRepair, findAllRepairs, findOnerepair, updateRepair } from "./repairs.controller.js";
import {validatePendingREpairs} from "./repairs.middlewere.js" 


export const router = Router();

router.route("/").get(findAllRepairs).post(createRepair);
router
    .route("/:id")
    .get(validatePendingREpairs, findOnerepair)
    .patch(updateRepair)
    .delete(deleteRepair);
