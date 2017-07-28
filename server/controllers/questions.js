let mongoose = require('mongoose');

let Question = mongoose.model('Question');
let User = mongoose.model('User');

class QuestionsController {

    create(req, res){
        console.log(req.body);
        Question.create(req.body, (err, question) => {
            if(err) { return res.json(err) }
            User.findByIdAndUpdate(req.body.user, {$push: { questions: question._id }}, { new: true }, (err, user) => {
                if(err){
                    return res.json(err)
                }
                return res.json(question);
            })
        })

    }

    index(req, res){
        Question.find({})
        .populate('user answers')
        .exec((err, questions) => {
            if(err){
                return res.json(err);
            }
            return res.json(questions);
        })
    
    }

    show(req, res){
        Question.findById(req.params.id)
        
        .populate({
            path: 'user',
            model: 'User',
            populate: {
                path: 'answers',
                model: 'Answer'
            }
        })
        .populate({
            path: 'answers',
            model: 'Answer',
            populate: {
                path: 'user',
                model: 'User'
            }
        })
        .exec((err, question) => {
            if(err){return res.json(err)}
            return res.json(question)
        })
    }

}

module.exports = new QuestionsController()