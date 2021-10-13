$(document).ready(function () {
    const images = ["cherry.png", "grapes.png", "heart.png", "lemon.png", "orange.png", "seven.png", "strawberry.png"];
    const myRange = 7;
    let balance = 50;
    let bet = 1;
    const heading = $('#headingguide');
    $('#decrease').click(function () {
        if (bet > 0)
            $('#bet').html(--bet);
    });
    $('#increase').click(function () {
        if (bet >= 0 && bet < balance)
            $('#bet').html(++bet);
    });

    function spin(a, b, c) {
        console.log(a,b,c);
        if (a === b && b === c) {
            heading.text('Congratulation! You won!').css('color', 'red');
            heading.fadeTo(100, 0.1).fadeTo(200, 1.0);
            balance += 15 * bet;
            $('#balance').text(balance);
        } else {
            heading.text('You lost, spin again.').css('color', 'red').fadeTo(100, 0.1).fadeTo(200, 1.0);
            if (balance > 0 && balance >= bet)
                balance -= bet;
            $('#balance').text(balance);
        }
    }

    function checkBalance() {
        if (balance === 0) {
            heading.text('You lost all your money!').css('color', 'red');
            return false;
        } else if (balance < bet) {
            heading.text('Invalid bet amount. You do not have enough money to bet' + bet + '$').css('color', 'red');
            return false;
        }
        return true;
    }
    function getRandom(min, max) {
        return Math.floor((max - min + 1) * Math.random()) + min;
    }
    function roll(selector,min,max) {
        let i = getRandom(0,6);
        let rand = getRandom(min, max);
        console.log(rand);
        const handle = setInterval(() => {
            i++;
            if (i === rand){
                clearInterval(handle);
            }
            $(selector).attr('src', "img/" + images[i% myRange]);
            heading.text('Spinning...').css('color', 'red');
        }, 10);
        return rand;
    }

    $('#spin').click(function () {
        bet = parseInt($('#bet').html());
        let RandArray =[];
        if (checkBalance()) {
                RandArray.push(roll('#img1',24,30));
                RandArray.push(roll('#img2',36,43));
                RandArray.push(roll('#img3',51,58));
                setTimeout(function (){
                    spin(RandArray[0]%myRange,RandArray[1]%myRange,RandArray[2]%myRange);
                },RandArray[2]*10);

        }
        console.log(RandArray.toString());
    });
});