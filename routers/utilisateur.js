const express=require("express");

const{
    ajouterUtilisateur,
    getUtilisateur,
    getUtilisateurs,
    updateUtilisateur,
    deleteUtilisateur,
}=require("../controllers/utilisateur");

const router=express.Router();


router.route("/utilisateur").post(ajouterUtilisateur);
router.route("/utilisateur").get(getUtilisateurs);
router.route("/utilisateur/:id").get(getUtilisateur);
router.route("/utilisateur").put(updateUtilisateur);
router.route("/utilisateur").delete(deleteUtilisateur);

module.exports=router;

