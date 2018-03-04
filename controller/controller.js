var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect with database
mongoose.connect('mongodb://test:test@ds153978.mlab.com:53978/my-todo');

// create schema -- like a blueprint
var todoSchema = new mongoose.Schema({
  item : String
});

var Todo = mongoose.model('Todo',todoSchema);

// var itemOne = Todo({
//    item : 'get flowers'
// }).save((err)=>{
//     if(err) throw err;
//     console.log("data updated");
// });

var urlencodedParser = bodyParser.urlencoded({ extended: false });
//var data = [{item : 'get milk'},{item : 'take dog for a walk'},{item : 'kic some coding ass'}];


module.exports = function(app){


    app.get('/todo',(req,res)=>{
        Todo.find({},(err,data)=>{
            if(err) throw err;
            res.render('todo',{todos : data});
        });
    });

    app.post('/todo',urlencodedParser,(req,res)=>{
       var newTodo = Todo(req.body).save((err,data)=>{
            if(err) throw err;
            res.json(data);
       });
       // res.json(data);
    });
    
    app.delete('/todo/:item',(req,res)=>{
        Todo.find({item : req.params.item.replace(/\-/g," ")}).remove((err,data)=>{
            if(err) throw err;
            res.json(data);
        });

        // data = data.filter((todo)=>{
        //     return todo.item.replace(/ /g,"-") !== req.params.item ;
        // });
        // res.json(data);
    });
};

