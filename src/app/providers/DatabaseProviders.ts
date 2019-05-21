import config from '../../config/database'

const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId

class DatabaseProviders{

    public async handle(){
        
        try {
            
            if(config.connection === "mongodb"){

                if(config.mongodb.object.id === 'false'){

                    ObjectID.prototype.valueOf = function () {
                        return this.toString();
                    }

                }

                await mongoose.connect(
                    config.mongodb.db_url+':'+
                    config.mongodb.db_port+'/'+
                    config.mongodb.db_name ,
                    {useNewUrlParser:true}
                )

                console.log("mongoDB Connected")

            }

        } catch (error) {
            console.log(error)
        }

    }

}

export default new DatabaseProviders().handle()