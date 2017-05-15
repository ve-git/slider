function Slider(options) {
  let elem = options.elem;
  let savedItems = []; // saved copies of elements
  let elPicture;
  let timerId;
  let playing = false;
  let paused = false;
  

  // creating  copies of elements
  for (var i=0; i < elem.children.length; i++){
    savedItems.push(elem.children[i]);
    savedItems[i].style.display = 'none';
    savedItems[i].style.position = 'absolute';
    savedItems[i].style.left = '0px';
    savedItems[i].style.top = '0px';
    savedItems[i].height = elem.dataset.height;
    savedItems[i].width = elem.dataset.width;
  }


  elem.innerHTML = '';

  // placeholder for pictures
  elPicture = document.createElement('div');
  elPicture.className = 'slider-picture';
  elPicture.style.position = "relative";
  elPicture.style.overflow = "hidden"; 
    
  elPicture.style.height = elem.dataset.height + 'px';
  elPicture.style.width  = elem.dataset.width + 'px';
  elPicture.style.border = "1px solid #003";

  for (var i=0; i < savedItems.length; i++){
    elPicture.appendChild(savedItems[i]); 
  }
    
    
  elToolbar = document.createElement('div');
  elToolbar.className = 'slider-toolbar';
  elToolbar.style.position = "relative";
  elToolbar.style.height = '30px';
  elToolbar.style.width  = elPicture.style.width;
  elToolbar.style.border = "1px solid #003";

  // spanBefore
  var spanBefore = document.createElement('div'); 
  spanBefore.className = 'slider-before';
  spanBefore.innerHTML = '<<';
  setBtnStyle(spanBefore.style, "0px");

  // space between buttons	
  var spanNbsp =  document.createElement('span');
  spanNbsp.innerHTML = '&nbsp';

  // spanPlay
  var spanPlay = document.createElement('div'); 
  spanPlay.className = 'slider-play';
  spanPlay.innerHTML = '►';
  setBtnStyle(spanPlay.style, "40px");

  // spanStop
  var spanStop = document.createElement('div'); 
  spanStop.style.display = 'none'; 
  spanStop.className = 'slider-stop';
  spanStop.innerHTML = '■'; 
  setBtnStyle(spanStop.style, "40px");

  
  // space between buttons	
  var spanNbsp2 =  document.createElement('span');
  spanNbsp.innerHTML = '&nbsp';
  
  
  // spanAfter
  var spanAfter =  document.createElement('span');
  spanAfter.className = 'slider-after';
  spanAfter.innerHTML = '>>';
  setBtnStyle(spanAfter.style, "80px");

  // final arangement
  elem.appendChild(elPicture);
  elem.appendChild(elToolbar);
  elToolbar.appendChild(spanBefore); 
  elToolbar.appendChild(spanNbsp); 
  elToolbar.appendChild(spanPlay); 
  elToolbar.appendChild(spanStop); 
  elToolbar.appendChild(spanNbsp2); 
  elToolbar.appendChild(spanAfter); 
    
  // show first picture
  getPictureByIndex(elem.dataset.currentItem).style.display = '';

  


  function getPictureByIndex(ind){
    var result;
    for (var i=0; i < savedItems.length; i++){
      if (i==ind){
        result = savedItems[i];
        break;
      }
    }
    return result;
  }

  
  function setBtnStyle(style, left){
    style.color = "black";
    style.backgroundColor = "#CCCCCC";  ;
    style.left  = left;
    style.top   = "5px";
    style.width = "30px";
    style.textAlign = "center";
    style.position = "absolute";
  }

  function goNext(){
    let oldPicture =  getPictureByIndex(elem.dataset.currentItem); 

    elem.dataset.currentItem = parseInt(elem.dataset.currentItem) + 1;
    if (elem.dataset.currentItem == savedItems.length) {elem.dataset.currentItem = 0;}

    let newPicture =  getPictureByIndex(elem.dataset.currentItem); 
    newPicture.style.transition = "none";
    newPicture.style.display = 'none';
    newPicture.style.left = elPicture.style.width;
    newPicture.style.display = '';

    setTimeout(function () {
      newPicture.style.left = "0";
      newPicture.style.transition = elem.dataset.transition;
      oldPicture.style.left = "-" + elPicture.style.width ;
      oldPicture.style.transition = elem.dataset.transition;
    }, 0);
  }

  function goPrevious(){
    let oldPicture =  getPictureByIndex(elem.dataset.currentItem); 

    elem.dataset.currentItem = elem.dataset.currentItem - 1;
    if (elem.dataset.currentItem == -1){elem.dataset.currentItem = savedItems.length - 1;}

    let newPicture =  getPictureByIndex(elem.dataset.currentItem); 
    newPicture.style.transition = "none";
    newPicture.style.display = 'none';
    newPicture.style.left = '-' + elPicture.style.width;
    newPicture.style.display = '';


    setTimeout(function () {
      newPicture.style.left = "0";
      newPicture.style.transition =  elem.dataset.transition;
      oldPicture.style.left = elPicture.style.width ;
      oldPicture.style.transition = elem.dataset.transition;
    }, 0);
  }

  function play(){
    spanPlay.style.display = 'none';
    spanStop.style.display = '';

    timerId = setTimeout(function run() {
      goNext()
      timerId = setTimeout(run, 2000);
    }, 0);

    playing = true;  
  }

  function stop(){
    spanStop.style.display = 'none';
    spanPlay.style.display = '';
    clearTimeout(timerId);
    playing = false;
  }
  
  elem.onclick = function(event) {
    if (event.target.closest('.slider-before')) { goPrevious();}
    if (event.target.closest('.slider-after'))  { goNext();    }
    if (event.target.closest('.slider-play'))   { play();      }
    if (event.target.closest('.slider-stop'))   { stop();      }
  };
  

  // Не работает в Google Chrom при включенных инструментах разработчика, 
  // как и пример из http://learn.javascript.ru/mousemove-mouseover-mouseout-mouseenter-mouseleave
  elem.onmouseover = function(event) {
    if (event.target.closest('.slider-picture')) { if (playing){stop(); paused = true;}}
  };
  
  elem.onmouseout = function(event) {
    if (event.target.closest('.slider-picture')) { if (paused) {play(); paused = false;}}
  };
  
  
  // Не работает в Google Chrom 
  //elem.ontransitionend = function(event) {  
  
}
