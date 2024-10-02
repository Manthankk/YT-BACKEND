class ApiResponse{
    Constructor(StatucCode,data,message ="Success"){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;     
        this.sucess=statusCode<400
    }
}