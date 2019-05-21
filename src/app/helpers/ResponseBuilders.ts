
export class ResponseBuilders {

    /**
     * 
     * Response Success Builders
     * 
     * @param res 
     * @param message 
     * @param code 
     * @param data 
     */

    public successMessage(res:any , message: string , code: number , data: any) : any{

        res.status(code);
        res.json({
            status: true,
            message: message,
            data: data
        });

    }

    /**
     * 
     * Response Errors Builder
     * 
     * @param res 
     * @param message 
     * @param code 
     * @param errors 
     */

    public errorsMessage(res:any , message: string , code: number , errors: any) : any{

        res.status(code);
        res.json({
            status: false,
            message: message,
            errors : errors
        });

    }

}