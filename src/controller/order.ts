
import  { Request, Response } from 'express';
import { Order, order,productorder} from '../model/order';

const orderobject = new Order();

export default class Ordercontroller {
    


show = async (req: Request, res: Response) => {
 
    try {
    
        const orderbyuser = await orderobject.show(parseInt(req.params.userid));
        res.json(orderbyuser);
    } catch (err) {
        res.status(400);
        res.json({'status':'fail'});
        
    }
    }
    
delete = async (req: Request, res: Response) => {
    
    try {
    
        const deleted= await orderobject.deleteorder(parseInt(req.params.id))
        res.json(deleted);
    } catch (err) {
        res.status(400);
        res.json({'status':'fail'});
    }    
    }
    updateorderstatus = async (req: Request, res: Response) => {
    
    try {
    
        const updated= await orderobject.updateorderstatus(req.body.status,parseInt(req.body.id))
        res.json(updated);
    } catch (err) {
        res.status(400);
        res.json({'status':'fail'});
    }    
    }
    updateproductsoforder = async (req: Request, res: Response) => {
    
    try {
        
        const orderquery:productorder = {
            id:parseInt(req.body.id),
            product_id:parseInt(req.body.productid),
            quantity:parseInt(req.body.quantity),
            order_id:parseInt(req.body.orderid)
        };
        const updated= await orderobject.updateproductsoforder(orderquery)
        res.json(updated);
    } catch (err) {
        res.status(400);
        res.json({'status':'fail'});
    }    
    }

    create = async (req: Request, res: Response) => {
        try {
        
            const orderquery:order = {
            user_id:parseInt(req.body.userid),
            order_status:req.body.status
            };
    
            const neworder = await orderobject.create(orderquery);
        
            res.json(neworder);
        } catch (err) {
            res.status(400);
            res.json({'status':'fail'});
        }
    }
    addproductsorder= async (req: Request, res: Response) => {
        try {

            const orderquery:productorder = {
                product_id:parseInt(req.body.productid),
                quantity:parseInt(req.body.quantity),
                order_id:parseInt(req.body.orderid)
            };
            const neworderproducts = await orderobject.addproductsto_order(orderquery)
        
            res.json(neworderproducts);
        } catch (err) {
            res.status(400);
            res.json({'status':'fail'});
        }
    }
    
}

