import cors from "cors"

export const enableCors = (app, acceptedOrigin) => {
    
    app.use(cors({
        origin: (origin, callback) => {
            if (acceptedOrigin.includes(origin)) {
                return callback(null, true)
            }

            if(!origin){
                return callback(null, true)
            }

            return callback(new Error("not allowed by CORS"))
        }
    }))
}