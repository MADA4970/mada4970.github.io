

let stars = [];
let phoneInput;
let phoneNumber='';
let maxNums=10;


class Star {
  constructor() {
    this.x = random(-width / 2, width / 2);
    this.y = random(-height / 2, height / 2);
    this.z = random(width);
    this.pz = this.z;
    this.number = floor(random(10))
    this.clicked = false
  }

  update() {
    this.z -= 5;
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width / 2, width / 2);
      this.y = random(0, height);
      this.pz = this.z;
    }
  }

  show() {
    
    if(this.clicked) return;

    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);
// Size of the star
    let r = map(this.z, 0, width, 8, 0);
   

    let px = map(this.x / this.pz, 0, 1, 0, width);
    let py = map(this.y / this.pz, 0, 1, 0, height);

    this.pz = this.z;
    
  
     fill(255);
    noStroke();
     ellipse(sx, sy, 5*r, 5*r);
    stroke(255);
    textAlign(CENTER,CENTER)
     textSize(3*r)
    
    fill(0)
    text(this.number,sx,sy)
    // strokeWeight(10)
    // line(px, py, sx, sy); // Draw the trailing effect of the star

   
  }
  contains(px, py) {
    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);
    
    let d = dist(px, py, sx, sy);
    return d < 20;
}
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  phoneInput = document.querySelector('#phone-input')
  clearBtn = document.getElementById('clear-btn');
  clearBtn.addEventListener('click', clearPhoneNumber);
  // Generate stars
  for (let i = 0; i < 100; i++) {
    stars.push(new Star());
  }
}

function draw() {
  background(0);

  // Draw stars
  for (let star of stars) {
    star.update();
    star.show();
  }
// noLoop()

}
function mousePressed(){
    console.log("mouse clicked at:",mouseX, mouseY)
    if(phoneNumber.length >=maxNums) return;

    for(let star of stars){
        if(star.contains(mouseX,mouseY)){
            console.log("star clicked! number:", star.number)
            phoneNumber+=star.number;
            star.clicked = true;
            
            if(phoneInput){
            phoneInput.value = formatPhoneNumber(phoneNumber)
            // formatPhoneNumber(phoneInput)

          
            }
            break;
        }
    }
}

function formatPhoneNumber(phoneInput) {
    if(phoneInput.length === 0) return "";
    
    let formatted = "";
    
    if(phoneInput.length > 0) {
        formatted += "(" + phoneInput.substring(0, Math.min(3, phoneInput.length));
        
        if(phoneInput.length > 3) {
            formatted += ") " + phoneInput.substring(3, Math.min(6, phoneInput.length));
            
            if(phoneInput.length > 6) {
                formatted += "-" + phoneInput.substring(6, Math.min(10, phoneInput.length));
            }
        }
    }
    
    return formatted;
}



function clearPhoneNumber(){
  phoneNumber= '';
  document.getElementById('phone-input').value ='';
}


