import { UseService } from "./user.services.js";

const useService = new UseService();

export const findAllUsers = async (req, res) => {
    try {
        const users = await useService.findAllUser();
        return res.json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const createUser = async (req, res) => {
    try {
        const user = await useService.createUser(req.body);
        
        return res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const findOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await useService.findOneUser(id);

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: `User with id: ${id} no found`,
            });
        }

        return res.json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await useService.findOneUser(id);

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: `User with id: ${id} no found`,
            });
        }

        const updateUser = await useService.updateUser(user, req.body);
        return res.json(updateUser);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await useService.findOneUser(id);

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: `User with id: ${id} no found`,
            });
        }
        await useService.deleteUser(user);

        return res.status(204).json(null)
    } catch (error) {
        return res.status(500).json(error)
    }
};
