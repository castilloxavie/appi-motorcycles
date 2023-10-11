

export const extractValidateData = (resultvalidation)=> {
    let errorMessages;
    let data;

    const hasError = !resultvalidation.success

    if(hasError) errorMessages =  JSON.parse(resultvalidation.error.message)
    if(!hasError) data =resultvalidation.data

    return {
        hasError,
        errorMessages,
        data
    }
    
}