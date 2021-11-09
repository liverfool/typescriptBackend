import * as express from 'express';
import "reflect-metadata";
import { createConnection } from 'typeorm';
import { user,users,usersUpdate,usersDelete,start,usersFind } from './service/user';
const tokenRouter = require('./routes/token')
import * as bodyParser from 'body-parser';
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use('/token', tokenRouter)

app.get('/', async(req:express.Request,res:express.Response) => {
    start(req,res)
})
app.post('/user', async(req:express.Request, res:express.Response) => {
    user(req,res)
})
app.get('/users', async(req:express.Request, res:express.Response) => {
    users(req,res)
})
app.put('/users/:uuid', async(req:express.Request, res:express.Response) => {
    usersUpdate(req,res)
})
app.delete('/users/:uuid', async(req:express.Request, res:express.Response) => {
    usersDelete(req,res)
})
app.get('/users/:uuid', async(req:express.Request,res:express.Response) => {
    usersFind(req,res)
})
createConnection().then(async connection => {
    app.listen(3000, () => console.log('start'));
}).catch(error => console.log(error));