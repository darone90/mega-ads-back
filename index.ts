import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/error";

const app = express()

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());

//routers....

app.use(handleError);

app.listen(3030, '0.0.0.0', () => {
    console.log(`app listen on port 3030`)
})