import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/error";
import rateLimit from "express-rate-limit";
import {adRouter} from "./routers/ad.router";
import {appConfig} from "./app.config";

const app = express()

app.use(cors({
    origin: appConfig.origin
}));

app.use(express.json());

app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100
}))

app.use(appConfig.prefix, adRouter);

app.use(handleError);

app.listen(appConfig.port, '0.0.0.0', () => {
    console.log(`app listen on port 3030`)
})