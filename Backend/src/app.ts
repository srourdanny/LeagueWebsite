import express, { Express, Request, Response } from "express";
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from "./models/swagger_docs";
import { db, displayDbConnectionParams, testDbConnection } from "./db";
import searchRoute from "./routes/search";
import { testMatchService } from "./services/riotapi/match_service";

//TODO: only here for testing. remove later
import { testAccountService } from './services/riotapi/account_service';



const testDbConnectionOnStartup = true;
const testServicesOnStartup = false;

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

//This will serve all of the files in the 'public folder' without us having to explicitly enumerate them all
app.use(express.static(__dirname + '/public'));

app.use("/search", searchRoute);

//Add more routes here

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

//For debugging db connection
if (testDbConnectionOnStartup) {
    displayDbConnectionParams();
    testDbConnection();
}

if (testServicesOnStartup) {
    testAccountService();
    testMatchService(undefined);
}