const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const gallery = [pic1.jpg, pic2.jpg, pic3.jpg,pic4.jpg,pic5.jpg]

/* Declaring the alternative text for each image file */
const altText = {
    'pic1.jpg': 'A man with an uncanny valley face',
    'pic2.jpg':'A person trying out uncanny valley makeup',
    'pic3.jpg': 'The blonde kid from Polar Express looking back over his seat',
    'pic4.jpg':'A strange collection of masks',
    'pic5.jpg': 'a painted woman being forced to smile'
}
/* Looping through images */

const newImage = document.createElement('img');
newImage.setAttribute('src', xxx);
newImage.setAttribute('alt', xxx);
thumbBar.appendChild(newImage);

/* Wiring up the Darken/Lighten button */
