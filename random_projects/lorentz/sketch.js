var x = 0.05;
var y = 0;
var z = 0;

var dx = 0;
var dy = 0;
var dz = 0;

var rho = 28;
var sigma = 10;
var beta = 8.0/3.0;

var dt = 0.01;

var n_trajectory = 100;

var trajectory = [];

function setup()
{
  createCanvas(400, 400);
  for (let i = 0; i < n_trajectory; i++) 
  {
  trajectory[i] = createVector(x,y,z);
  }
}


function draw()
{
  
  scale(2);
  background(0);
  translate(100,75);
  
  trajectory[trajectory.length] = createVector(x,y,z);
  
  dx = (sigma * (y - x))*dt;
  dy = (x * (rho - z) - y)*dt;
  dz = (x * y - beta * z)*dt;
  
  x += dx;
  y += dy;
  z += dz;
  
  smooth();
  noFill();
  stroke(255,249,186);
  strokeWeight(1);
  beginShape();
  for (let i = 0; i < (trajectory.length - n_trajectory - 1); i++)
  {
      curveVertex(trajectory[i].x,trajectory[i].z);
  }
  endShape();
  
  smooth();
  noFill();
  stroke(0,0,255);
  strokeWeight(4);
  beginShape();
  for (let i = (trajectory.length - n_trajectory - 1); i < trajectory.length; i++)
  {
      curveVertex(trajectory[i].x,trajectory[i].z);
    }
  endShape();
  
  stroke(255,0,0);
  strokeWeight(8);
  point(x,z);
  
}

  
