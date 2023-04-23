const words = ['яблоко', 'кошка', 'собака']
const questions = ['Белым цветёт, зелёным висит, красным падает', 'В мягких тапочках ступает, схватит мышь и убегает', 'Кто гуляет по двору, Забираясь в конуру. Большая Забияка Грозная..']

let word = [];
let secret = [];
let count = 0;

function start(){
    let r = Math.floor(Math.random()*3)
    $('#question').text(questions[r])
    word = words[r].split('')
    console.log(words[r])
    console.log(word)
    while (secret.length<word.length){
        secret.push('*')
    }
    console.log(secret)
    $('#word').text(secret.join(' '))
    $('.spin').hide()
    $('.shop').hide()
    $('.hidden').hide()
}

function f1(){
    let guessWord = $('input').val()
    let spin = $('.spin')
    let s = 0
    for (w in word){
        if (guessWord == word[w]){
            console.log('est')
            secret[w] = guessWord
            $('.spin').show()
        }

    }
    spin.click(
        function (){
            spin.hide()
        }
    )
    $('#word').text(secret.join(' '))
    $('input').val('')
    proverka()
}
function proverka(){
    if (secret.indexOf('*') == -1){
        console.log('win')
        $('input').prop('disabled',true)
        $('#prov').prop('disabled',true)
        $('#result').text('Вы угадали!!!')
        $('.shop').show()
    }
}

$(document).ready(start)
$('#prov').click(f1)


function promiseAfterTimeout(seconds) {
    return new Promise(function (resolve) {
        setTimeout(() => resolve(), seconds*1000);
    });
}

function rotateWheel(degr) {
    let wheel = document.querySelector('.wheel');
    wheel.style.transform = 'rotate('+degr+'deg)';
    return promiseAfterTimeout(3);
}

function randomDegrees() {
    let randomFloat = Math.random()*360;
    let descreetDegrees = Math.round(randomFloat / 60) * 60;
    return descreetDegrees;
}

function getCurrentColor(currentDegrees) {
    let colors = ["100", "200", "20", "50", "30", "150"];
    let segmentCount = parseInt(currentDegrees/60);
    let segmentShift = segmentCount % colors.length;

    return colors[segmentShift];
}

function launchSpin() {
    currentRotation += randomDegrees();

    rotateWheel(currentRotation)
        .then(() => {
            let winColor = getCurrentColor(currentRotation);
            console.log(winColor)
            score += Number(winColor)
            console.log(score)
            $('h4').text(score)
            count = score
            $('#shop-out').text(count)
        });
}
let score = 0

let banka = 50
let had = 250
let glass = 400
let sword = 200

$('#bank').click(
    function (){
        if (count>=banka) {
            count = count - banka
            $('#shop-out').text(count)
            $('#bank').hide()
            $('#banka').show()
        }
        else {
            alert('недостаточно средств')
        }
    }
)
$('#had').click(
    function (){
        if (count>=had) {
            count = count - had
            $('#shop-out').text(count)
            $('#had').hide()
            $('#hed').show()
        }
        else {
            alert('недостаточно средств')
        }
    }
)
$('#glass').click(
    function (){
        if (count>=glass) {
            count = count - glass
            $('#shop-out').text(count)
            $('#glass').hide()
            $('#glas').show()
        }
        else {
            alert('недостаточно средств')
        }
    }
)
$('#sword').click(
    function (){
        if (count>sword) {
            count = count - sword
            $('#shop-out').text(count)
            $('#sword').hide()
            $('#sw').show()
        }
        else {
            alert('недостаточно средств')
        }
    }
)


let currentRotation = 0;
let spinButton = document.querySelector('.spin');
spinButton.addEventListener('click', launchSpin);