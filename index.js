const express = require("express");
const { connect} = require("./db/connect");
const routerUtilisateurs = require("./routers/utilisateur");
const app = express();


app.use(express.json());

app.use("/api/v1", routerUtilisateurs);


app.listen(3000,(req,res) =>{
    console.log("reussi")
})

connect("mongodb://localhost:27017/" , (err)=>{
    if (err){
        console.log("Erreur lors de la connexion a la base de donnee")
        process.exit(-1);
    }
    else{
        console.log("bien connecte")
    }
})