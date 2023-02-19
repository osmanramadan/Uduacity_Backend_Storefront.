
import { Request, Response } from 'express';
import { User, user} from '../model/user';
import generatetoken from '../authorization/signtoken';

const userobject = new User();



export default class Usercontroller {
    
index = async (_req: Request, res: Response) => {
    try {
        const allusers = await userobject.index();
    
        res.json(allusers);
    } catch (e) {
        res.status(400);
        res.json({'status':'fail'});
    }
    }
    
show = async (req: Request, res: Response) => {
    
    try {
    
        const userbyid = await userobject.show(req.params.id);
        res.json(userbyid);
    } catch (err) {
        res.status(400);
        res.json({'status':'fail'});
    }    
    }
delete = async (req: Request, res: Response) => {
    
    try {
    
        const deleted = await userobject.deleteuser(req.params.id);
        res.json(deleted);
    } catch (err) {
        res.status(400);
        res.json({'status':'fail'});
    }    
    }
update = async (req: Request, res: Response) => {
    
    try {
    
        const updated = await userobject.updateuser(req.body.firstname, req.body.lastname, req.body.password, req.body.id);
        res.json(updated);
    } catch (err) {
        res.status(400);
        res.json({'status':'fail'});
    }    
    }

getuserbycredentials = async (req: Request, res: Response) => {
    
    try {
        // by consider that username in system is unique
        const userbyusername = await userobject.getuserbycredentials(req.body.username, req.body.password);
        if (userbyusername) {
            res.json(userbyusername);
        } else {
            res.status(404);
            res.json({"error":"user not found or password wrong"});
        }
    } catch (err) {
        res.status(400);
        res.json({'status':'fail'});
    }    
    }
    
create = async (req: Request, res: Response) => {
        try {
        
            const userquery:user = {
            firstname:req.body.firstname,
            lastname: req.body.lastname,
            upassword:req.body.password 
            };
            const newuser = await userobject.create(userquery);
            const token = await generatetoken(newuser);
            res.json({user:newuser, credential:token});
        } catch (err) {
            res.status(400);
            res.json({status:'fail'});
        }
    }
}
