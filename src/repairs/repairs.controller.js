import { AppError, catchAsync } from "../error/index.js";
import { validatePartialRepair, validateRepair } from "./repairs.schema.js";
import { RepairsServices } from "./repairs.services.js";

const repairsServices = new RepairsServices();

export const createRepair = catchAsync(async (req, res) => {
    const { hasError, errorMessages, repairData } = validateRepair(req.body);

    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessages,
        });
    }

    const repair = await repairsServices.createRepair(repairData);
    return res.status(201).json(repair);
});

export const findAllRepairs = catchAsync(async (req, res) => {
    const repair = await repairsServices.fiendAllWithAllUser();
    return res.json(repair);
});

export const findOnerepair = catchAsync(async (req, res) => {
    const { repairs } = req;

    return res.json(repairs);
});

export const updateRepair = catchAsync(async (req, res) => {
    const { hasError, errorMessages, repairData } = validatePartialRepair(
        req.body
    );

    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessages,
        });
    }

    const { id } = req.params;
    const repair = await repairsServices.findOnerepair(id);

    if (!repair) {
        return res.status(404).json({
            status: "error",
            message: `Repairs with id: ${id} no found for update`,
        });
        
    }

    const updatesRepair = await repairsServices.updateRepair(
        repair,
        repairData
    );
    return res.json(updatesRepair);
});

export const deleteRepair = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const repair = await repairsServices.findOnerepair(id);

    if (!repair) {
        return next(new AppError(`Repairs with id: ${id} no found for delete`, 404))
    }

    

    await repairsServices.deleteRepair(repair);

    return res.status(204).json(null);
});
