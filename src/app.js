import express from "express";
import { AppError } from "./error/appError.js";
import { router } from "./routes/route.js";
import { envs } from "./config/enviroment/enviroment.js";
import { globalErrorHandler } from "./error/errorController.js";
import { enableCors } from "./config/plugins/corsPlugins.js";
import { enableMorgan } from "./config/plugins/morganPlugins.js";
import { limitRequest } from "./config/plugins/rateLimitPlugins.js";
import { setSecurityHeader } from "./config/plugins/securityHeaderPlugin.js";
import { sanitizaterClear } from "./config/plugins/sanitizaterPlugins.js";
import { setParameterPollution } from "./config/plugins/paramaterPollutionPlugins.js";

const app = express();

const ACCEPTED_ORIGIN = ["http://localhost:8080", "http://localhost:5173"];

app.use(express.json());

const rateLimit = limitRequest(20, 60, "too many request from this Ip , please try again in an hour!")
const helmet = setSecurityHeader()
const sanitizater = sanitizaterClear()
const hpp = setParameterPollution() 


//TODO: refactorizar
if (envs.NODE_ENV === "development") {
    enableMorgan(app);
}
app.use(rateLimit)
app.use(helmet())
app.use(sanitizater)
app.use(hpp())
enableCors(app, ACCEPTED_ORIGIN);


// app.use("/api/v1", usersRouter)
app.use("/api/v1", router);

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
