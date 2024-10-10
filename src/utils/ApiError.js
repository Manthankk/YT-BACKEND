class ApiError extends Error{
    Constructor(
        statusCode,
        message="Something went wrong",
        error=[],
        stack=""
    )
    {
        super(message)
        this.statusCode=statusCode
        this.data=null
        this.message=message
        this.success=false  // we are doing for error
        this.errors=errors

        if(stack){
            this.stack=stacks
        }else{
            Error.captureStackTrace(this,this.constructor)
        }


        }

        
    }


    export {ApiError} 