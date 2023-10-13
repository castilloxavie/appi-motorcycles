import { RepairsServices } from "./repairs.services.js";
import { catchAsync, AppError } from "../error/index.js";

const repairsServices = new RepairsServices();

export const validatePendingREpairs = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const repairs = await repairsServices.findOnerepair(id);

    // if(!repairs){
    //     return res.status(404).json({
    //         status: "error",
    //         message: `Repairs with id: ${id} no found`,
    //     })
    // }

    if (repairs?.dataValues.status !== "pending") {
        // return res.status(400).json({
        //     status: "error",
        //     message: `Repais with id ${id} is no pending or the id does not exist`,
        // });
        return next(new AppError(`Repais with id ${id} is no pending or the id does not exist `, 400))

    }


    req.repairs = repairs;
    next();
});
