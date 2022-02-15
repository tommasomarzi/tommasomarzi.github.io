
let rules = [];
let grid = [];
let rules_cnt = 0;

let trajectory = [];

let cnv_pos;
let inp;
let read_box;

let start_sim = false;
let first_it = true;

let stop = false;

let x_zero = 2;
let y_zero = 3;

let x_pos = x_zero;
let y_pos = y_zero;

let x_next;
let y_next;

let x_cnv = 400;
let y_cnv = 400;
let x_points = 30;
let y_points = 30;
let x_scale;
let y_scale;
let x_shift;

function move(next_rule, x_curr, y_curr)
{  
  let tmp_shift;
  if(y_curr % 2 == 0)
  {
    tmp_shift = true;
  }
  else
  {
    tmp_shift = false;
  }
  
  switch(next_rule)
  {
    case 0:
      if(x_curr == (x_points-1))
      {
         stop = true;
      }
      else
      {
        if(grid[x_curr +1][y_curr] == 0)
        {
          x_next = x_curr + 1;
          y_next = y_curr;
          
          grid[x_curr +1][y_curr] = 1;
        }
        else
        {
          stop = true;
        }
      }
      break;
      
    case 1:
      if((x_curr == (x_points -1)) || (y_curr == (y_points -1)))
      {
         stop = true;
      }
      else
      {
        if(grid[x_curr +1][y_curr + 1] == 0)
        {
          x_next = x_curr + 1;
          if(tmp_shift)
          {
            x_next -= 1;
          }
          y_next = y_curr + 1;
          grid[x_next][y_next] = 1;
        }
        else
        {
          stop = true;
        }
      }
      break;
      
    case 2:
      if((x_curr == 0) || (y_curr == (y_points -1)))
      {
         stop = true;
      }
      else
      {
        if(grid[x_curr - 1][y_curr + 1] == 0)
        {
          x_next = x_curr - 1;
          if(tmp_shift)
          {
            x_next += 1;
          }
          y_next = y_curr + 1;
          grid[x_next][y_next] = 1;
          
        }
        else
        {
          stop = true;
        }  
      }
      break;
      
    case 3:
      if(x_curr == 0)
      {
         stop = true;
      }
      else
      {
        if(grid[x_curr - 1][y_curr] == 0)
        {
          x_next = x_curr - 1;
          y_next = y_curr;
          grid[x_curr - 1][y_curr] = 1;
          
        }
        else
        {
          stop = true;
        } 
      }
      break;
      
    case 4:
      if((x_curr == 0) || (y_curr == 0))
      {
         stop = true;
      }
      else
      {
        if(grid[x_curr - 1][y_curr - 1] == 0)
        {
          x_next = x_curr - 1;
          if(tmp_shift)
          {
            x_next += 1;
          }
          y_next = y_curr - 1;
          grid[x_next][y_next] = 1;
          
        }
        else
        {
          stop = true;
        } 
      }
      break;  
       
    case 5:      
      if((x_curr == (x_points -1)) || (y_curr == 0))
      {
         stop = true;
      }
      else
      {
        if(grid[x_curr +1][y_curr - 1] == 0)
        {
          x_next = x_curr + 1;
          if(tmp_shift)
          {
            x_next -= 1;
          }
          y_next = y_curr - 1;
          grid[x_next][y_next] = 1;
          
        }
        else
        {
          stop = true;
        }  
      }
      break;        
  }
}

function reset_grid()
{
  for(let x = 0; x < x_points; x++)
  {
    grid[x] = [];
    for(let y = 0; y < y_points; y++)
    {  
      grid[x][y] = 0;
    }
  }  
}

function draw_grid()
{
  stroke('black');
  strokeWeight(5);
  for (let x = 0; x < x_points; x++) 
  {
    for (let y = 0; y < y_points; y++) 
    {
      if(y % 2 == 0)
      {
        point((x+1)*x_scale, (y+1)*y_scale);
      }
      else
      {
        point((x+1)*x_scale + x_shift, (y+1)*y_scale);
      }
    }
  }
}

