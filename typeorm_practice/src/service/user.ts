import * as express from 'express'
import { User } from '../entity/User';
import * as bodyParser from 'body-parser';
const app = express()
app.use(bodyParser.urlencoded({extended:true}))

const start = async(req,res) => {
    res.send({message : 'start website'})
    console.log('start')
}
const user = async(req,res) => {
    const {name,email,role} = req.body;
    try{
        const user = User.create({ name,email,role })
        await user.save()
        console.log(user);
        return res.json(user)
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
const usersUpdate = async(req,res) => {
    const uuid = req.params.uuid
    const {name,email,role} = req.body
    try {
        const user = await User.findOneOrFail({uuid})

        user.name = name || user.name
        user.email = email || user.email
        user.role = role || user.role

        await user.save()
        return res.json(user);
    } catch (e) {
        console.log(e)
        return res.json(e)
    }
}
const usersDelete = async(req,res) => {
    const uuid = req.params.uuid
    try {
        const user = await User.findOneOrFail({uuid})
        await user.remove()
        return res.status(201).json({message : 'delete user successfully'});
    } catch (e) {
        console.log(e)
        return res.json({error:'something went wrong'})
    }
}
const usersFind = async(req,res) => {
    const uuid = req.params.uuid
    try {
        const user = await User.findOneOrFail({uuid})
        return res.status(201).json(user);
    } catch (e) {
        console.log(e)
        return res.json({user: 'User not found'})
    }
}
export {user,users,start,usersUpdate,usersDelete,usersFind}