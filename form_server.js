const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');

const port = process.env.PORT || 8080;

const app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

//The form itself, refer to the hbs file name
app.get('/form', (req, res)=> {
    res.render('form.hbs', {
        title: 'Contact form',
        h1: 'Send an email',
        box1: 'city',
        box2: 'email',
        box3: 'message'
    });
});

//form handler: after click submit button, refer to the form action name
app.post('/form', (req, res)=> {
    res.render('form.hbs', {
        title: 'Contact form',
        h1: 'Send an email',
        box1: 'city',
        box2: 'email',
        box3: 'message',
        result: req.body.city
    });
});



app.listen(port, ()=> {
    console.log('Server is up on the port 8080');
});