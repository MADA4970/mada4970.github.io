

let asteroids = [];
let phoneInput;
let phoneNumber='';
let maxNums=10;
let speedMultiplier = 1;
let connections=[];
//-----------------------------------------------------------------------------

class Asteroid {
  constructor() {
    this.x = random(-width , width);
    this.y = random(-height, height);
    this.z = random(width);
    this.pz = this.z;
    this.number = floor(random(10))
    this.clicked = false
  }

  update() {
    this.z -= 5*speedMultiplier;
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width/2 , width/2);
      this.y = random(-height/2, height/2);
      this.pz = this.z;
    }
   
  }

  show() {
    
    if(this.clicked) return;

    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);
// Size of the asteroid
    let r = map(this.z, 0, width, 8, 0);
   

    let px = map(this.x / this.pz, 0, 1, 0, width);
    let py = map(this.y / this.pz, 0, 1, 0, height);

    this.pz = this.z;
    
  
    push();
    translate(sx, sy);
    
    fill(120, 100, 90); 
    noStroke();
    
// asteroids
    beginShape();
    for (let i = 0; i < 8; i++) {
      let angle = map(i, 0, 8, 0, TWO_PI);
      let offset = noise(this.x + i, this.y + i) * 2 -1;
      let radius = 5 * r * (1 + offset * 0.3);
      let x = radius * cos(angle);
      let y = radius * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    
    textAlign(CENTER, CENTER);
    textSize(3*r);
    fill(255); 
    text(this.number, 0, 0);
    pop();
   
  }
  contains(px, py) {
    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);
    
    let d = dist(px, py, sx, sy);
    return d < 20;
}
}

//----------------------------------------------------------------------------------

class ConstellationGraph {
  constructor(){
    this.nodes =[];
    this.edges=[];
    this.active=false;
    this.maxEdgeDistance =100;
  }

  addStar(mouseX, mouseY){

    if(!this.active) return;

    const star = {
      x:mouseX-width/2,
      y:mouseY-height/2,
      number:floor(random(10))
    }

    this.nodes.push(star);

    this.connectNearest(star);

    return star
  }
  
    connectNearest(newStar){
      if(this.nodes.length<=1) return;
   
      
      for(const existingNode of this.nodes){
        if(existingNode===newStar) continue;
        let distance = dist(newStar.x,newStar.y, existingNode.x, existingNode.y)
        if (distance< this.maxEdgeDistance){
          const edge={
            star1: existingNode,
            star2: newStar,
            weight:distance
        }
        let edgeExists = false
        for(let existingEdge of this.edges){
          if((existingEdge.star1===edge.star1&& existingEdge.star2===edge.star2)||
          (existingEdge.star1===edge.star2&&existingEdge.star2===edge.star1)){
            edgeExists = true;
            break;
          }
          }
          if(!edgeExists){
            this.edges.push(edge)
        }
       
        }
      } 
    
  }
  
  draw(){
    if(!this.active) return;
push()
  for(const edge of this.edges){
    let opacity=map(edge.weight,0,this.maxEdgeDistance,255,50)
    let thickness = map(edge.weight,0,this.maxEdgeDistance,2,0.5)

    stroke(52, 166, 247,opacity)
    strokeWeight(thickness)
    line(edge.star1.x,edge.star1.y,edge.star2.x,edge.star2.y)
 
  }

  for(const node of this.nodes){
    stroke(52, 166, 247)
    strokeWeight(10)
    point (node.x,node.y)
  }
  pop()
  }

  clear() {
    this.edges = [];
    this.nodes = []
  }

  toggle(){
    this.active = !this.active;
    return this.active
  }
}

//---------------------------------------------------------------------------------

function setup() {
  createCanvas(windowWidth, windowHeight);
  phoneInput = document.querySelector('#phone-input')
  clearBtn = document.getElementById('clear-btn');
  clearBtn.addEventListener('click', clearPhoneNumber);

  constellationBtn=document.getElementById('constellation-btn')
  constellationBtn.addEventListener('click', toggleConstellation);
  // Generate asteroids
  for (let i = 0; i < 200; i++) {
    asteroids.push(new Asteroid());
  }
  constellationGraph = new ConstellationGraph();
}

//----------------------------------------------------------------------------------

function draw() {
  background(0);
  push()
translate(width/2, height/2)
  // Draw asteroids
  for (let asteroid of asteroids) {
    asteroid.update();
    asteroid.show();
  }
 constellationGraph.draw()
  pop();
// noLoop()

}

//----------------------------------------------------------------------------

function mousePressed(){
    console.log("mouse clicked at:",mouseX, mouseY)
    if(phoneNumber.length >=maxNums) return;
    star = constellationGraph.addStar(mouseX,mouseY)
    for(let asteroid of asteroids){
        if(asteroid.contains(mouseX-width/2,mouseY-height/2)){
            console.log("asteroid clicked! number:", asteroid.number)
            
            phoneNumber+=asteroid.number;
            asteroid.clicked = true;
            speedMultiplier+=.1;
            if(phoneInput){
            phoneInput.value = formatPhoneNumber(phoneNumber)
          

          
            }
            break;
        }
    }
}

//-------------------------------------------------------------------------------

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

//--------------------------------------------------------------------------------

function clearPhoneNumber(){
  phoneNumber= '';
  document.getElementById('phone-input').value ='';
  speedMultiplier=1;

  for(const asteroid of asteroids){
    asteroid.clicked=false;
  }

constellationGraph.clear()
}

//-------------------------------------------------------------------------------

function toggleConstellation() {
  const isActive= constellationGraph.toggle()
  const constellationBtn = document.getElementById('constellation-btn')
  if(isActive){
    constellationBtn.innerHTML='Hide Constellation'
  }else{
    constellationBtn.innerHTML='Show Constellation'
  }
}

