let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name Cannot be Blank"],
        minlength: [2, "- Name must be at least 2 characters -"]
    },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer"}]

}, { timestamps: true });


mongoose.model("User", UserSchema);