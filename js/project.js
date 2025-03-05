//Hello! This is my edm laser lightshow! I created three scenes for different visuals assigned to the 1,2,and 3 keys. Click the canvas to start the music and then cycle through the visuals
let bands= 256
let numstars = 150
let button;
let amp;
let volHistory = [];
let peakThreshold = 0.83
let nodes = []
let lasers= []
let laserSpeed = 0.02
let laserThickness = 5
let laserLength = 2000
let lasersPerNode = 12
let laserWheelRotation = 0
let freq1 = 30
let freq2 = 70
let threshold = 0.7
let framesPerPeak = 10
let flash = false
let flashFrames = 0
let stars = []
let MusicPlanets = []
let currentScene = 1
let nodeCount = 4

// I didn't want to write the code to switch through all of these so you have to choose the old fashioned way. I found all of these songs on another project on p5.js. I think the best 2 are the first 2 but try as many as you like!

function preload() {
//   song = loadSound('slander love is gone.mp3');
   song = loadSound('in my mind.mp3')
//   song = loadSound("070 Shake  Flight319 Official Audio.mp3");
//   song = loadSound("Grimes  Oblivion.mp3");
//   song = loadSound("Glass Eyes.mp3");
//   song = loadSound("Unrequited Love.mp3");
//   song = loadSound("Molchat doma  Kletka.mp3");
//   song = loadSound("Jakob  Velvet Light.mp3");
//   song = loadSound(
//     "Tourist  We Stayed Up All Night feat Ardyn Official Audio.mp3"
//   );
//   song = loadSound("Golden Dream.mp3");
//   song = loadSound("Dominic Fike She Wants My Money Official Audio.mp3");
//   song = loadSound("DOA  RICH BRIAN.mp3");
//   song = loadSound("Kiss Me More.mp3");
//   song = loadSound("Hanging Around the Day Pt 2.mp3");
//   song = loadSound("Capital Soirée  Take Me Anywhere.mp3");
//   song = loadSound("Palehound  Cinnamon.mp3");
//   song = loadSound("Wildflower Wildfire Official Audio.mp3");
//   song = loadSound("Fuck Around AUDIO.mp3");
//   song = loadSound("CUCO  CRV Audio.mp3");
//   song = loadSound("Pinkfong - Baby Shark.mp3");
//   song = loadSound("PARIS  Ingratax Audio.mp3");
//   song = loadSound("POPSTARS.mp3");
//   song = loadSound("LISA  MONEY Official Audio.mp3");
//   song = loadSound("ITZY 있지  LOCO.mp3");
//   song = loadSound("jessica domingo  kendrick lamar medley.mp3");
//  song = loadSound("MrKitty  After Dark.mp3");
   
}

