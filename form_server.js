const express = require('express');
const bodyParser = require('body-parser');
const fun = require('./function2');
const hbs = require('hbs');

const port = process.env.PORT || 8080;

const app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

app.get('/', (req, res)=>{
    res.render('index.hbs', {
        pages: ['/nasa', '/card']
    });
});

//The form itself, refer to the hbs file name
app.get('/nasa', (req, res)=> {
    res.render('form.hbs', {
        box1: 'keyword',
        pages: ['/', '/cards']
    });
});

//form handler: after click submit button, refer to the form action name
app.post('/nasa', (req, res)=> {
    fun.getImages(req.body.keyword).then((result)=>{
        res.render('form.hbs', {
            box1: 'keyword',
            pages: ['/', '/cards'],
            result: 'The images you search by keyword '+ req.body.keyword + ' is following:',
            output: result
        });
    }).catch((error)=>{
        res.render('form.hbs', {
            box1: 'keyword',
            pages: ['/', '/cards'],
            result: error
        });
    })

});

app.get('/cards', (req, res)=> {
    res.render('form2.hbs', {
        box1: 'card_num',
        pages: ['/', '/nasa']
    });
});

app.post('/cards', (req, res)=> {
    fun.getDeck_id().then((result)=>{
        return fun.getCards(result, req.body.card_num)
    }).then((result)=>{
        res.render('form2.hbs', {
            box1: 'card_num',
            pages: ['/', '/nasa'],
            result: 'The cards are following:',
            output: result
        });
    }).catch((error)=>{
        res.render('form2.hbs', {
            box1: 'card_num',
            pages: ['/', '/nasa'],
            result: error
        });
    });

});

app.listen(port, ()=> {
    console.log('Server is up on the port 8080');
});
