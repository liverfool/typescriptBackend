import * as express from 'express';
import * as bcrypt from 'bcrypt';
import "reflect-metadata"
const app: express.Application = express();

app.get('/', (req:express.Request, res:express.Response) => {
    res.send('hello express');
})
app.listen(3000, () => {
    console.log('실행중');
})
