let mongoose = require('mongoose');

let QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        minlength: [10, "Question must be at least 10 characters"],
        required: [true, "Question cannot be blank"],
    },
    description: {
        type: String
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }]
}, { timestamps: true });

mongoose.model("Question", QuestionSchema);