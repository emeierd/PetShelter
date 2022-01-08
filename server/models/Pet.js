const { model, Schema } = require("mongoose");
const { SkillsSchema } = require("./Skills");

const PetSchema = new Schema({
    name: {
        type: String,
        minlength: [3, "The name has to have at least 3 characters"],
        required: true,
        unique: [true, "Name is already registered"]
    },
    type: {
        type: String,
        minlength: [3, "Type has to have at least 3 characters"],
        required: true
    },
    description: {
        type: String,
        minlength: [3, "Type has to have at least 3 characters"],
        required: true
    },
    skills: [SkillsSchema],
    adopted: Boolean,
    likes: {
        type: Number,
        default: 0
    }
}, { timestamps: true });


const Pet = model("Pet", PetSchema)

module.exports = { Pet, PetSchema };