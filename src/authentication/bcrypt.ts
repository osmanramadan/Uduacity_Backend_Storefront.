
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

const pepper:string = process.env.BCRYPT_PASSWORD  as string;
const salt:string = process.env.SALT_ROUNDS  as string;
type user = {
    id?: number;
    firstname?:string;
    lastname?:string;
    upassword?:string

}

export default class Cipher {

encrypt=async (u:user):Promise<string>=>{
    const hash = await bcrypt.hash(
        u.upassword + pepper, 
        parseInt(salt)
    );
    return hash;
}

decrypt=async (hashed:string, password:string):Promise<boolean>=>{

    try {
        const check = await bcrypt.compare(password + pepper, hashed);
        
        if (check) {
            return true;
        }
        return false;
    } catch {
        return false;
    }
    }
}