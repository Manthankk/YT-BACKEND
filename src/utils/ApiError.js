class ApiError extends Error{
    Constructor(
        statusCode,
        message="Something went wrong",
        error=[],
        stacks=""
    )
    {
        super(message)
        this.statusCode=statusCode
        this.data=null
        this.message=message
        this.success=false  // we are doing for error
        this.errors=errors

        if(stacks){
            this.stack=stacks
        }else{
            Error.captureStackTrace(this,this.constructor)
        }


        }

        
    }


    export {ApiError} 