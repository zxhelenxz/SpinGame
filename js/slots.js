$(document).ready(function () {
    const images = ["cherry.png", "grapes.png", "heart.png", "lemon.png", "orange.png", "seven.png", "strawberry.png"];
    const myRange = 7 - 1;
    let balance = 50;
    let bet = 1;
    $('#decrease').click(function () {
        if (bet > 0)
            $('#bet').html(--bet);
    });
    $('#increase').click(function () {
        if (bet >= 0 && bet < balance)
            $('#bet').html(++bet);
    });

    function spin(a, b, c) {
        const heading = $('#headingguide');
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
            $('#headingguide').text('You lost all your money!').css('color', 'red');
            return false;
        } else if (balance < bet) {
            $('#headingguide').text('Invalid bet amount. You do not have enough money to bet' + bet + '$').css('color', 'red');
            return false;
        }
        return true;
    }

    function roll(n) {
        let i=0;
        $('#img1').attr('src',"img/"+images[i%n]);
        $('#img1').fadeOut('slow',function (){
            $('#img1').fadeIn('slow');
        });
        i++;
    }

    function getRandom() {
        return Math.floor(myRange * Math.random())
    }

    $('#spin').click(function () {
        bet = parseInt($('#bet').html());
        if (checkBalance()) {
                setInterval(roll(myRange),30);
            // let RandArray =[]
            // let time=30;
            // setInterval()
            // $('img').each(function (){
            //     RandArray.push(getRandom());
            //     let image = images[RandArray[RandArray.length-1]];
            //     time +=15;
            //     //const interval = setInterval(roll(this,image),time);
            //     // $(this).attr('src', "img/" + images[RandArray[RandArray.length-1]]);
            // });
            // let length = RandArray.length;
            // spin(RandArray[length-1],RandArray[length-2],RandArray[length-3]);
        }
    });
});