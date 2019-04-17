const express = require('express');
const bodyParser = require('body-parser');
const fun = require('./function')
const fun2 = require('./function_async');
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
        pages: ['/form', '/form2']
    });
});

//The form itself, refer to the hbs file name
app.get('/form', (req, res)=> {
    res.render('form.hbs', {
        title: 'Contact form',
        h1: 'Send an email',
        box1: 'city',
        box2: 'email',
        box3: 'message',
        pages: ['/', '/form2']
    });
});

//form handler: after click submit button, refer to the form action name
app.post('/form', (req, res)=> {
    fun.getAddress(req.body.city).then((result)=>{
        res.render('form.hbs', {
            title: 'Contact form',
            h1: 'Send an email',
            box1: 'city',
            box2: 'email',
            box3: 'message',
            pages: ['/', '/form2'],
            result: 'The country code for '+ req.body.city + ' is ' + result.country_code
        });
    }).catch((error)=>{
        res.render('form.hbs', {
            title: 'Contact form',
            h1: 'Send an email',
            box1: 'city',
            box2: 'email',
            box3: 'message',
            pages: ['/', '/form2'],
            result: error
        });
    })

});

app.get('/form2', (req, res)=> {
    res.render('form2.hbs', {
        title: 'Contact form',
        h1: 'Send an email',
        box1: 'city',
        box2: 'email',
        box3: 'message',
        pages: ['/', '/form1']
    });
});

app.post('/form2', (req, res)=> {
    res.render('form2.hbs', {
        title: 'Contact form',
        h1: 'Send an email',
        box1: 'city',
        box2: 'email',
        box3: 'message',
        pages: ['/', '/form1'],
        result: req.body.city
    });
});

app.listen(port, ()=> {
    console.log('Server is up on the port 8080');
});
