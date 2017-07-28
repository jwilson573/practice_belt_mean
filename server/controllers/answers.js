let mongoose = require('mongoose');

let Answer = mongoose.model('Answer');
let User = mongoose.model('User');
let Question = mongoose.model('Question')


class AnswersController {


    create(req, res){
        console.log("Inside Answer Controller / Create")
        Answer.create(req.body, (err, answer) => {
            if(err){ return res.json(err)};
            Question.findByIdAndUpdate(req.body.question, 
                { $push: {answers: answer._id} }, 
                { new: true }, 
                (err, question) => {
                    if(err){ return res.json(err)};
                    User.findByIdAndUpdate(req.body.user, { $push: { answers: answer._id }}, { new: true }, (err, user) => {
                        if(err){ return res.json(err)};
                        console.log(answer);
                        return res.json(answer);
                    } )
                }
            )
        })
    }

    increaseLikes(req, res){
        Answer.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 }}, { new: true }, (err, answer) => {
            if(err){ return res.json(err) };
            return res.json(answer);
        })
    }




}

module.exports = new AnswersController