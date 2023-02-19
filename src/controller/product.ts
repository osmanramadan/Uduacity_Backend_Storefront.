
import { Request, Response } from 'express';
import { Product, product} from '../model/product';

const productobject = new Product();


export default class Productcontroller {
    
index = async (_req: Request, res: Response) => {

    try {
        const allproducts = await productobject.index();
        res.json(allproducts);
    } catch (e) {
        res.status(400);
        res.json({'status':'fail'});
    }

}

show = async (req: Request, res: Response) => {
    
try {
    const productbyid = await productobject.show(req.params.id);
    res.json(productbyid);
} catch (e) {
    res.status(400);
    res.json({'status':'fail'});
}
}


delete = async (req: Request, res: Response) => {
    
    try {
    
        const deleted = await productobject.deleteproduct(req.params.id);
        res.json(deleted);
    } catch (err) {
        res.status(400);
        res.json({'status':'fail'});
    }    
    }
update = async (req: Request, res: Response) => {
    
    try {
    
    const updated = await productobject.updateproduct(req.body.productname, req.body.price, req.body.category, req.body.id);
        res.json(updated);
    } catch (err) {
        res.status(400);
        res.json({'status':'fail'});
    }    
    }

create = async (req: Request, res: Response) => {
    try {
    
    const productquery:product = {
    Pname:req.body.productname,
    price:req.body.price,
    category:req.body.category
    };
        const newproduct = await productobject.create(productquery);
        res.json(newproduct);
    } catch (err) {
        res.status(400);
        res.json({'status':'fail'});
    }
}

}

