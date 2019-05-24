
export interface ITodo {

    _id: any;
    title: String;
    description?: String;
    due_at: Date;
    created_at: Date;

}


export interface IUser {

    _id: any;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    created_at: Date;

}