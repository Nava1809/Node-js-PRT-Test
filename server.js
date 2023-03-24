const express=require("express");
const Dbconnection=require("./connection/conn");
const Events=require("./models/EventModel");
const dotenv=require("dotenv")
const bodyParser=require("body-parser");
dotenv.config();
Dbconnection();
const app=express();
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.post("/events",async(req,res)=>{
    try{
        const user=await Events.create(req.body)
        res.status(201).json({
            status:"success",
            user
        })
    }catch{
         res.status(400).json({
            status:"Failed",
         })
    }
})

app.get("/events",async(req,res)=>{
    try{
        const {id=0}=req.query;
        let users;
        if(id===0){
            users=await Events.find()

        }else{
            users=await Events.find({id:id})
        }
        res.status(200).json({
            status: "Success",
            users
        })
    }catch(e){
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})

app.get("/events/:id",async(req,res)=>{
    try{
    const user=await Events.find({_id : req.params.id})
    res.status(200).json({
        status:"success",
        user
    })
}catch(e){
    res.status(404).json({
        error:"There is no event with that id"
    })
}
})

app.put("/events/:id", async (req, res) => {
    try{
        await Events.updateOne({_id : req.params.id}, req.body);
        const user =  await Events.findOne({_id : req.params.id});
        res.status(200).json({
            status: "Success",
            user
        })
    }catch(e){
        res.status(400).json({
            error:"validation error:title is required"
        })
    }
});

app.delete("/events/:id", async (req, res) => {
    try{
        const user = await Events.deleteOne({_id : req.params.id});
        res.status(200).json({
            status: "Success",
            user
        })
    }catch(e){
        res.status(204).json({
            
        })
    }
});

app.listen(3000,()=>{console.log("server at port 3000")})