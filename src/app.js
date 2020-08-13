const path = require('path')
const express = require('express')
const hbs = require('hbs')
//const request = require('request')
const geoCode = require('./utils/geoCode')
const foreCast = require('./utils/foreCast')

const app = express()
//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
//console.log(publicDirectoryPath)
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//set up handlebar engine nad views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)
//app.set(publicDirectoryPath+'/views','hbs')

//set up static directory for serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'weather app',
        name:'Barnali sen'
    })
})

app.get('/about',(req,res)=>{
        res.render('about',{
            title:'about page',
            name:'Barnali sen',
            msg:'Its about the weather app!'
        })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide an address!'
        })
    }
    geoCode(req.query.address,(error,{latitude,longitude,place_name}={})=>{
        if(error){
            return res.send({error
            })
        }
        foreCast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast : forecastData,
                location : place_name,
                address : req.query.address
            })
        })
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'Please provide a search!'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help page',
        name:'Barnali sen',
        msg:'How can we help you!'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'help article page',
        name:'Barnali sen',
        errorMsg:'help article not found!'
    })
})
app.get('/*',(req,res)=>{
    res.render('404',{
        title:'404 error',
        name:'Barnali sen',
        errorMsg:'404 error!'
    })
})

app.listen(3000, () => {
    console.log('Server is up port 3000.')
})
// app.get('',(req,res)=>{              //app.com
//     res.send('hello express!')
// })

// app.get('/help',(req,res)=>{        
//     res.send('Its a help page!')
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>')
// })
