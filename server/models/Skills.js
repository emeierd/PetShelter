const { model, Schema } = require("mongoose");

const SkillsSchema = new Schema({
    skill1: String,
    skill2: String,
    skill3: String
}, { timestamps: true });


const Skills = model("Skills", SkillsSchema)

module.exports = { Skills, SkillsSchema };