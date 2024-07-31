//app.js = server side
//index.js= client side
let form=document.getElementById("form1")
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    // console.log(document.getElementById("address").value)
    weatherFunc()
    form.reset()
})
const errorf=document.getElementById("error")
const locationf=document.getElementById("location")
const forecastf=document.getElementById("forecast")
const latitudef=document.getElementById("latitude")
const longitudef=document.getElementById("longitude")

let weatherFunc=async()=>{
    try{
        const address=document.getElementById("address").value
        const res=await fetch("http://localhost:3000/weather?address="+address)
        const data=await res.json()
        console.log(data)
        if(data.error){
            errorf.innerText=data.error
            locationf.innerText=""
            forecastf.innerText=""
            latitudef.innerText=""
            longitudef.innerText=""

        }else{
            locationf.innerText=data.location
            forecastf.innerText=data.forecast
            latitudef.innerText="Latitude: "+data.latitude
            longitudef.innerText="Longitude: "+data.longitude
            errorf.innerText=""
        }
    }catch(e){
        console.log(e)
    }
}