import {verifyPassword} from "../config/plugins/ecriptedPasswordPlugins.js"
import generateJWT from "../config/plugins/generateJWTplugins.js";
import { AppError, catchAsync } from "../error/index.js";
import { validateLogin, validatePartialUser, validateUser } from "./user.schema.js";
import { UseService } from "./user.services.js";

const useService = new UseService();



//!register and login user

export const login  = catchAsync(async(req, res, next) => {
    const {hasError, errorMessages, userData} = validateLogin(req.body)
    console.log(userData);
    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessages,
        });
    }

    //1.validar la existencia del usuario en bases de datos
    const user = await useService.findOneUser(userData.email)

    if(!user){
        return next(new AppError("this account does not exist"))
    }

    const iscorrectPassword = await verifyPassword(
        userData.password,
        user.password
    )

    if(!iscorrectPassword){
        return next(new AppError("Icorrect email or passwor", 401))
    }

    const token = await generateJWT(user.id)

    return res.status(200).json({
        token,
        user : {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status
        }
    })
})


export const register = catchAsync(async(req, res, next) => {
    const {hasError, errorMessages, userData} = validateUser(req.body)

    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessages,
        });
    }

    const user = await useService.createUser(userData);
    const token = await generateJWT(user.id)
    return res.status(201).json({
        token,
        user : {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status
        }
    });

})


//--------------------------------------------------------------------------
export const findAllUsers = catchAsync(async (req, res) => {
    const users = await useService.findAllUser();
    return res.json(users);
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


