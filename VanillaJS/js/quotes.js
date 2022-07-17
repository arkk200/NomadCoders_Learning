const quotes = [
    {
        quote: "Ever tried. Ever failed. No matter. Try Again. Fail again. Fail better.",
        author: "Samuel Beckett"
    },
    {
        quote: "Optimism is the faith that leads to achievement. Nothing can be done without hope and confidence.",
        author: "Helen Keller"
    },
    {
        quote: "Start where you are. Use what you have. Do what you can.",
        author: "Arthur Ashe"
    },
    {
        quote: "It does not matter how slowly you go as long as you do not stop.",
        author: "Confucius"
    },
    {
        quote: "Good, better, best. Never let it rest. 'Til your good is better and your better is best.",
        author: "St. Jerome"
    },
    {
        quote: "It always seems impossible until it's done.",
        author: "Nelson Mandela"
    },
    {
        quote: "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.",
        author: "Thomas A. Edison"
    },
    {
        quote: "If you're going through hell, keep going.",
        author: "Winston Churchill"
    },
    {
        quote: "Life is 10% what happens to you and 90% how you react to it.",
        author: "Charles R. Swindoll"
    },
    {
        quote: "When something is important enough, you do it even if the odds are not in your favor.",
        author: "Elon Musk"
    },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;