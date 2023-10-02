import { Router } from "express";

import { router as repairRouter } from "../repairs/repairs.route.js";
import { router as usersRouter } from "../users/users.route.js";

export const router = Router();

router.use("/users", usersRouter);
router.use("/repairs", repairRouter)