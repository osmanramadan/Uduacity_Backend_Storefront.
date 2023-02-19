import express from 'express';
import Usercontroller from '../../controller/user';
import verify from  '../../authorization/middelware/jwtmiddelware';
import UserServicesController from '../../controller/services/user';


const usercontroller = new Usercontroller();
const usercontrollerservices = new UserServicesController();
const users: express.Router = express.Router();

users.get('/', verify, usercontroller.index);
users.get('/:userid/purchases', verify, usercontrollerservices.userpurchases);
users.get('/:id', verify, usercontroller.show);
users.delete('/delete/:id', verify, usercontroller.delete);
users.put('/update', verify, usercontroller.update);
users.post('/login', usercontroller.getuserbycredentials);
users.post('/', usercontroller.create);


export default users;
