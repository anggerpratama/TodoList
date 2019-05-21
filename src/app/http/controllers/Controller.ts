import { ResponseBuilders } from "../../helpers/responseBuilders";

export class Controller {

    protected responseBuilder: ResponseBuilders

    constructor(){

        this.responseBuilder = new ResponseBuilders()

    }

}