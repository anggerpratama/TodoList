import { Document, Schema, Model, model } from "mongoose";
import { ITodo } from "./interfaces/Models";

interface ITodoModel extends ITodo, Document {

}

const TodoSchema: Schema = new Schema({

    title: String,
    description: String,
    due_at: Date,
    created_at: Date,

} , {collection:'todos'})

export const Todo: Model<ITodoModel> = model<ITodoModel>("Todo" , TodoSchema)