const newBtn = document.querySelector("#js-new-quote").addEventListener("click", getQuote);
const answerBtn = document.querySelector('#js-tweet').addEventListener('click', displayAnswer);

const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";
const transEndpoint = "https://libretranslate.com/translate"

let current = {
    question:'',
    answer:'',
    questionTranslation:'',
    answerTranslation:''
}
async function translateText(text,target = 'es') {
    if(!text) return '';

    try {
        const data = {
            q: text,
            source:'en',
            target: target,
            format: "text"
        }

        const response = await fetch(transEndpoint, {
            method: 'POST',
            heders : {
                'Content-Type' : 'application/json'
            }
        })
    }
}

async function getQuote(){
    try{
        const response = await fetch(endpoint);
        if (!response.ok){
            throw Error(response.statusText)
        }
        const json = await response.json();
    console.log(json)
    displayQuote(json.question);
    CLEAR();
    current.question = json.question;
    current.answer = json.answer;
    }catch(err){
        console.log(err)
        alert('Fail')
    }
    
}
function displayQuote(quote){
    const quoteText = document.querySelector('#js-quote-text')
    quoteText.textContent = quote
}
function displayAnswer(answer){
    const answerText = document.querySelector('#js-answer-text');
    answerText.textContent = current.answer
}
function CLEAR(){
    const answerText = document.querySelector('#js-answer-text');
    answerText.textContent = '';
}
getQuote();