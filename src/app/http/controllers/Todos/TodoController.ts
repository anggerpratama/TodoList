import { Controller } from "../Controller";
import { Todo } from "../../../models/Todo";
import { Request, Response } from "express";
import { ITodo } from "../../../models/interfaces/Models";

export class TodoController extends Controller{


    public async index(req:Request , res: Response){
        
        try {
            
            let todo_list:ITodo
            let limit: number
            let offset: number

            if(req.query.limit || req.query.offset){

                limit = parseInt(req.query.limit)
                offset = parseInt(req.query.offset)

                if(limit && offset)
                {
                    todo_list = await Todo.find({}).limit(limit).skip(offset).lean().exec()                    
                }

                else if(limit)
                {
                    todo_list = await Todo.find({}).limit(limit).lean().exec()
                }

                else if(offset)
                {
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


    public async store(req:Request , res:Response){

        try {
            
            let new_todo = <ITodo>{
                title       : req.body.title,
                description : req.body.description,
                due_at      : req.body.due_at
            }

            await Todo.create(new_todo)

            this.responseBuilder.successMessage(res , "Success Create Todo" , 200 , new_todo)

        } catch (error) {
            this.responseBuilder.errorsMessage(res , "Cannot create todo" , 500 , error.message)
        }

    }

    public async update(req:Request , res:Response){

        try {

            let ids = req.query.id
            
            let new_todo = <ITodo>{
                title       : req.body.title,
                description : req.body.description,
                due_at      : req.body.due_at
            }

            await Todo.findById(ids).update(new_todo).exec()

            this.responseBuilder.successMessage(res , "Success Update Todo" , 200 , new_todo)

        } catch (error) {
            this.responseBuilder.errorsMessage(res , "Cannot update todo" , 500 , error.message)
        }

    }

}