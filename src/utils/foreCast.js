const request = require('request')
const foreCast = (latitude,longitude,callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=e0ef5a0f2a9c9f60f32df9b9b9bf9b2f&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=f'
    request({url:url,json:true},(error,{body})=>
    {                                   //response.body   beacause we are only using body of the response object
        if(error){
            callback('Unable to connect!',undefined)//low level error handling like network connection
        }
        else if(body.error){
            callback('Inappropriate location coordinate!',undefined)
        }else{
            //const data = response.body.current
            const data = body.current
            callback(undefined,
            //{ temperature : data.temperature,
            // feelslike : data.feelslike,
            // weather_descriptions : data.weather_descriptions[0]}
            data.weather_descriptions[0]+' throughout the day.It is currently '+data.temperature+
            ' degrees out there.It feels like '+data.feelslike
            )
        }
    })
}
module.exports = foreCast