import { validatePartialRepair, validateRepair } from "./repairs.schema.js";
import { RepairsServices } from "./repairs.services.js";

const repairsServices = new RepairsServices();

export const createRepair = async (req, res) => {
    try {
        const { hasError, errorMessages, repairData } = validateRepair(
            req.body
        );

        if (hasError) {
            return res.status(422).json({
                status: "error",
                message: errorMessages,
            });
        }

        const repair = await repairsServices.createRepair(repairData);
        return res.status(201).json(repair);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const findAllRepairs = async (req, res) => {
    try {
        const repair = await repairsServices.findAllrepairs();
        return res.json(repair);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const findOnerepair = async (req, res) => {
    try {
        
        const {repairs} =req

        return res.json(repairs);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const updateRepair = async (req, res) => {
    try {
        const { hasError, errorMessages, repairData } = validatePartialRepair(
            req.body
        );

        if(hasError){
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
                message: `Repairs with id: ${id} no found`,
            });
        }

       
        const updatesRepair = await repairsServices.updateRepair(
            repair,
            repairData
        );
        return res.json(updatesRepair);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const deleteRepair = async (req, res) => {
    try {
        const { id } = req.params;
        const repair = await repairsServices.findOnerepair(id);

        if (!repair) {
            return res.status(404).json({
                status: "error",
                message: `User with id: ${id} no found`,
            });
        }

        await repairsServices.deleteRepair(repair);

        return res.status(204).json(null);
    } catch (error) {
        return res.status(500).json(error);
    }
};
