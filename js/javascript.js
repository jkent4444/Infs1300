//top menu//
////////////////////////////////////////////////////////////////////////
var DDSPEED = 10;
var DDTIMER = 15;

// main function to handle the mouse events //
function ddMenu(id,d){
  var h = document.getElementById(id + '-ddheader');
  var c = document.getElementById(id + '-ddcontent');
  clearInterval(c.timer);
  if(d == 1){
    clearTimeout(h.timer);
    if(c.maxh && c.maxh <= c.offsetHeight){return}
    else if(!c.maxh){
      c.style.display = 'block';
      c.style.height = 'auto';
      c.maxh = c.offsetHeight;
      c.style.height = '0px';
    }
    c.timer = setInterval(function(){ddSlide(c,1)},DDTIMER);
  }else{
    h.timer = setTimeout(function(){ddCollapse(c)},50);
  }
}

// collapse the menu //
function ddCollapse(c){
  c.timer = setInterval(function(){ddSlide(c,-1)},DDTIMER);
}

// cancel the collapse if a user rolls over the dropdown //
function cancelHide(id){
  var h = document.getElementById(id + '-ddheader');
  var c = document.getElementById(id + '-ddcontent');
  clearTimeout(h.timer);
  clearInterval(c.timer);
  if(c.offsetHeight < c.maxh){
    c.timer = setInterval(function(){ddSlide(c,1)},DDTIMER);
  }
}

// incrementally expand/contract the dropdown and change the opacity //
function ddSlide(c,d){
  var currh = c.offsetHeight;
  var dist;
  if(d == 1){
    dist = (Math.round((c.maxh - currh) / DDSPEED));
  }else{
    dist = (Math.round(currh / DDSPEED));
  }
  if(dist <= 1 && d == 1){
    dist = 1;
  }
  c.style.height = currh + (dist * d) + 'px';
  c.style.opacity = currh / c.maxh;
  c.style.filter = 'alpha(opacity=' + (currh * 100 / c.maxh) + ')';
  if((currh < 2 && d != 1) || (currh > (c.maxh - 2) && d == 1)){
    clearInterval(c.timer);
  }
}

//Displays country when pressed hides when other country pressed//
var c_display= false
function d_country(){
  var id = document.getElementById("id")
  alert(id.innerHTML);

}

//Mashup code.//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var current_code = null

var gdp_data = {
  AU: [[2009, 40479], [2010, 41102], [2011, 41318], [2012, 60000]],
  NZ: [[2009, 27192], [2010, 27617], [2011, 27700], [2012, 50000]],
  RU: [[2009, 47192], [2010, 27617], [2011, 27700], [2012, 50600]],
  US: [[1996, 34989],[1997,36112 ],[1998, 37247],[1999, 38599], [2000, 39750],[2001, 39769],[2002, 40108],[2003, 40769],[2004, 41792],[2005, 42681],[2006, 43332],[2007, 43726],[2008, 43178], [2009, 41313],[2010, 42189], [2011, 42448], [2012, 49000]],
}

var pop_data = {
  AU: [[2009, 27192], [2010, 27623], [2011, 27700], [2012, 50000]],
  RU: [[2009, 47192], [2010, 276137], [2011, 27700], [2012, 50000]],
}

var medal_data = {
  AU: [[2009, 47192], [2010, 276223], [2011, 277200], [2012, 520000]],
  RU: [[2009, 472192], [2010, 27617], [2011, 27700], [2012, 50000]],
}

var selected_Countries =  []
var current_catagory = gdp_data

