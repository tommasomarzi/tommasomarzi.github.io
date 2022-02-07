let x = 0.05;
let y = 0;
let z = 0;

let x_inp;
let y_inp;
let z_inp;

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

let xp_inp;
let yp_inp;

let scale_value = 3;
let transl_x = 50;
let transl_y = 50;
 
let sv_inp;
let tx_inp;
let ty_inp;

function parameters(cnv_pos)
{  
  let v_shift = cnv_pos.y+450;
  
  let h_shift = cnv_pos.x+160;
  
  var greeting = createElement('h8', 'rho: ');
  greeting.position(h_shift-160, v_shift);
  r_inp = createInput('28', 'float');
  r_inp.position(h_shift-80, v_shift);
  r_inp.size(70);
  
  greeting = createElement('h8', 'sigma: ');
  greeting.position(h_shift-160, v_shift+20);
  s_inp = createInput('10', 'float');
  s_inp.position(h_shift-80, v_shift+20);
  s_inp.size(70);
  
  greeting = createElement('h8', 'beta: ');
  greeting.position(h_shift-160, v_shift+40);
  b_inp = createInput('2.66667', 'float');
  b_inp.position(h_shift-80, v_shift+40);
  b_inp.size(70);
  
  greeting = createElement('h8', 'Initial x: ');
  greeting.position(h_shift+80, v_shift);
  x_inp = createInput('0.05', 'float');
  x_inp.position(h_shift+160, v_shift);
  x_inp.size(70);
  
  greeting = createElement('h8', 'Initial y: ');
  greeting.position(h_shift+80, v_shift+20);
  y_inp = createInput('0', 'float');
  y_inp.position(h_shift+160, v_shift+20);
  y_inp.size(70);
  
  greeting = createElement('h8', 'Initial z: ');
  greeting.position(h_shift+80, v_shift+40);
  z_inp = createInput('0', 'float');
  z_inp.position(h_shift+160, v_shift+40);
  z_inp.size(70);
  
  greeting = createElement('h8', 'X-axis variable: ');
  greeting.position(h_shift-190, v_shift+80);
  xp_inp = createInput('x');
  xp_inp.position(h_shift-80, v_shift+80);
  xp_inp.size(70);
  
  greeting = createElement('h8', 'Y-axis variable: ');
  greeting.position(h_shift-190, v_shift+100);
  yp_inp = createInput('z');
  yp_inp.position(h_shift-80, v_shift+100);
  yp_inp.size(70);
  
  greeting = createElement('h8', 'Scaling: ');
  greeting.position(h_shift+80, v_shift+80);
  sv_inp = createInput('3', 'float');
  sv_inp.position(h_shift+160, v_shift+80);
  sv_inp.size(70);
  
  greeting = createElement('h8', 'Translate x: ');
  greeting.position(h_shift+80, v_shift+100);
  tx_inp = createInput('50', 'float');
  tx_inp.position(h_shift+160, v_shift+100);
  tx_inp.size(70);
  
  greeting = createElement('h8', 'Translate y: ');
  greeting.position(h_shift+80, v_shift+120);
  ty_inp = createInput('50', 'float');
  ty_inp.position(h_shift+160, v_shift+120);
  ty_inp.size(70);


}

function get_parameters()
{
  beta = float(b_inp.value());
  sigma = float(s_inp.value());
  rho = float(r_inp.value());
  
  x = float(x_inp.value());
  y = float(y_inp.value());
  z = float(z_inp.value());
  
  x_plot = xp_inp.value();
  y_plot = yp_inp.value();
  
  scale_value = float(sv_inp.value());
  transl_x = float(tx_inp.value());
  transl_y = float(ty_inp.value());
}


function setup()
{
  cnv = createCanvas(400, 400);
  cnv.center('horizontal');
  parameters(cnv.position());
  
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
  scale(scale_value);
  background(0);
  translate(transl_x,transl_y);

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
