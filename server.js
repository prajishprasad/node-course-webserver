const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})
app.set('view engine', 'hbs');
// app.use(express.static(__dirname + '/public')); -- If this was placed here and maintainence code was not commented, then help will still be seen
app.use((req,res,next)=>{
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url} `;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err) => {
        if(err){
            console.log(err);
        }
    });
    next();

});
app.use((req,res,next)=>{
    res.render('maintainence'); // This is to prevent other routes from being executed
});
// app.get('/',(req,res) => {
//     // res.send('<h1>Hello Express!</h1>');
//     res.send({
//        name:'Prajish',
//        age:'31' 
//     });
// });

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res) => {
    res.render('home.hbs',{
        welcomeTitle:'Welcome!!',
        welcomeMessage:'Welcome to the website',
        pageTitle: 'Home Page',
        // currentYear: new Date().getFullYear() - This is not required as we used the helper
    });
});
app.get('/about', (req,res) => {
    // res.send('About Page');
    //res.render('about.hbs'); -- without arguments
    res.render('about.hbs',{
        pageTitle: 'About Page',
        // currentYear: new Date().getFullYear() - This is not required as we used the helper

    });
});
app.get('/bad', (req,res) =>{
    res.send({
        code:'1',
        string:'Unable to handle request'
    });
});
app.listen(3000,()=>{
    console.log('Server is up on port 3000');
});
