const express = require('express');
const bodyParser = require('body-parser');
const fun = require('./function');
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
        title: 'Home page',
        h1: 'Welcome .....',
        link1: 'City',
        link2: 'Function 2',
        pages: ['/nasa', '/card']
    });
});

//The form itself, refer to the hbs file name
app.get('/nasa', (req, res)=> {
    res.render('form.hbs', {
        title: 'NASA images',
        h1: 'Search NASA images',
        box1: 'keyword',
        pages: ['/', '/cards']
    });
});

//form handler: after click submit button, refer to the form action name
app.post('/nasa', (req, res)=> {
    fun.getImages(req.body.keyword).then((result)=>{
        res.render('form.hbs', {
            title: 'NASA images',
            h1: 'Search NASA images',
            box1: 'keyword',
            pages: ['/', '/cards'],
            result: 'The images you search by keyword '+ req.body.keyword + ' is following:',
            img1: result[0].img,
            desp1: result[0].title,
            img2: result[1].img,
            desp2: result[1].title
        });
    }).catch((error)=>{
        res.render('form.hbs', {
            title: 'NASA images',
            h1: 'Search NASA images',
            box1: 'keyword',
            pages: ['/', '/cards'],
            result: error
        });
    })

});

app.get('/cards', (req, res)=> {
    res.render('form2.hbs', {
        title: 'Cards',
        h1: 'Cards game',
        box1: 'card_numbers',
        pages: ['/', '/nasa']
    });
});

app.post('/cards', (req, res)=> {
    res.render('form2.hbs', {
        title: 'Contact form',
        h1: 'Send an email',
        box1: 'city',
        box2: 'email',
        box3: 'message',
        pages: ['/', '/nasa'],
        result: req.body.city
    });
});

app.listen(port, ()=> {
    console.log('Server is up on the port 8080');
});
