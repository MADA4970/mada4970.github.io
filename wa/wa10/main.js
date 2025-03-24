
const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');
const storyText = "During the space mission where temperatures reached 200 fahrenheit, :insertX: had to make an emergency maneuver. When encountering :insertY:, the pilot had only seconds to react, and immediately started :insertZ:. Captain Bob monitored the situation from mission control, and thought 'Why would I stop them?' :insertX: had successfully completed training at 300 pounds of pressure, and was having a good time."
const insertX =["Mr. Fahrenheit", "Lady Godiva", "a supersonic woman"]
const insertY =["a shooting star", "a racing car", "a rocket ship"]
const insertZ = ["travelling at the speed of light", "burning through the sky", "defying the laws of gravity"]



function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

randomize.addEventListener('click', result);

function result() {
const xItem = randomValueFromArray(insertX)
const yItem = randomValueFromArray(insertY)
const zItem = randomValueFromArray(insertZ)

    let newStory = storyText;
    newStory = newStory.replace(/:insertX:/g, xItem);
    newStory = newStory.replace(':insertY:', yItem)
    newStory = newStory.replace(':insertZ:', zItem)

  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace('Bob', name)
  }

  if(document.getElementById("uk").checked) {
    const weight = Math.round(300/14) + ' stone';
    const temperature =  Math.round((200-32)*5/9) + ' centigrade' ;
newStory = newStory.replace('200 fahrenheit', temperature)
newStory = newStory.replace('300 pounds', weight)
  }

  story.textContent = newStory ;
  story.style.visibility = 'visible';
}