import { Controller } from "../Controller"
import { Todo } from "../../../models/Todo"
import { Request, Response } from "express"
import { ITodo } from "../../../models/interfaces/Models"
import { RequestWithValidators } from "../../../helpers/RequestWithValidators";

export class TodoController extends Controller
{

    /**
     * 
     * Proccess get all data todos
     * 
     * @param req 
     * @param res
     */

    public async index(req:Request , res: Response)
    {
        
        try {
            
            let todo_list   : ITodo
            let limit       : number
            let offset      : number

            if(req.query.limit || req.query.offset){

                limit = parseInt(req.query.limit)
                offset = parseInt(req.query.offset)

                if(limit && offset){
                    todo_list = await Todo.find({}).limit(limit).skip(offset).lean().exec()                    
                }

                else if(limit){
                    todo_list = await Todo.find({}).limit(limit).lean().exec()
                }

                else if(offset){
                    todo_list = await Todo.find({}).skip(offset).lean().exec()
                }

            }else{
                todo_list = await Todo.find({}).lean().exec()                
            }


            this.responseBuilder.successMessage(res , "Success get All Todos" , 200 , todo_list)

        } catch (error) {
            this.responseBuilder.errorsMessage(res , "Cannot get All Todos, try Again" , 500 , error.message)
        }

    }


    /**
     * 
     * Process store data todo
     * 
     * @param req 
     * @param res 
     */

    public async store(req:RequestWithValidators , res:Response)
    {

        try {

            //Validator
            req.checkBody('title' , 'Title is must be string and required').notEmpty().isString()
            req.checkBody('description' , 'Description must be string').isString()

            const v_errors = req.validationErrors()

            if(v_errors){
                throw v_errors
            }

            else{

                let new_todo = <ITodo>{
                    title       : req.body.title,
                    description : req.body.description,
                    due_at      : req.body.due_at
                }
    
                await Todo.create(new_todo)
    
                this.responseBuilder.successMessage(res , "Success Create Todo" , 200 , new_todo)

            }
            

        } catch (error) {
            this.responseBuilder.errorsMessage(res , "Cannot create todo" , 500 , error)
        }

    }


    /**
     * 
     * Process Data Update from database
     * 
     * @param req 
     * @param res 
     */

    public async update(req:RequestWithValidators , res:Response)
    {

        try {

            //Validator
            req.checkBody('title' , 'Title is must be string and required').notEmpty().isString()
            req.checkBody('description' , 'Description must be string').isString()
            req.checkQuery('id' , 'Query ID must be inserted to update').notEmpty()

            const v_errors = req.validationErrors()

            if(v_errors){
                throw v_errors
            }

            let ids = req.query.id
            
            let new_todo = <ITodo>{
                title       : req.body.title,
                description : req.body.description,
                due_at      : req.body.due_at
            }

            await Todo.findById(ids).update(new_todo).exec()

            this.responseBuilder.successMessage(res , "Success Update Todo" , 200 , new_todo)

        } catch (error) {
            this.responseBuilder.errorsMessage(res , "Cannot update todo" , 500 , error)
        }

    }


    /**
     * 
     * Proccess Deleted data todo
     * 
     * @param req 
     * @param res 
     */

    public async delete(req:RequestWithValidators , res:Response)
    {

        try {

            //validator
            req.checkQuery('id' , 'Query ID must be inserted to update').notEmpty()

            const v_errors = req.validationErrors()

            if(v_errors){
                throw v_errors
            }
            
            let ids = req.query.id

            await Todo.findByIdAndDelete(ids)

            this.responseBuilder.successMessage(res , "Success delete todo" , 200 , {"id" : ids})

        } catch (error) {
            this.responseBuilder.errorsMessage(res , "Cannot Delete Todo" , 500 , error)
        }

    }

}