
const express = require("express")
const app = express()
const port = process.env.PORT || 3000

const path = require("path")

const x = path.join(__dirname, "../public")
app.use(express.static(x))

const hbs = require("hbs")
const partialpath = path.join(__dirname, "../partials")
hbs.registerPartials(partialpath)

app.set('view engine', 'hbs')
app.get('/', (req, res) => {
    res.render('index', {
        title: "Home",
        desc: "this is home page",
        img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    })
})



const forecast=require("./data1/forecast")
const geocode=require("./data1/geocode")
////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/weather",(req,res)=>{
    if(!req.query.address){
            return res.send({
                error:"you must send an address"
            })
        }
    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({error})
        }
        forecast(data.latitude,data.longitude,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastdata,
                location:req.query.address,
                latitude:data.latitude,
                longitude:data.longitude
            })
        })
    })
})
////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('*',(req,res)=>{
    res.send("404 Page Not Found")
})

app.listen(port, () => {
    console.log("app listening on port 3000 ")
})
