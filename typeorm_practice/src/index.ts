import * as express from 'express';
import { userInfo } from 'os';
import "reflect-metadata";
import {Connection, createConnection} from "typeorm";
import {User} from "./entity/User";
import * as bodyParser from 'body-parser';
const app:express.Application = express();

app.use(bodyParser.urlencoded({extended:true}))

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = `mun`;
    user.lastName = `min`;
    user.age = 17;
    user.middleName = 'jeong'
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));