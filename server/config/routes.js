let path = require('path');
let Users = require('./../controllers/users');
let Questions = require('./../controllers/questions');
let Answers = require('./../controllers/answers');

module.exports = function(app){

    //Users
    app.post('/users', Users.create);

    //Questions
    console.log(Questions);
    app.get('/questions', Questions.index);
    app.post('/new_question', Questions.create);
    app.get('/question/:id', Questions.show);

    //Answers
    app.post('/question/new-answer', Answers.create);
    app.put('/answers/:id', Answers.increaseLikes)



    app.all('*', (req, res, next) => {
        res.sendFile(path.resolve('./public/dist/index.html'));
    })





}