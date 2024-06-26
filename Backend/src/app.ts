import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import swaggerUi from 'swagger-ui-express';
import {swaggerDocument} from "./models/swagger-docs";

dotenv.config();
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