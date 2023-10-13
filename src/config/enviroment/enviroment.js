import "dotenv/config"
import  env  from "env-var"


export const envs = {
    NODE_ENV: env.get('NODE_ENV').required().asString(),
    PORT: env.get('PORT').required().asPortNumber(),
    DB_URI: env.get('DB_URI').required().asString(),
      
}


