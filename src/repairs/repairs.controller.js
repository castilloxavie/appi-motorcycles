import { RepairsServices } from "./repairs.services.js";

const repairsServices = new RepairsServices();

export const createRepair = async (req, res) => {
    try {
        const repair = await repairsServices.createRepair(req.body);
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
        const { id } = req.params;
        const repair = await repairsServices.findOnerepair(id);

        if (!repair) {
            return res.status(404).json({
                status: "error",
                message: `Repairs with id: ${id} no found`,
            });
        }

        return res.json(repair);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const updateRepair = async (req, res) => {
    try {
        const { id } = req.params;
        const repair = await repairsServices.findOnerepair(id);

        if (!repair) {
            return res.status(404).jso({
                status: "error",
                message: `Repairs with id: ${id} no found`,
            });
        }

        const updateRepair = await repairsServices.updateRepair(
            repair,
            req.body
        );
        return res.json(updateRepair);
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
        return res.status(500).json(error)
    }
};