function draw_config()
{  
  
  let v_shift = cnv_pos.y + 200;
  let h_shift = cnv_pos.x + 80;
  
  textSize(15);
  text('3', h_shift - 35, v_shift);
  text('4', h_shift , v_shift - 35);
  text('2', h_shift , v_shift + 35);
  text('5', h_shift + 35, v_shift - 35);
  text('1', h_shift + 35, v_shift + 35);
  text('0', h_shift + 70, v_shift);
  
}

function print_rules()
{
  let v_shift = cnv_pos.y + 120;
  let h_shift = cnv_pos.x + 80;
  
  let print_r = createElement('h8', 'Current set of rules:     [' + rules + ']');
  print_r.position(h_shift, v_shift);
  
}

function set_rules()
{  
  
  let v_shift = cnv_pos.y + 120;
  let h_shift = cnv_pos.x + 80;
  
  read_box = createElement('h8', 'Rule number ' + (rules.length +1) + ':');
  read_box.position(h_shift, v_shift);
  
  inp = createInput('1', 'int');
  inp.position(h_shift+120, v_shift);
  inp.size(70);
}

function get_rules()
{
  rules[rules.length] = int(inp.value());
}


function setup()
{
  x_scale = int(x_cnv/(x_points));
  y_scale = int(y_cnv/(y_points));
  x_shift = x_scale/2;
  
  cnv = createCanvas(x_cnv, y_cnv);
  cnv.center('horizontal');
  cnv_pos = cnv.position();
  background(255);

  reset_grid();
  
  grid[x_pos][y_pos] = 1;
  
}

function keyReleased() 
{  
  if(keyCode == 32)
  {
    removeElements();
    set_rules(); 
    draw_config();
  }
  if(keyCode == 13)
  {
    get_rules();
  }
  if(key == 'p')
  {
    removeElements();
    print_rules();
  }
  if(key == 's')
  {
    background(230);
    removeElements();
    start_sim = true;
  }
  return false;
}


function draw()
{  
  var x_tmp;
  var x_next_tmp;
  
  if(start_sim)
  {
    if(first_it)
    {
      draw_grid();
      stroke('red');
      strokeWeight(5);
      if(y_pos % 2 == 0)
      {
        point((x_pos+1)*x_scale, (y_pos+1)*y_scale);
      }
      else
      {
        point((x_pos+1)*x_scale + x_shift, (y_pos+1)*y_scale);
      }
      first_it = false;
    }
    if(stop)
    {
      stroke('red');
      strokeWeight(5);
      if(y_zero % 2 == 0)
      {
        point((x_zero+1)*x_scale, (y_zero+1)*y_scale);
      }
      else
      {
        point((x_zero+1)*x_scale + x_shift, (y_zero+1)*y_scale);
      }
      
      stroke('green');
      if(y_pos % 2 == 0)
      {
        point((x_pos+1)*x_scale, (y_pos+1)*y_scale);
      }
      else
      {
        point((x_pos+1)*x_scale + x_shift, (y_pos+1)*y_scale);
      }
      
      
      noLoop();
    }
    else
    {  
      move(rules[rules_cnt], x_pos, y_pos);
      rules_cnt += 1;
      
      if(rules_cnt > rules.length)
      {
        rules_cnt = 0;
      }
      if(y_next % 2 == 0)
      {
        x_next_tmp = (x_next+1)*x_scale;
      }
      else
      {
        x_next_tmp = (x_next+1)*x_scale + x_shift;
      }
      
      if(y_pos % 2 == 0)
      {
        x_tmp = (x_pos+1)*x_scale;
      }
      else
      {
        x_tmp = (x_pos+1)*x_scale + x_shift;
      }
      
      stroke('black');
      strokeWeight(1);
      line(x_tmp,(y_pos+1)*y_scale, x_next_tmp, (y_next+1)*y_scale);
      
      stroke('blue');
      strokeWeight(5);
      point(x_next_tmp, (y_next+1)*y_scale);

      x_pos = x_next;
      y_pos = y_next;
    }
    
  }

}
