import * as dotenv from 'dotenv';

dotenv.config()

export default {

    /*
    |--------------------------------------------------------------------------
    | Default Connection
    |--------------------------------------------------------------------------
    |
    | Connection defines the default connection settings to be used while
    | interacting with Mongo databases.
    |
    |
    */

    connection: process.env.DB_CONNECTION || 'mongodb',


    /*
    |--------------------------------------------------------------------------
    | Mongo DB
    |--------------------------------------------------------------------------
    |
    | Mongo DB is default database of restify, using no sql.
    | This app using mongoose driver for ORM
    |
    | npm i --save restify-mongoose
    |
    */

    mongodb: {
        db_url: process.env.DB_HOST,
        db_port: process.env.DB_PORT,
        db_name: process.env.DB_NAME,
        object:{
            id: process.env.DB_OBJECT_ID || 'false'
        }
    },

    /*
    |--------------------------------------------------------------------------
    | MySql DB
    |--------------------------------------------------------------------------
    |
    | MySql is RDBMS Database System for complex and 
    | Structured Data Sotre
    |
    | npm i --save mysql
    |
    */

    mysql: {
        db_host: process.env.DB_HOST,
        db_user: process.env.DB_USER,
        db_password: process.env.DB_PASSWORD,
        db_name: process.env.DB_NAME
    }
    
    
}