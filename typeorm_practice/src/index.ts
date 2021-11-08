import * as express from 'express';
import "reflect-metadata";
import { createConnection } from 'typeorm';
import { User } from './entity/User';
import * as bodyParser from 'body-parser';
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())

//create
app.get('/', async(req:express.Request, res:express.Response) => {
    res.sendFile(__dirname + '/login.html')
})
// create
app.post('/users', async(req:express.Request, res:express.Response) => {
    const {name,email,role} = req.body;
    try{
        const user = User.create({ name,email,role })

        await user.save()
        console.log(user);
        return res.status(201).json(user)
    } catch(err){
        console.log(err)
        return res.status(500).json(err);
    }
})
//read
app.get('/user', async(req:express.Request, res:express.Response) => {
    try{
        const users = await User.find()
        return res.json(users)
    } catch(err){
        console.log(err)
        return res.status(500).json(err);
    }
})
createConnection().then(async connection => {
    app.listen(3000, () => console.log('start'));
}).catch(error => console.log(error));