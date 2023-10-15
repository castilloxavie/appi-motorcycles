import z, { date } from "zod"

import { extractValidateData } from "../common/utils/extractErrorDate.js"

export const userShema = z.object({
    name: z.string().min(5,{
        message:"The name is too short, it does not meet the parameter "
    }).max(30, {
        message: "the name is too long"
    }),
    email:z.string().email(),
    password:z.string().min(8),
    role: z.enum(["client", "employee"])
})

export const loginUserSchema = z.object({
    email:z.string().email({message: "Invalid email"}),
    password:z.string().min(8, {message: "Password is too short"}),
})

export const validateLogin = (data) => {
    const result = loginUserSchema.safeParse(data)

    const {hasError, errorMessages, data:userData} = extractValidateData(result)

    return {
        hasError,
        errorMessages,
        userData
    }
}

export const validateUser = (data) =>{
    const result = userShema.safeParse(data)
    const {hasError, errorMessages, data:userData} = extractValidateData(result)

    return {
        hasError,
        errorMessages,
        userData
    }
}


export const validatePartialUser = (data) => {
    const result = userShema.partial().safeParse(data)
    const {hasError, errorMessages, data:userData} = extractValidateData(result)

    return {
        hasError, 
        errorMessages,
        userData
    }
}