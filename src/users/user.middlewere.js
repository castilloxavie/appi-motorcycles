import {UseService} from "./user.services.js"

const userServices = new UseService()

export const validateExistUser  = async(req, res, next) =>{
    const {id} = req.params

    const user = await userServices.findOneUser(id)

    if (!user) {
            return res.status(404).json({
                status: "error",
                message: `User with id: ${id} no found`,
            });
    }
    req.user = user
    next()
    
} 