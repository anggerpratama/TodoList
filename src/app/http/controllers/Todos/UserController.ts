import { Controller } from "../Controller";
import { RequestWithValidators } from "../../../helpers/RequestWithValidators";
import { Response, Request } from "express";
import { IUser } from "../../../models/interfaces/Models";
import { User } from "../../../models/User";

export class UserController extends Controller {


    public async index(req:Request , res: Response)
    {

        try {
            
            let user_list:IUser
            let limit: number
            let offset: number

            if(req.query.limit || req.query.offset){

                limit = parseInt(req.query.limit)
                offset = parseInt(req.query.offset)

                if(limit && offset){
                    user_list = await User.find({}).limit(limit).skip(offset).lean().exec()                    
                }

                else if(limit){
                    user_list = await User.find({}).limit(limit).lean().exec()
                }

                else if(offset){
                    user_list = await User.find({}).skip(offset).lean().exec()
                }

            }else{
                user_list = await User.find({}).lean().exec()                
            }

            this.responseBuilder.successMessage(res , "Success get all data" , 200 , user_list)

        } catch (error) {
            this.responseBuilder.errorsMessage(res , "Failed to load data user" , 500 , error)
        }

    }

    public async store(req: RequestWithValidators , res:Response)
    {
        
        try {
            
            req.checkBody('firstname' , 'This Field must be string and Required').notEmpty().isString()
            req.checkBody('lastname' , 'This Field must be string and Required').notEmpty().isString()
            req.checkBody('email' , 'This Field must be string email and Required').notEmpty().isString().isEmail()
            req.checkBody('phone' , 'This Field must be numeric').notEmpty().isNumeric()

            const v_errors = req.validationErrors()

            if(v_errors){
                throw v_errors
            }

            else{

                let new_user = <IUser>{
                    firstname   : req.body.firstname,
                    lastname    : req.body.lastname,
                    email       : req.body.email,
                    phone       : req.body.phone
                }

                await User.create(new_user)

                this.responseBuilder.successMessage(res , "Success Create Data User" , 200 , new_user)

            }

        } catch (error) {
            this.responseBuilder.errorsMessage(res , "Failed Create Data User" , 200 , error)            
        }

    }

}