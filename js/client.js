
const socket = io();

const form = document.getElementById('send-container')
const msgInput = document.getElementById('msgInp')
const messageContainer = document.querySelector('.container')

let name = prompt('enter you name');
socket.emit('new-user-joined', name)

const append = (message, position)=>{
    const msgElement = document.createElement('div')
    msgElement.innerText = message;
    msgElement.classList.add('message');
    msgElement.classList.add(position);
    messageContainer.append(msgElement);
}

socket.on('user-joined', (name)=>{
    
    append(`${name} joined the chat `, 'right')
})

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = msgInput.value;
    append(`You: ${message}`, 'right')

    socket.emit('send', message)
    msgInput.value =''
})

socket.on('receive', (data)=>{
    
    append(`${data.name} :  ${data.message}`, 'left')
})