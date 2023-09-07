const mongoose = require("mongoose")
const connectdb = async () => {
    try {
        const connect = await mongoose.connect("mongodb+srv://Habeeb:Ademola1234@habeeb.pal57xa.mongodb.net/Coniah?retryWrites=true&w=majority")
        if(connect){
            console.log("congrats, your database is well connected")
        
        } else{
            console.log("opps!! error occurred")
        }
     
         
        
    } catch (error) {
        console.log(error)
        
    }
}

module.exports= connectdb;