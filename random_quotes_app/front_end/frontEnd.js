"use strict";

function newQuote () {
    const randomNumber = Math.floor(Math.random() * quotesJackHandey.length);
    console.log(randomNumber);
    document.getElementById("quoteDisplayField").innerHTML = quotesJackHandey[randomNumber];
}

