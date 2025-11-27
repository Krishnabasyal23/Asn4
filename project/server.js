const express = require("express");
const app= express();
const path= require ("path");
const multer=require("multer");
const fs= require("fs");
app.use(express.static("public"));
// Multer setup: store files temporarily before renaming
const upload= multer ({dest:"uploads/"});
 // get image name
app.get("/api/getImage", (req,res) =>{
    const name= req.query.name;
    // if no name is provided
    if(!name){
        return res.status(400).json({error: "Missing? name= query parameter"});
    }
    const filePath= path.join(__dirname, "public", `${name}.png`);
    // send the image if it exists
    res.sendFile(filePath, (err)=>{
        if(err){
            res.status(404).json({error:"Image not Found"});
        }
    });
});
app.post("/api/upload", upload.single("image"), (req,res)=>{
    const name= req.query.name;

    if (!name){
        return res.status(400).json({error:"Missing ? name= query parameter"});
    }
    if(!req.file){
        return res.status(400).json({error: "No image file uploaded"});
    }
    // new file path iside public folder
    const newPath= path.join(__dirname, "public", `${name}.png`);

    // moving files form upload to public folder
    fs.rename(req.file.path, newPath, (err)=>{
        if (err){
            return res.status(500).json({error: "Failed to save image"});
        }
        res.json({
            message: `image for '${name}' uploaded successfully',
            savedAs: '${name}.png`
        });
    });

});
// start server
app.listen(3000, ()=>{
    console.log("server running on http://localhost:3000");
});
