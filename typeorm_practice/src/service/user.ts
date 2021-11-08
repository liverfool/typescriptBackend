import * as express from 'express'
import { User } from '../entity/User';
import * as bodyParser from 'body-parser';
const app = express()
app.use(bodyParser.urlencoded({extended:true}))

const user = async(req,res) => {
    const {name,email,role} = req.body;
    try{
        const user = User.create({ name,email,role })
        await user.save()
        console.log(user);
        return res.status(201).json(user)
    } catch(e){
        console.log(e)
        return res.json(e);
    }
}
const users = async(req,res) => {
    try{
        const users = await User.find()
        return res.json(users)
    } catch(e){
        console.log(e)
        return res.json(e);
    }
}

export {user,users}