const mongoose=require("mongoose");

const EventSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true

    },
    location:{
        type:String,
        required:true
    },
    startTime:{
        type:String,
        required:true

    },
    endTime:{
        type:String,
        required:true

    }

});
module.exports=Events=mongoose.model("Event",EventSchema)