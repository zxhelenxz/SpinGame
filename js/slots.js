$(document).ready(function () {
    const images = ["img/cherry.png", "img/grapes.png", "img/heart.png", "img/lemon.png", "img/orange.png", "img/seven.png", "img/strawberry.png"];
    const myRange = 7 - 1;
    let balance = 50;
    let bet = 1;
    $('#decrease').click(function () {
        if (bet > 0)
            bet -= 1;
        $('#bet').html(bet);
    });
    $('#increase').click(function () {
        if (bet >= 0 && bet < balance)
            bet += 1;
        $('#bet').html(bet);
    });
    function spin(a, b, c) {
        const heading = $('#headingguide');
        if (a === b && b === c) {
            heading.html('Congratulation! You won!').css('color', 'red');
            heading.fadeTo(100, 0.1).fadeTo(200, 1.0);
            balance += 15 * bet;
            $('#balance').html(balance);
        } else {
            heading.html('You lost, spin again.').css('color', 'red').fadeTo(100, 0.1).fadeTo(200, 1.0);
            if (balance > 0 && balance >= bet)
                balance -= bet;
            $('#balance').html(balance);
        }
    }

    function checkBalance() {
        if (balance === 0) {
            $('#headingguide').html('You lost all your money!').css('color', 'red');
            return false;
        } else if (balance < bet) {
            $('#headingguide').html('Invalid bet amount. You do not have enough money to bet' + bet + '$').css('color', 'red');
            return false;
        }
        return true;
    }
    $('#spin').click(function () {
        bet = parseInt($('#bet').html());
        if (checkBalance()){
            let randnumber1 = Math.floor(myRange * Math.random());
            let randnumber2 = Math.floor(myRange * Math.random());
            let randnumber3 = Math.floor(myRange * Math.random());
            $('#img1').attr('src', images[randnumber1]);
            $('#img2').attr('src', images[randnumber2]);
            $('#img3').attr('src', images[randnumber3]);
            spin(randnumber1, randnumber2, randnumber3);
        }

    });
});