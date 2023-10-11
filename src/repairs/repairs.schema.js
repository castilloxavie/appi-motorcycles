import z from "zod"

import{ extractValidateData } from "../common/utils/extractErrorDate.js"

export const repairsSchema = z.object({
    data:z.string({
        invalid_type_error : "date must be a correct format",
        required_error: "date is required"
    }),
    motorsNumber: z.number({
        invalid_type_error : "date must be a correct format",
        required_error: "date is required"
    }),
    description: z.string({
        invalid_type_error : "description must be a correct format",
        required_error: "description is required"
    }),
    userId: z.number()

})

export const validateRepair = (data) => {
    const result = repairsSchema.safeParse(data)
    const {hasError, errorMessages, data:repairData} = extractValidateData(result)

    return {
        hasError,
        errorMessages,
        repairData
    }

}

export const validatePartialRepair= (data) => {
    const result = repairsSchema.partial().safeParse(data)
    const {hasError, errorMessages, data:repairData} = extractValidateData(result)


    return {
        hasError,
        errorMessages,
        repairData
    }

}

