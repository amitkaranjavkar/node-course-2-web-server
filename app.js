const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//app.use(express.static(__dirname + '/pages')) will cause the help.html page to render if maintenance middleware is uncommented
//to prevent this we changed the order of app.use after maintenance middleware

app.use((req, res, next) => {
    var now = new Date().toString();
    fs.appendFileSync('server.log', `${now}: ${req.method} ${req.url} \n`);
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');   
});

app.use(express.static(__dirname + '/pages'))

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('<b>Hello World</b>');
    var obj = {
        name: 'Amit Karanjavkar',
        passion: 'Software Developer'
    }
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcome: 'Amit Karanjavkar'
    });
});


app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Bad request'
    });
});


app.listen(3000, () => {
    console.log('Server listening on port 3000. Open http://localhost:3000 on your browser')
})