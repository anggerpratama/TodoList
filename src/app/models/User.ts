import { IUser } from "./interfaces/Models";
import { Document, Schema, Model, model } from "mongoose";


interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema({

    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    created_at: Date,

} , {collection:'users'})

export const User: Model<IUserModel> = model<IUserModel>("User" , UserSchema)