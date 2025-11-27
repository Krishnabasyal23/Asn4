
const express= require ("express");
const app= express();
const path= require ("path");
const multer=requrie("multer");
const fs= require("fs");
app.use(express.static("public"));
// Multer setup: store files temporarily before renaming
const upload= multer ({dest:"uploads/"});
 // get image name
app.get("/api/getImage", (req,res) =>{
    const name= req.query.name;
    // if no name is provided
    if(!name){
        return res.status(400).json({error: "Missing? name= queryr parameter"});
    }
    const filePath= path.join(__dirname, "public", '${name}.jpg');
    // send the image if it exists
    res.sendFile(filePath, (err)=>{
        if(err){
            res.status(404).json({error:"Image not Found"});
        }
    });
});

// start server
app.listen(3000, ()=>{
    console.log("server running on http://localhost:3000");
});
