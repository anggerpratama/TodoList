import express from 'express'
import bodyParser from 'body-parser'
import dbProviders from './app/providers/DatabaseProviders'
import * as path from 'path'
import cookieParser from 'cookie-parser'

//routers
import apiRouter from './routes/api'
// import bodyParser = require('body-parser');

class App {

    public express: any

    constructor () {

        this.express = express()
        this.middleware()
        this.mountRequest()
        
        //load providers
        dbProviders

    }

    private mountRequest():void{

        this.express.use('/api' , apiRouter)

    }

    private middleware() : void {
        this.express.use(bodyParser.json())
        this.express.use(bodyParser.urlencoded({ extended:false }))

        this.express.use(cookieParser())
        this.express.use(express.static(path.join(__dirname, 'public')))
    }

}

export default new App().express