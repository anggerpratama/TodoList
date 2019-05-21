import app from './App'
import config from './config/app'


const port = config.app_port

app.listen(port , (err:any) => {
    if (err) {
        return console.log(err)
    }

    return console.log(`server is start at port ${port}`)
})