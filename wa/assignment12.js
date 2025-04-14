const newBtn = document.querySelector("#js-new-quote").addEventListener("click", getQuote);
const answerBtn = document.querySelector('#js-tweet').addEventListener('click', translateQuestion);

const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";
const transEndpoint = "https://libretranslate.com/translate"

let current = {
    question:'',
    answer:'',
    questionTranslation:'',
    answerTranslation:''
}
async function translateText(text, target = 'es') {
    if(!text) return '';

    try {
        const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${target}`
        );
        
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.responseData.translatedText;
    } catch (error){
        console.error('Translation failed:', error);
        return `Translation error: ${error.message}`;
    }
}
async function translateQuestion() {
    try {
        const translationText = document.querySelector('#js-quote-translation');
        translationText.textContent = 'Translating...';
       
        current.questionTranslation = await translateText(current.question);
        displayQuoteTranslation(current.questionTranslation);
        
    } catch (error) {
        console.error('Translation failed:', error);
        displayQuoteTranslation('Translation error occurred');
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
        displayQuote('Failed')
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
    const translationText = document.querySelector('#js-quote-translation')

    if (translationText) {
        translationText.textContent = '';
    }
    
}
function displayQuoteTranslation(translation) {
    const answerText = document.querySelector('#js-quote-translation');
    answerText.textContent = translation;
}
getQuote();