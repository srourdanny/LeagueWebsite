import config from "./config";
import pgPromise, {IEventContext} from "pg-promise";

config.ensureInitialized();

const logQueries = true;

const options = {
    error : (err: any, e: IEventContext) => {
        if(e.cn) {
            console.error("Database connection error:", e.cn);
        }
        if (e.query) {
            console.error("Query error on: ", e.query);
            if (e.params) {
                console.error("Using query parameters:", e.params);
            }
        }
        if (e.ctx) {
            console.error("Error inside task or transaction: ", e.ctx.tag);
        }
        console.error(err);
    },
    query: logQueries ? (e: IEventContext) => {
        if (e.ctx) {
            console.log(`In task ${e.ctx.tag} query: ${e.query}`);
        } else {
            console.log("Query: ", e.query);
        }
    } : undefined
}

const pgp = pgPromise(options);

function getPort(port: string | undefined, defaultPort: number) {
    if(port) {
        return parseInt(port) || defaultPort;
    }
    return defaultPort;
}

const connection = {
    application_name: "Node - League Friend Roaster",
    host: process.env.DBS_HOSTNAME || 'localhost',
    port: getPort(process.env.DBS_PORT, 5432),
    database: process.env.DBS_DB_NAME,
    user: process.env.DBS_USERNAME,
    password: process.env.DBS_PASSWORD
}
export const db = pgp(connection);

export function displayDbConnectionParams() {
    console.log("Setting up database with the following parameters:");
    console.log(connection);
}

export async function testDbConnection() {
    console.log("Testing db connection")
    db.$pool.connect().then(()=> {
                console.log("Test complete: Connection to the database successfully established!");
        }).catch((err: any)=> {
        console.error("Test failed: Error occurred when testing the database connection!");
        console.error(err);
    });
}
