const { Pet } = require("../models/Pet");
const { Skills } = require("../models/Skills");

const create = async (req, res) => {
    try {
        const { name, type, description, adopted, skills } = req.body;
        const pet = await Pet({ name, type, description, adopted });
        await pet.save();
        if(skills){
        const newSkills = await Skills({skill1: skills[0],skill2:skills[1],skill3: skills[2]})
        pet.skills = newSkills;
        await pet.save();
        }
        res.status(201).json({ response: "OK", pet: pet});
    } catch (err) {
        console.error(err);
        res.status(500).json({ response: "Error", message: err})
    }
};

const get = async (req, res) => {
    try {
        const { id } = req.body;
        const pet = await Pet.findById(id);
        if(!pet) return res.status(404).json({ response: "Error", message: "Not found"});
        if(pet.adopted) return res.status(500).json({ response: "Error", message: "Pet is deleted"});
        console.log(pet)
        res.status(200).json({ repsonse: "OK", pet: pet})
    } catch (err) {
        console.error(err);
        res.status(500).json({ response: "Error", message: err})
    }
};

const getAll = async (req, res) => {
    try {
        const pets = await Pet.find({adopted:false})
        res.status(200).json({ response: "OK", pets: pets });
    } catch (err) {
        console.error(err);
        res.status(500).json({ response: "Error", message: err })
    }   
};

const edit = async (req, res) => {
    try {
        const { id, name, type, description, skills } = req.body;
        const pet = await Pet.findById(id);
        if(!pet) return res.status(404).json({ response: "Error", message: "Not found" })
        pet.name = name;
        pet.type = type;
        pet.description = description;
        if(skills){
            const newSkills = await Skills({skill1: skills[0],skill2:skills[1],skill3: skills[2]})
            pet.skills = newSkills;
        }
        await pet.save();
        res.status(200).json({ response: "OK", message: "Pet edited: " + pet });
    } catch (err) {
        console.error(err);
        res.status(500).json({ response: "Error", message: err })
    }
};

const adopt = async (req, res) => {
    try {
        const { id } = req.body;
        const pet = await Pet.findById(id);
        if(!pet) return res.status(404).json({ response: "Error", message: "Not found" })
        pet.adopted = true;
        await pet.save();
        res.status(200).json({ response: "OK", message: "Pet adopted: " + pet });
    } catch (err) {
        console.error(err);
        res.status(500).json({ response: "Error", message: err })
    }
};

const like = async (req, res) => {
    try {
        const { id } = req.body;
        const pet = await Pet.findById(id);
        if(!pet) return res.status(404).json({ response: "Error", message: "Not found" })
        pet.likes += 1
        await pet.save();
        res.status(200).json({ response: "OK", message: "Likes: " + pet.likes });
    } catch (err) {
        console.error(err);
        res.status(500).json({ response: "Error", message: err })
    }
};

module.exports = { create, edit, adopt, get, getAll, like };