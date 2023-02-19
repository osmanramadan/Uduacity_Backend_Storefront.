import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

type user = {
    id?: number;
    firstName?:string;
    lastName?:string;
    Upassword?:string

}

const TOKEN_SECRET:string = process.env.TOKEN_SECRET as string;

const generatetoken = async (u:user):Promise<string>=>{
    const token = jwt.sign({userinfo:u}, TOKEN_SECRET, {
        expiresIn: '15d',
    });
    return token;
};

export default generatetoken;