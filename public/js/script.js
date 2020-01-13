console.log('Coming from from javascript file')

// fetch('http://localhost:3000/weather?address=!').then((response)=>{ //it take only only argument that is response
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)

//         }else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })

// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ' '
    console.log('testing')

    fetch('http://localhost:3000/weather?address=' +location).then((response)=>{ //it take only only argument that is response
    response.json().then((data)=>{
        if(data.error){
            //console.log(data.error)
            messageOne.textContent = data.error
        }else{
             messageOne.textContent = data.location
             messageTwo.textContent = data.forecast

            //console.log(data.location)
            //console.log(data.forecast)
        }
    })

})

})