let mongoose = require('mongoose');

let AnswerSchema = new mongoose.Schema({
    answer: {
        type: String,
        required: [true, " Answer cannot be blank"],
        minlength: [5, "- Answer must be at least 5 characters -"]
    },
    details: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    question: { type: mongoose.Schema.Types.ObjectId, ref: "Question"}
}, { timestamps: true });


mongoose.model("Answer", AnswerSchema);