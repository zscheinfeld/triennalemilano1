
$( document ).ready(function() {

var posterheight = $( window ).height() * .8
var posterwidth = posterheight * (9/16)
var columns = 8
var rows = 4
var xscale = posterwidth/columns
var yscale = posterheight /rows
var displaypercent;
var displaymode = 0
let incometable;
var countryrow;
var metricnumber = 0
var slidershufflepercent= 1

// Default Colors
var colorR= 255
var colorG= 204
var colorB= 2





  $(".metric").click(function(){
    $(this).next().slideToggle()

  })

//round function
  function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
  
// function to make a 2d array
function new2darray (rows, cols){
  array =[]
  for (x=0;x<cols; x++){
    for (y=0;y<rows; y++){
      array.push([x,y])
    }
  }
  console.log(array)
  return(array)
}

// function to pick random elements of an array based off of a percent
function pickrandomelts (percent, oldarray){
  newpercentarray = []
  var total = oldarray.length

  var newarraytotal = Math.floor((total * percent))
  for (x=0 ; x<newarraytotal; x++){
    var newelt = oldarray[Math.floor(Math.random() * oldarray.length)]
    while (newpercentarray.includes(newelt) == true){
      newelt = oldarray[Math.floor(Math.random() * oldarray.length)]
    }
    newpercentarray[x] = newelt;
  }
  return(newpercentarray);
}

var gridarray = new2darray(columns,rows);
var newgridarray = pickrandomelts(displaypercent, gridarray)
var countryhtml =''

let sketch = function(p) {

  //slider
var slider = document.getElementById("myRange");
var output = document.getElementById("shuffleval");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
  slidershufflepercent = this.value;
   p.clear()
    p.background(0);
    gridarray = new2darray(columns,rows);
    newshuffledarray = shufflearray(gridarray, displaypercent*.01, slidershufflepercent)
}
  
  p.preload = function() {
    incometable = p.loadTable('Inequalities-Master.csv', 'csv', 'header')
  }

  function inputCountryData (tablename){
    countryhtml =''
    for (x=4; x< tablename.getRowCount(0); x++){
      if (incometable.getString(x, metricnumber) == ""){
       
      }
      else{
        countryhtml += `<div class="metric-option" id="${incometable.getString(x, 1)}">${incometable.getString(x, 0)}</div>`
      }
    }
    $("#country-container").html(countryhtml);

  }

  p.setup = function(){
    p.createCanvas(posterwidth, posterheight);
    p.background(0);
    inputCountryData(incometable)
  }




  //choose the metric and column to pull data from
  $(".metric-option").click(function(){

    displaymode = 1

    $(this).parent().slideToggle()
    $(this).parent().prev().text($(this).text())
    
    metricnumber = $(this).index() + 2
    inputCountryData(incometable)

    $(".metric-explainer").show()
    $(".country-specific-type").show()
    $(".country").text("the world")

    if ($(this).index() == 0){
    
      $(".color").css({
        "background-color": "#FFCC02"
      })
      colorR= 255
      colorG= 204
      colorB= 2
      $(".color-name").text("yellow")
      $(".inequality-type").text("income share held by highest 10%")
      $(".category-description").show()
      $(".category-description").text("Percentage share of income or consumption is the share that accrues to subgroups of population indicated by deciles or quintiles.")
      
    }

    if ($(this).index() == 1){

      $(".color").css({
        "background-color": "#63E4DD"
      })
      colorR= 99
      colorG= 228
      colorB= 221
      $(".color-name").text("light blue")
      $(".inequality-type").text("prevalence of undernourishment")
      $(".category-description").show()
      $(".category-description").text("Prevalence of undernourishments is the percentage of the population whose habitual food consumption is insufficient to provide the dietary energy levels that are required to maintain a normal active and healthy life.")
    }

    if ($(this).index() == 2){
   
      $(".color").css({
        "background-color": "#6380E4"
      })
      colorR= 99
      colorG= 128
      colorB= 228
      $(".color-name").text("dark blue")
      $(".inequality-type").text("renewable electricity output")
      $(".category-description").show()
      $(".category-description").text("Renewable electricity is the share of electrity generated by renewable power plants in total electricity generated by all types of plants.")
    }

    if ($(this).index() == 3){

      $(".color").css({
        "background-color": "#F73E49"
      })
      colorR= 247
      colorG= 62
      colorB= 73
      $(".color-name").text("red")
      $(".inequality-type").text("urban population")
      $(".category-description").show()
      $(".category-description").html("<div class='inner-paragraph'>Urban population refers to people living in urban areas as defined by national statistical offices. The data are collected and smoothed by United Nations Population Division.</div><p>Explosive growth of cities globally signifies the demographic transition from rural to urban, and is associated with shifts from an agriculture-based economy to mass industry, technology, and service. In principle, cities offer a more favorable setting for the resolution of social and environmental problems than rural areas.</p>")
  
    }

    if ($(this).index() == 4){

      $(".color").css({
        "background-color": "#70EA5C"
      })
      colorR= 112
      colorG= 234
      colorB= 92
      $(".color-name").text("green")
      $(".inequality-type").text("proportion of seats held by women in national parliaments")

      $(".category-description").show()
      $(".category-description").html("<div class='inner-paragraph'>Women in parliaments are the percentage of parliamentary seats in a single or lower chamber held by women.</div><p>Despite much progress in recent decades, gender inequalities remain pervasive in many dimensions of life - worldwide.</p>")
    }

    if ($(this).index() == 5){
    
      $(".color").css({
        "background-color": "#C958D2"
      })

      colorR= 201
      colorG= 88
      colorB= 210
      $(".color-name").text("purple")
      $(".inequality-type").text("literacy rate, adult total (% of people ages 15 and above)")
      $(".category-description").show()
      $(".category-description").html("<div class='inner-paragraph'>Adult literacy rate is the percentage of people ages 15 and above who can both read and write with understanding a short simple statement about their everyday life.</div><p>Literacy rate is an outcome indicator to evaluate educational attainment. This data can predict the quality of future labor force and can be used in ensuring policies for life skills for men and women. It can be also used as a proxy instrument to see the effectiveness of education system; a high literacy rate suggests the capacity of an education system to provide a large population with opportunities to acquire literacy skills.</p>")
    }

    displaypercent = Number(`${incometable.getString(263, metricnumber)}`)
    $(".income-percent").text(`${round(displaypercent,1)}`)
    p.clear()
    p.background(0);
    gridarray = new2darray(columns,rows);
    newshuffledarray = shufflearray(gridarray, displaypercent*.01, slidershufflepercent)

    $(".country").text("the world")
    $("#country-name-menu").text("Country")

  })


  $('#country-container').on('click', '*', function() {
    $(this).parent().slideToggle()
    $(".country").text($(this).text())
    $("#country-name-menu").text($(this).text())
    

    for (x=4; x< incometable.getRowCount(0); x++){
      if( $(this).attr("id") == incometable.getString(x, 1)){
        countryrow=x
        displaypercent = Number(`${incometable.getString(countryrow, metricnumber)}`)
      }
      
      $(".income-percent").text(`${round(displaypercent,1)}`)
      
    }

    p.clear()
    p.background(0);
    gridarray = new2darray(columns,rows);
    newshuffledarray = shufflearray(gridarray, displaypercent*.01, slidershufflepercent)
    
  });

  function rescale(cols, rowsv){
    p.clear()
    p.background(0);
    columns = cols
    rows = rowsv
    xscale = posterwidth/columns
    yscale = posterheight /rows
    gridarray = new2darray(columns,rows);
    newshuffledarray = shufflearray(gridarray, displaypercent*.01, 1)
  }


  //scale menu function  
  $('.metric-option-scale-container').on('click', '*', function() {
    $(this).parent().slideToggle()
    if ($(this).index() == 0){
     rescale(2,5)
     $(".scale-name").text($(this).text())
    }

    if ($(this).index() == 1){
      rescale(10,10)
      $(".scale-name").text($(this).text())
    }

    if ($(this).index() == 2){
      rescale(20,20)
      $(".scale-name").text($(this).text())
    }


    if ($(this).index() == 3){
      rescale(20,50)
      $(".scale-name").text($(this).text())
    }

    if ($(this).index() == 4){
      rescale(20,100)
      $(".scale-name").text($(this).text())
    }

    if ($(this).index() == 5){
      rescale(100,100)
      $(".scale-name").text($(this).text())
    }

    
  }); 



  function showgrid(){
    for( x = 0; x<columns ; x++){
      p.line(x * (posterwidth/columns), 0, x * (posterwidth/columns), posterheight)
      p.line(0, x * (posterheight/rows), posterwidth, x * (posterheight/rows))
    }
  }


// shuffle 
var emptyspaces = []
function shufflearray(oldarray, newpercent, shufflepercent){
  emptyspaces = [];
  var shuffledarray = []
  var looplength = Math.floor(newpercent * array.length)
  var newrandeltno;
  
  for (x=looplength; x<oldarray.length; x++){
    emptyspaces.push(oldarray[x])
  }
  
  for (x=0;x<looplength; x++){
   if (Math.random(1)<shufflepercent){
      shuffledarray.push(oldarray[x])
   }
    else{
      if(emptyspaces.length>1){
        newrandeltno= Math.floor(Math.random() * emptyspaces.length)
        shuffledarray.push(emptyspaces[newrandeltno])
        emptyspaces.splice(newrandeltno,1)
      }
      
      else{
        shuffledarray.push(oldarray[x])
    
      }
      
    }
    
 }
 
 return(shuffledarray)
}

var newshuffledarray = shufflearray(gridarray, displaypercent, slidershufflepercent)

for (x = 0; x<newshuffledarray.length; x++){
     
  console.log(newshuffledarray[x][0])
  console.log(newshuffledarray[x][1])
  
    }

  p.draw = function(){

    if (displaymode == 0){
      colorR= 201
      colorG= 201
      colorB= 201
      p.rectMode(p.CORNER);
      for (x=0; x<columns ; x ++){
        for (y=0 ; y<rows; y++){
          if (((y+1)*(x+1))%2 == 1){
            const c = p.color(colorR, colorG, colorB);
            p.fill(c);
            p.strokeWeight(0);
            p.rect((x+1) * xscale, (y +1) * yscale, xscale, yscale)
          }

          if (((y+1)*(x))% 2 == 1){
            const c = p.color(colorR, colorG, colorB);
            p.fill(c);
            p.strokeWeight(0);
            p.rect((x-1) * xscale, (y) * yscale, xscale, yscale)
          }


        }
      }   

     }  

   if (displaymode == 1){


    p.rectMode(p.CORNER);
    // for ( x=0; x<newgridarray.length; x++){
    //   const c = p.color(colorR, colorG, colorB);
    //   p.fill(c);
    //   p.strokeWeight(0);
    //   p.rect(newgridarray[x][0] * xscale,newgridarray[x][1] *yscale, xscale, yscale)
    //   // rect(newgridarray[x])
    //  }
    const c = p.color(colorR, colorG, colorB);
    p.fill(c);
    p.stroke(255)
    p.strokeWeight(0);

    for (x = 0; x<newshuffledarray.length; x++){
      p.rect(newshuffledarray[x][1]* xscale,newshuffledarray[x][0]* yscale,xscale, yscale)
        }

   } 

   if (displaymode ==4){
    for ( x=0; x<newgridarray.length; x++){
      p.ellipse((newgridarray[x][0] * xscale) + (xscale/2),(newgridarray[x][1] *yscale) + (yscale/2), 10, 10)
     }
   }

    if (displaymode==5){
      p.rectMode(p.CORNER);
      for ( x=0; x<newgridarray.length; x++){
        const c = p.color(colorR, colorG, colorB);
        p.fill(c);
        p.strokeWeight(0);
        p.rect(newgridarray[x][0] * xscale,newgridarray[x][1] *yscale, xscale, yscale)
        // rect(newgridarray[x])
       }
      
    }

  }

  // download
  var savecount = 0
  $(".download").click(function(){
    p.saveCanvas(`pattern_${savecount}.jpg`);
    savecount= savecount + 1
  })

};
new p5(sketch, 'sketch-container');


});