//Pause/play music
function mouseClicked() {
 
  if(song.isPlaying()) {
    song.pause()
  } else {
    song.play()
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //switched color mode for the neon effect 
  colorMode(HSB, 360,100,100) 
  
  //Setup for using p5 analysis to incoporate sound volume and frequencies
   amp = new p5.Amplitude();
   fft = new p5.FFT(0.9,bands)
  peakDetect = new p5.PeakDetect(freq1,freq2,threshold,framesPerPeak)
  
 //Initial setup for these visuals 
  startLaserWheel()
  startMusicGalaxy()
 
}
function draw() {
  background(0);
  //Analyze audio, detect peaks from analyzed audio
  fft.analyze();
  peakDetect.update(fft)
  
  //Laser wheel 
  //Flash if peak detected
  if(peakDetect.isDetected) {
    flash = true
    flashFrames=5
  }
  
  if (flashFrames > 0) {
    flashFrames--;
  }else {
    flash = false
  }
//Allows switching between the different visuals
  switch (currentScene) {
    case 1: drawWave(); break
    case 2: drawLaserWheel(); break
    case 3: musicGalaxy(); break
  }
}

//isolated functions for easier selection
function drawWave() {
  push()
  // Get the current volume level and add it to volHistory
  let vol = amp.getLevel();
  volHistory.push(vol);

  // Make wave color random and have that neon glow
  let neon = color(random(360), 100, 100);
  stroke(neon)
    drawingContext.shadowBlur = 20
     drawingContext.shadowColor = neon
   strokeWeight(3)
noFill();

beginShape();
 
  //add sine wave effect to the waveform
  let sinSpeed = frameCount * 0.05
  // Map volume to y-coordinate
  for (let i = 0; i < volHistory.length; i++) {
    let y = map(volHistory[i], 0, 1, height/2, 0);
    let sinEffect = sin(i*0.1+sinSpeed)*60
   // Start drawing waveform
    vertex(i, y+ sinEffect);
  }
  endShape();
  
  //Draw inverted waveform
  beginShape();
  for (let i = 0; i < volHistory.length; i++) {
    let y = map(volHistory[i], 0, 1, height / 2, height);
    let sinEffect = sin(i*0.1+sinSpeed)*60
    vertex(i, y-sinEffect); 
  }
  endShape();

  // Limit volHistory length to a little less than canvas width and create scrolling effect. It looks better.
  if (volHistory.length > width-40) {
    volHistory.splice(0, 1);
  }
  pop()
}

function startLaserWheel(){
  //Creates a node and puts it in the array
  for(let i = 0; i< nodeCount; i++) {
    let node = new Node();
    nodes.push(node)
  }
  //adds lasers to each iteration of a node
  for(let node of nodes) {
    for(let j = 0; j<lasersPerNode; j++){
      lasers.push(new Laser(node, j,lasersPerNode))
    }
    }
  
}

function drawLaserWheel() {
 
  //Allows animation of each node
 for(let node of nodes) {
   node.update()
 }
  for(let laser of lasers) {
    laser.update()
    laser.display()
  }
}

function startMusicGalaxy() {
  //Creates and put in an array
   for(let i = 0; i<numstars; i++) {
    stars.push(new Star());
  }
  for(let i =0; i<3; i++){
    MusicPlanets.push(new MusicPlanet())
  }
}

function musicGalaxy() {
  //Call to show stars and planets
  for (let MusicPlanet of MusicPlanets ){
  MusicPlanet.update();
  MusicPlanet.display();
}
   //Animate stars
  
  for(let star of stars){
    star.update();
    star.display();
  } 
}
//Function to change the current scene
function keyPressed() {
  if(key === '1') {
    currentScene = 1
  }
  if(key=== '2'){
    currentScene = 2
}
  if(key === '3') {
    currentScene = 3
  }
}


//Classes
  class Node {
 //center of laser wheel
    constructor() {
      //create movement of the nodes using vectors
     this.position =  createVector(random(width),random(height))
     this.velocity =  createVector(random(-3,3), random(-3,3)) 
    //randomize the direction of rotation
    if(random() <0.5) {
     this.rotation = 0.03
    } else {
      this.rotation = -0.03
    }
    }
   update() {
     //Moves node by the random velocity that was chosen
    this.position.add(this.velocity);
    
     // Bounce off edges of canvas
    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x *= -1;
    }
    if (this.position.y < 0 || this.position.y > height) {
      this.velocity.y *= -1;
    }
  }
  }

  class Laser { 
    constructor(node, index) {
   //Center of laser wheel
    this.node = node
    //map lasers around node
    this.angle = map(index, 0, lasersPerNode, 0, TWO_PI);
    this.currentThickness = laserThickness
    this.color = color(random(360),100,100)
   
    }
    
    update() {
      this.angle += this.node.rotation
         
    }
    display() {
      push()
      //Make lasers pulse to the beat
      if(flash===false) {
      this.currentColor = this.color
      this.currentThickness = laserThickness
    }else {
      this.currentColor = color(360,0,100)
      this.currentThickness = laserThickness * 2
    }
      //make neon laser glow effect
      drawingContext.shadowBlur = 100
      drawingContext.shadowColor = this.currentColor;
      strokeWeight(this.currentThickness)
      stroke(this.currentColor)
      
      //endpoint of laser(took a little trig to accomplish)
   let x2 = this.node.position.x + cos(this.angle) * laserLength
  let y2 = this.node.position.y + sin(this.angle) * laserLength
      
      line(this.node.position.x, this.node.position.y, x2, y2)
      pop()
    }
  }

 class Star {
   constructor() {
   this.x = random(0,width/2);
   this.y = random(0,height/2);
  this.size = random(width);
     this.color = color(0,0,100)
 }
   update() {
     this.size -= 5;
     if (this.size < 1) {
     this.size = random(width);
      this.x = random(0,width/2);
       this.y = random(0,height/2);
     }
   }
   
   display() {
  //This gives the illusion of depth by dividing by a number that gets smaller as the star travels toward the screen(to the right)
     let dx = map(this.x / this.size, 0,1,0,width);
     let dy = map(this.y/this.size, 0,1,0,height);
     let r =map(this.size,0,width,8,0)
     fill(this.color)
     ellipse(dx,dy,r,r)
   }
 }

class MusicPlanet {
  constructor() {
   this.d = random(100,300)
    this.r = this.d/2
   this.x = random(width)
   this.y = random(height)
   this.speed = random(1,3)
   this.spectrum = fft.analyze()
    this.angle = 0
    this.rotation = random(360)
    this.color = color(random(360),100,100)
  }
  update() {
  this.spectrum = fft.analyze()
 //Moves the planets across the screen to the left and resets once they're off the canvas.
    this.x -= this.speed
    if (this.x < -this.d){
      this.x = width + this.d
      this.y = random(height)
      this.d= random(100,300)
      this.rotation = random(360)
    }
    
  }
  display(){
    push()
    // noFill()
    //moves the relative origin to the center of each planet
    translate(this.x,this.y)
    //Allows for a little variation in the planets since each planet would have the same bars
    rotate(this.rotation)
   
    //stores amplitude for each bar, maps the index to 545, and reduces barheight by mapping ampl. I landed on 545 because it looks the best 
for(let i=0; i<this.spectrum.length; i++) {
let ampl = this.spectrum[i]
this.angle = map(i,0,this.spectrum.length,0,545);
let barHeight = map(ampl,0,255,0,150)
    
  //Places each bar in a circle based on index number
  let xStart = this.r * cos(this.angle)
  let yStart = this.r * sin(this.angle)
  let xEnd = (this.r+barHeight)*cos(this.angle)
  let yEnd = (this.r+barHeight)*sin(this.angle)
  strokeWeight(2)
  //Hue based on location
  
  stroke(this.angle, 100,100)
  //Draw the bars!
  line(xStart, yStart, xEnd, yEnd)
  
}
    pop()
}
}