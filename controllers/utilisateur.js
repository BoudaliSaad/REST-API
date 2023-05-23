const { ObjectId } = require("bson");
const client = require("../db/connect")
const {Utilisateur} = require ("../models/utilisateur");

const ajouterUtilisateur = async (req, res) =>{
    try{
        let utilisateur = new Utilisateur(
            req.body.nom,
            req.body.adresse,
            req.body.telephone
        );
        let result = await client.db().collection("utilisateur").insertOne(utilisateur);
        res.status(200).json(result);   
    }catch (error){
        console.log(error);
        res.status(501).json(error);
    }
};
const getUtilisateurs = async (req, res )=>{
    try{
        let cursor = client.db().collection("utilisateur").find().sort({ nom: 1});
        let result = await cursor.toArray();
        if (result.length > 0){
            res.status(200).json(result);
        } else {
            res.status(204).json({ msg: "Aucun utilisateur trouve"});
        }
    } catch (error){
        console.log(error);
        res.status(501).json(error);
    }
};
const getUtilisateur = async (req, res )=>{
    try{
        let id = new ObjectId(req.param.id);
        console.log(id)
        let cursor=client.db().collection("utilisateurs").find({_id:id})
        let result = await cursor.toArray();
        if (result.length > 0){
            res.status(200).json(result[0]);
        } else {
            res.status(204).json({ msg: "Aucun utilisateur trouve"});
        }
    } catch (error){
        console.log(error);
        res.status(501).json(error);
    }
};
const updateUtilisateur = async (req, res )=>{
    try{
        let id = new ObjectId(req.param.id);
        let nom=req.body.nom;
        let adresse=req.body.adresse;
        let telephone=req.body.telephone;
        let result = await client.db().collection("utilisateurs").updateOne({_id:id},{$set:{nom,adresse,telephone}});

        if (result.modiedCount===1){
            res.status(200).json({msg:"modified"});
        } else {
            res.status(204).json({ msg: "Aucun utilisateur trouve"});
        }
    } catch (error){
        console.log(error);
        res.status(501).json(error);
    }
};
const deleteUtilisateur = async (req, res )=>{
    try{
        let id = new ObjectId(req.param.id);
        let result = await client.db().collection("utilisateur").deleteOne({_id:id});

        if (result.deleteCount===1){
            res.status(200).json({msg: "supperssion reussie"});
        } else {
            res.status(404).json({ msg: "Aucun utilisateur trouve"});
        }
    } catch (error){
        console.log(error);
        res.status(501).json(error);
    }
};
module.exports = {
    ajouterUtilisateur,
    getUtilisateur,
    getUtilisateurs,
    updateUtilisateur,
    deleteUtilisateur,
};