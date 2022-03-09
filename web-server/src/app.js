const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');


const app = express();

// define paths for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// set handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath);

// set up static directory to serve
app.use(express.static(publicDirectory));


//Handle Bars to allow us to render dynamic contents
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Prakash Subba'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Prakash Subba'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Prakash Subba',
        contact: '909-389-3891',
        email: 'ps@hotmail.com'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must enter a valid address'
        })
    }
    const address = req.query.address;
    if (!address) {
        console.log('Please enter a valid address');
    } else {
        geocode(address, (error, {
            latitude,
            longitude,
            location
        } = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error
                    })
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address,
                })

            })
        })

    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Help article not found',
        name: 'Prakash Subba'

    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page Not Found',
        name: 'Prakash Subba'
    })
})


app.listen(3000, () => {
    console.log('Connected to port 3000')
})