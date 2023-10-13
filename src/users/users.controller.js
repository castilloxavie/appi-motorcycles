import { catchAsync } from "../error/index.js";
import { validatePartialUser, validateUser } from "./user.schema.js";
import { UseService } from "./user.services.js";

const useService = new UseService();


export const findAllUsers = catchAsync(async (req, res) => {
    const users = await useService.findAllUser();
    return res.json(users);
});

export const createUser = catchAsync(async (req, res) => {
    const { hasError, errorMessages, userData } = validateUser(req.body);

    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessages,
        });
    }

    const user = await useService.createUser(userData);

    return res.status(201).json(user);
});

export const findOneUser = async (req, res, next) => {
    try {
        const { user } = req;

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const updateUser = catchAsync(async (req, res) => {
    const { hasError, errorMessages, userData } = validatePartialUser(req.body);

    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessages,
        });
    }

    const { id } = req.params;
    const user = await useService.findOneUser(id);

    if (!user) {
        return res.status(404).json({
            status: "error",
            message: `User with id: ${id} no found`,
        });
    }

    const updateUser = await useService.updateUser(user, userData);
    return res.json(updateUser);
});

export const deleteUser = catchAsync(async (req, res) => {
    const { user } = req;

    await useService.deleteUser(user);
    return res.status(204).json(null);
});
