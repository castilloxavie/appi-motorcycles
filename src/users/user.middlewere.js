import { catchAsync, AppError } from "../error/index.js"
import {UseService} from "./user.services.js"

const userServices = new UseService()

export const validateExistUser  = catchAsync(async(req, res, next) =>{
    const {id} = req.params

    const user = await userServices.findOneUser(id)

    if (!user) {
        return next(new AppError(`User not found with id: ${ id }`, 404))
    }
    req.user = user
    next()
    
})