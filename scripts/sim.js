(function () {
  var imgDMS = eval(readCookie("thedata"));
    console.log(imgDMS);
    var x = createData(imgDMS);
    console.log(x);
    //imgDMS = x;
    var imagesDMS = x;
    //convert DMS to latLong doubles
    var imagesLatLong = new Array(imagesDMS.length);
    for(var i=0; i<imagesLatLong.length; i++) {
      imagesLatLong[i] = {
        imageName: imagesDMS[i].imageName,
        lat: ((imagesDMS[i].latD) + (imagesDMS[i].latM/60) + (imagesDMS[i].latS/3600)),
        long: ((imagesDMS[i].longD) + (imagesDMS[i].longM/60) + (imagesDMS[i].longS/3600))
      };
      console.log(imagesLatLong[i].lat);
    }
//look for min x
  var minX = imagesLatLong[0].long;
  for(var i=0; i<imagesLatLong.length; i++) {
    if(imagesLatLong[i].long < minX) {
      minX = imagesLatLong[i].long;
    }
  }
  //shift everythng by minX
  for(var i=0; i<imagesLatLong.length; i++) {
    imagesLatLong[i].long -= minX;
  }
  //look for max y
  var maxY = imagesLatLong[0].lat;
  for(var i=0; i<imagesLatLong.length; i++) {
    if(imagesLatLong[i].lat < maxY) {
      maxY = imagesLatLong[i].lat;
    }
  }
  //shift everythng by maxY
  for(var i=0; i<imagesLatLong.length; i++) {
    imagesLatLong[i].lat -= maxY;
    console.log(imagesLatLong[i].lat);
  }

  //blow everything up by some proportion
  var proportion = 20494000;
  proportion /= 10.41667;
  for(var i=0; i<imagesLatLong.length; i++) {
    imagesLatLong[i].lat *= proportion;
    imagesLatLong[i].long *= proportion;
    console.log(imagesLatLong[i].lat + ", " + imagesLatLong[i].long);
  }

  var images = new Array(imagesLatLong.length);
  for(var i=0; i<images.length; i++) {
    images[i] = {
      imageName: imagesLatLong[i].imageName,
      x: imagesLatLong[i].long,
      y: imagesLatLong[i].lat
    };
  }

  var delay = 50;
  window.setInterval(draw, delay);

  var slider = document.getElementById("myRange");
  var output = document.getElementById("demo");
  output.innerHTML = slider.value; // Display the default slider value

  // Update the current slider value (each time you drag the slider handle)
  slider.oninput = function() {
   output.innerHTML = this.value;
  }

  var slider3 = document.getElementById("myRange3");
  var output3 = document.getElementById("demo3");
  output.innerHTML = slider.value; // Display the default slider value
  function readCookie(name) {
   let key = name + "=";
   let cookies = document.cookie.split(';');
   for (var i = 0; i < cookies.length; i++) {
     let cookie = cookies[i];
     while (cookie.charAt(0) === ' ') {
             cookie = cookie.substring(1, cookie.length);
         }
     if (cookie.indexOf(key) === 0) {
             return cookie.substring(key.length, cookie.length);
         }
   }
   return null;
 }
  // Update the current slider value (each time you drag the slider handle)
    slider3.oninput = function() {
     output3.innerHTML = this.value;
  }

  var slider2 = document.getElementById("myRange2");
  var output2 = document.getElementById("demo2");
  output2.innerHTML = slider2.value; // Display the default slider value

  // Update the current slider value (each time you drag the slider handle)
  slider2.oninput = function() {
   output2.innerHTML = this.value;
  }


function deleteCookie(name) {
   createCookie(name, null);
}

function createData(arr){
  console.log(arr);
  var newArray = [];
  var count = 0;
  arr.forEach(obj=>{
    console.log(obj);
    newobj={};
    newobj["imageName"] = "img_"+count;
    count+=1;
    newobj["latD"] =obj["lat"][0];
    newobj["latM"] =obj["lat"][1];
    newobj["latS"] =obj["lat"][2];
    newobj["longD"] =obj["long"][0];
    newobj["longM"] =obj["long"][1];
    newobj["longS"] =obj["long"][2];
    console.log(newobj);
    newArray.push(newobj);
  });
  console.log(newArray);
  return newArray;
}

  function myFunction() {
    console.log("myFunction got called!");
  }

  function draw() {
    //console.log(output.innerHTML + ", " + output2.innerHTML);
    //draw the dots the first time
    var c = document.getElementById("canvas2");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#DF9000";
    var length = 15;
    var width = length;
    var xShift = parseInt(output.innerHTML);
    var yShift = parseInt(output2.innerHTML);
    var size = parseInt(output3.innerHTML);
    size /= 100;
    console.log("XShift: " + xShift + ", YShift: " + yShift);

    ctx.clearRect(0, 0, 5000, 5000);
    for(var i=0; i<images.length; i++) {
      ctx.fillRect(((images[i].x - (width/2) + xShift) * size), ((images[i].y - (length/2) + yShift) * size), length, width); //later: use path and arc to make circle
    }

    //Redraw dots, but slightly smaller, so that dots have different colored border
    ctx.fillStyle = "#00C5C5";
    length /= 1.5;
    width /= 1.5;
    for(var i=0; i<images.length; i++) {
      ctx.fillRect(((images[i].x - (width/2) + xShift) * size), ((images[i].y - (length/2) + yShift) * size), length, width); //later: use path and arc to make circle
    }
  }

  })();
