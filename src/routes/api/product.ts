import express from 'express';
import Productcontroller from '../../controller/product';
import ProductServicesController from '../../controller/services/product';
import verify from  '../../authorization/middelware/jwtmiddelware';

const productcontroller = new Productcontroller();
const productcontrollerservices = new ProductServicesController();
const products: express.Router = express.Router();

products.get('/', productcontroller.index);
products.get('/mostpopular', productcontrollerservices.mostpopular);
products.get('/productcate/:cate', productcontrollerservices.getproductsbycate);
products.get('/:id', productcontroller.show);
products.delete('/delete/:id', verify, productcontroller.delete);
products.put('/update', verify, productcontroller.update);
products.post('/', verify, productcontroller.create);


export default products;