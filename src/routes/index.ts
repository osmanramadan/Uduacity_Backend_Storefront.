import express from 'express';
import users from './api/user';
import products from './api/product';
import  orders from './api/order';

const routes: express.Router = express.Router();

routes.use('/users', users);
routes.use('/orders', orders);
routes.use('/products', products);

routes.get('/', (_req:express.Request, res:express.Response)=>{
res.status(200);
res.send("this main page of routes");

});

export default routes;

