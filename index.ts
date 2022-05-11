import express from 'express';
import cors from 'cors';
import 'express-async-errors';

const app = express()

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());

app.listen(3030, '0.0.0.0', () => {
    console.log(`app listen on port 3030`)
})