const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const gallery = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg','pic4.jpg','pic5.jpg']

/* Declaring the alternative text for each image file */
const altText = {
    'pic1.jpg': 'A man with an uncanny valley face',
    'pic2.jpg':'AI robot with an uncanny valley face',
    'pic3.jpg': 'The blonde kid from Polar Express looking back over his seat',
    'pic4.jpg':'A strange collection of masks',
    'pic5.jpg': 'a painted woman being forced to smile'
}
/* Looping through images */
for(const image of gallery){
    const newImage = document.createElement('img');
    newImage.setAttribute('src',`images/${image}` );
    newImage.setAttribute('alt', altText[image]);
    thumbBar.appendChild(newImage);

     newImage.addEventListener('click', e =>{
        displayedImage.setAttribute('src', e.target.src);
        displayedImage.setAttribute('alt',e.target.alt);
     })
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', () => {
const btnClass = btn.getAttribute('class');
if(btnClass === 'dark'){
    btn.setAttribute("class", 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = "rgb(0 0 0 / 50%)"; 
}else{
    btn.setAttribute("class", 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = "rgb(0 0 0 / 0%)"; 
}
})