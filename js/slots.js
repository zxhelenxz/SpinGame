$(document).ready(function (){
    const images = ["cherry.png", "grapes.png", "heart.png", "lemon.png", "orange.png", "seven.png", "strawberry.png"];
    const myRange = 7;                // length of the image array
    let balance = 50;
    let bet = 1;
    const heading = $('#headingguide');
    // Function when click decrease button
    $('#decrease').click(function () {
        if (bet > 0)
            $('#bet').html(--bet);
    });
    // Function when click increase button
    $('#increase').click(function () {
        if (bet >= 0 && bet<balance)
            $('#bet').html(++bet);
    });
    // Function check 3 images is the same
    function spin(a, b, c) {
        console.log(a,b,c);
        if (a === b && b === c) {
            heading.text("Congratulation! You won!").css("color", "red");
            heading.fadeTo(100, 0.1).fadeTo(200, 1.0);
            balance += 15 * bet;
            $('#balance').text(balance);
        } else {
            heading.text("You lost, spin again.").css("color", "red").fadeTo(100, 0.1).fadeTo(200, 1.0);
            if (balance > 0 && balance >= bet)
                balance -= bet;
            $('#balance').text(balance);
        }
    }
    // Function to check balance enough to bet
    function checkBalance() {
        if (balance === 0) {
            heading.text("You lost all your money!").css("color", "red");
            return false;
        } else if (balance<bet) {
            heading.text("Invalid bet amount. You do not have enough money to bet" + bet + '$').css("color", "red");
            return false;
        }
        return true;
    }
    // Function to get a random number in a range min:max
    function getRandom(min, max) {
        return Math.floor((max - min + 1) * Math.random()) + min;
    }
    //Function to setInterval for each times that change an image and clearInterval after a random times.
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
        }, 100);
        return rand;
    }
    // Function execute some function to check the player can continue to play or not.
    $('#spin').click(function () {
        bet = parseInt($('#bet').html());
        let RandArray =[];
        if (checkBalance()) {
                RandArray.push(roll('#img1',24,30));
                RandArray.push(roll('#img2',36,43));
                RandArray.push(roll('#img3',51,58));
                setTimeout(function (){
                    spin(RandArray[0]%myRange,RandArray[1]%myRange,RandArray[2]%myRange);
                },RandArray[2]*100);
        }
        console.log(RandArray.toString());
    });
});