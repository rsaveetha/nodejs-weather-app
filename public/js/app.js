console.log('This is from the client side java script file')


const weatherForm = document.querySelector('form')
const searchParam = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''
    const location = searchParam.value
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                //console.log(data.error)
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            }
            else{
                //console.log(data.location)
                //console.log(data.forecast)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})