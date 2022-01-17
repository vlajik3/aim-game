const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('.board')
const refresh = document.querySelector('.refresh')
const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71', '#fff', '#000']
let time = 0
let score = 0

startBtn.addEventListener('click', event => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if(event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if(event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

let interval;
function startGame() {
    interval = setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if(time === 0) {
        finishGame()
    } else {
        let current = --time
    if(current < 10) {
        current = `0${current}`
    }
    setTime(current)
    }

}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<div><h1>Счёт:<span class='primary'></span> ${score} </h1></div>
    <div  style='color:#16D9E3;'><a class='refresh'>Заново</a></div>`
    clearInterval(interval)
}

// if(refresh) {
//     refresh.addEventListener('click', (event) => {
//         startGame()
//     })
// }


function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(20, 80)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    setColor(circle)


    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function setColor(element) {
    const color = getRandomColor()
    element.style.background = color
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}