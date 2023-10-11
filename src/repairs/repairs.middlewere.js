import {RepairsServices} from "./repairs.services.js"

const repairsServices = new RepairsServices()

export const validatePendingREpairs = async (req, res, next) => {
    const {id} = req.params

    const repairs = await repairsServices.findOnerepair(id)

    if(!repairs){
        return res.status(404).json({
            status: "error",
            message: `Repairs with id: ${id} no found`,
        })
    }

    if (repairs.status !== "pending") {
        return res.status(400).json({
            status: "error",
            message: `Repais with id ${id} is no pending`
        })
    }
    req.repairs = repairs
    next();
}