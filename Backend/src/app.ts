import express, { Express, Request, Response } from "express";
import swaggerUi from 'swagger-ui-express';
import {swaggerDocument} from "./models/swagger_docs";
import {db,displayDbConnectionParams,testDbConnection} from "./db";

//TODO: only here for testing. remove later
import {testRiotApi} from './services/riotapi/account_service';

const testDbConnectionOnStartup = true;
const testRiotApiOnStartup = true;

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req: Request, res: Response) => {
    res.send('<h1>League Friends Roaster</h1><p>Welcome</p><p><a href="/api-docs">API documentation</a></p>')
});

//Add more routes here

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

//For debugging db connection
if (testDbConnectionOnStartup) {
    displayDbConnectionParams();
    testDbConnection();
}

if (testRiotApiOnStartup) {
    testRiotApi();
}
