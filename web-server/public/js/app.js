console.log('Client side JavaScript file is loaded!')

const weatherform = document.querySelector('form')
const inputData = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = inputData.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`http://localhost:3000/weather?address=${address}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            }
            messageOne.textContent = data.location;
            messageTwo.textContent = `The weather condition is ${data.forecast}. `
            inputData.value = '';
        })
    })
})