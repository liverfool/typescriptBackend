import * as express from 'express';
import "reflect-metadata";
import { createConnection } from 'typeorm';
import { User } from './entity/User';
import { user } from './service/user';
import { users } from './service/user';
import * as bodyParser from 'body-parser';
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())

app.get('/', async(req:express.Request, res:express.Response) => {
    res.sendFile(__dirname + '/login.html')
})

app.post('/user', async(req:express.Request, res:express.Response) => {
    user(req,res)
})

app.get('/users', async(req:express.Request, res:express.Response) => {
    users(req,res)
})

createConnection().then(async connection => {
    app.listen(3000, () => console.log('start'));
}).catch(error => console.log(error));