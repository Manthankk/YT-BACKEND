class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        error = [],
        stack = ""
    ) {
        super(message);  // Call parent class (Error) constructor
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;  // Indicates failure since this is an error
        this.errors = error;  // Fix the typo

        if (stack) {
            this.stack = stack;  // Use 'stack', not 'stacks'
        } else {
            Error.captureStackTrace(this, this.constructor);  // Capture stack trace
        }
    }
}

 // Use default export for ES modules



    export {ApiError} 