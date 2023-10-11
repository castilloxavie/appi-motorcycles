import z from "zod"

import { extractValidateData } from "../common/utils/extractErrorDate.js"

export const userShema = z.object({
    name: z.string().min(5,{
        message:"The name is too short, it does not meet the parameter "
    }).max(30, {
        message: "the name is too long"
    }),
    email:z.string().email(),
    password:z.string().min(8).max(16),
    role: z.enum(["client", "employee"])
})

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