$(document).ready(function() {
  
  var map = new jvm.WorldMap ({

      container: $("div#worldmap"),  
    map: 'world_mill_en',
    onRegionOver: function(event, code){
      //console.log('region-over', code, map.getRegionName(code));
    },
    onRegionClick: function(event, code) {
      if (current_code == null){
        current_code = code
      }

      append_country(code);
      checkAccordion(code);  
    },
  }); 

  function append_country(code) {
    var exists = false
    if (selected_Countries.length != 0 ){
      for (i=0;i<selected_Countries.length;i++){
        if (code == selected_Countries[i]){
          exists = true
        }
      };
    }
    else { 
    };

    if (exists == false){
      selected_Countries.push(code);
    }
    console.log(selected_Countries);  
  };
});
  var current_values = []
  function plotwithoption(code) {
    current_code = code
    current_values = []
    for (i=0;i<selected_Countries.length;i++){
      $.each(gdp_data, function(key, value) {
        if (key == selected_Countries[i]) {
          key = value
          current_values.push(key);
        }
      });
    };
    console.log("plot")
    $.plot($("#placeholder"), current_values);         
  };

  function plotafterintial(catagory){ 
    current_values = []
    current_catagory = catagory
    for (i=0;i<selected_Countries.length;i++){
      $.each(current_catagory, function(key,value){
        if (key == selected_Countries[i]) {
          key = value
          current_values.push(key);
        }
      });
    };
    $.plot($("#placeholder"), current_values);         
  };

//accordion//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ContentHeight = 700;
//content global height.
var TimeToSlide = 250.0;
//how fast the accordion opens and closes.

var openAccordion = '';

function checkAccordion(code){
  console.log("check" +current_code)
  if (code == current_code) {
    runAccordion(1);
    selected_Countries = [code];
  }
  plotwithoption(code);

};

function runAccordion(index)
//runs the animate function also it creates a delay after pressing. it also updates which slide is open and supplies the previously opened slide as the closing id.
{
  console.log("opening")
  var nID = "Accordion" + index + "Content";
  if(openAccordion == nID)
  nID = '';
  
  setTimeout("animate(" + new Date().getTime() + "," + TimeToSlide + ",'" 
    + openAccordion + "','" + nID + "')", 100);
    //delay set.
  
  openAccordion = nID;
  //sets open accordion
}
function animate(lastTick, timeLeft, closingId, openingId)
//animates the accordion opening/closing.
{  
  var curTick = new Date().getTime();
  var elapsedTicks = curTick - lastTick;
  
  var opening = (openingId == '') ? null : document.getElementById(openingId);
  var closing = (closingId == '') ? null : document.getElementById(closingId);
 
  if(timeLeft <= elapsedTicks)
  {
  if(opening != null)
  //opens the accordion
    opening.style.height = ContentHeight + 'px';
  
  if(closing != null)
  //hides the accordion
  {
    closing.style.display = 'none';
    closing.style.height = '0px';
  }
  return;
  }
 
  timeLeft -= elapsedTicks;
  var newClosedHeight = Math.round((timeLeft/TimeToSlide) * ContentHeight);

  if(opening != null)
  //displays the accordion that was pressed.
  {
  if(opening.style.display != 'block')
    opening.style.display = 'block';
  opening.style.height = (ContentHeight - newClosedHeight) + 'px';
  }
  
  if(closing != null)
  //closes the accordion.
  closing.style.height = newClosedHeight + 'px';

  setTimeout("animate(" + curTick + "," + timeLeft + ",'" 
    + closingId + "','" + openingId + "')", 33);
}

function clear_all(){
  selected_Countries = []
  runAccordion(1);
};

function clear_last(){
  selected_Countries.pop();
  current_code = selected_Countries.slice(-1)[0];
  console.log('meow'+current_code);
  if (selected_Countries.length == 0){
    runAccordion(1);
  }
  else{
    console.log(current_catagory);
    plotafterintial(current_catagory);
  }    

};
var current_countries = []
var average_value = []
var actual_value = 0
var value_tup = null
var country_str = null
var Country_dataset = []
function averaging(){
  average_value = []
  value_tup = []
  current_countries = []
  Country_dataset = []
    for (i=0;i<current_values.length;i++){
      actual_value = 0
      country_str = null
      $.each(current_values[i], function(key, value){
        current_countries = selected_Countries[i]
        actual_value = actual_value + value[1]
        country_str = i + " "+ actual_value/current_values[i].length
        name_data = i + " " + current_countries
      })
      name_data = name_data.split(" ");
      Country_dataset.push(name_data);
      country_str = country_str.split(" ");
      average_value.push(country_str);
    }
  var data = [
        {
            data: average_value,
            color: '#409628',
            label:'Mean',
            bars: {show: true, align:'center', barWidth:0.8}
        }    
    ];

  var options = {
    xaxis: { ticks: Country_dataset}
  };
  $.plot($("#placeholder"),  data, options );  
  };