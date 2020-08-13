//console.log("hello js!")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    let location = search.value
      
    //console.log(location)
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            
            loader.remove()
            messageOne.textContent = data.error
            messageTwo.textContent =' '
        }else{
            // console.log(data.location)
            // console.log(data.forecast)
            loader.remove()
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})
