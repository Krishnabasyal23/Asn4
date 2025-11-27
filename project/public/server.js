const express= require ("express");
const app= express();
const path= require ("path");

app.use(express.static("public"));
 // get image name
app.get("/api/getImage", (req,res) =>{
    const name= req.query.name;
    // if no name is provided
    if(!name){
        return res.status(400).json({error: "Missing? name= queryr parameter"});
    }
    const filePath= path.join(__dirname, "public". ${name}.jpg)
})