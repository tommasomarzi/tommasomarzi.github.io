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

let s_inp;
let r_inp;
let b_inp;

let x_plot = 'x';
let y_plot = 'z';

let x_inp;
let y_inp;

function parameters()
{  
  let v_shift = 260;
  
  var greeting = createElement('h8', 'rho: ');
  greeting.position(450, v_shift);
  r_inp = createInput('28', 'float');
  r_inp.position(530, v_shift);
  r_inp.size(70);
  
  greeting = createElement('h8', 'sigma: ');
  greeting.position(450, v_shift+20);
  s_inp = createInput('10', 'float');
  s_inp.position(530, v_shift+20);
  s_inp.size(70);
  
  greeting = createElement('h8', 'beta: ');
  greeting.position(450, v_shift+40);
  b_inp = createInput('2.66667', 'float');
  b_inp.position(530, v_shift+40);
  b_inp.size(70);
  
  greeting = createElement('h8', 'X-axis variable: ');
  greeting.position(420, v_shift+80);
  x_inp = createInput('x');
  x_inp.position(530, v_shift+80);
  x_inp.size(70);
  
  greeting = createElement('h8', 'Y-axis variable: ');
  greeting.position(420, v_shift+100);
  y_inp = createInput('z');
  y_inp.position(530, v_shift+100);
  y_inp.size(70);

}

function get_parameters()
{
  beta = b_inp.value();
  sigma = s_inp.value();
  rho = r_inp.value();
  
  x_plot = x_inp.value();
  y_plot = y_inp.value();
}


function setup()
{
  createCanvas(400, 400);
  parameters();
  
  for (let i = 0; i < n_trajectory; i++) 
  {
  trajectory[i] = createVector(x,y,z);
  }
}

function keyReleased() {
  if(key == ' ')
  {        
    get_parameters();
    background(0);
    trajectory = [];
    for (let i = 0; i < n_trajectory; i++) 
    {
    trajectory[i] = createVector(x,y,z);
    }
  }
  return false;
}

function draw()
{
  scale(3);
  background(0);
  translate(50,50);
  
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
      if (x_plot == 'x')
      {
        if (y_plot == 'y')
        {
          curveVertex(trajectory[i].x,trajectory[i].y);
        }
        else
        {  curveVertex(trajectory[i].x,trajectory[i].z);     
        }
      }
      else
      {
        curveVertex(trajectory[i].y,trajectory[i].z); 
      }
  }
  endShape();
  
  smooth();
  noFill();
  stroke(0,0,255);
  strokeWeight(2);
  beginShape();
  for (let i = (trajectory.length - n_trajectory - 1); i < trajectory.length; i++)
  {
      if (x_plot == 'x')
      {
        if (y_plot == 'y')
        {
          curveVertex(trajectory[i].x,trajectory[i].y);
        }
        else
        {  curveVertex(trajectory[i].x,trajectory[i].z);     
        }
      }
      else
      {
        curveVertex(trajectory[i].y,trajectory[i].z); 
      }
    }
  endShape();
  
  stroke(255,0,0);
  strokeWeight(4);
  
  if (x_plot == 'x')
    {
    if (y_plot == 'y')
    {
      point(x,y);
    }
    else
    {  
      point(x,z);     
    }
  }
  else
  {
    point(y,z); 
  }
  
}