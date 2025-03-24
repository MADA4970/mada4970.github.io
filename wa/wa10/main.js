
const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');
const storyText = "It was 94 fahrenheit outside, so :insertX: went for a walk. When they got to :insertY:, they stared in horror for a few moments, then :insertZ:. Bob saw the whole thing, but was not surprised — :insertX: weighs 300 pounds, and it was a hot day."
const insertX =["Willy the Goblin", "Big Daddy", "Father Christmas"]
const insertY =["the soup kitchen","Disneyland", "the White House"]
const insertZ = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away"]



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
    const temperature =  Math.round((94-32)*5/9) + ' centigrade' ;
newStory = newStory.replace('94 fahrenheit', temperature)
newStory = newStory.replace('300 pounds', weight)
  }

  story.textContent = newStory ;
  story.style.visibility = 'visible';
}