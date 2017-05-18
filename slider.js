/*last edited 18.05.2017 22:10 */

function Slider(options) {

  let _options = {
    //placeholder: document.getElementById('my-slider'),
    currentItem: 0,
    width: 538,
    height: 340,
    duration: 2000,
    transition:'left 2s',
    direction: 1,
    autoplay:0
  };

  _options = Object.assign({}, _options, options);

  if (!_options.placeholder){
    alert('Не передан контейнер!');
    return;
  }

  //let elem = _options.elem;
  let savedItems = []; // saved copies of elements
  let elPicture;
  let playing = false;
  let paused = false;

  let oldPicture;
  let newPicture;

  let transitionCount = 0; 
  let mode = 'preset';
  
  
  if (_options.direction != 1){_options.direction = -1;}
  if (_options.autoplay != 0){_options.autoplay != 1;}

  let currentDirection;

  // creating  copies of elements
  for (var i=0; i < _options.placeholder.children.length; i++){
    savedItems.push(_options.placeholder.children[i]);
    savedItems[i].style.position = 'absolute';
    savedItems[i].style.left = _options.width + 'px';
    savedItems[i].style.top = '0px';
    savedItems[i].height = _options.height;
    savedItems[i].width = _options.width;
  }


  _options.placeholder.innerHTML = '';

  // placeholder for pictures
  elPicture = document.createElement('div');
  elPicture.className = 'slider-picture';
  elPicture.style.position = "relative";
  elPicture.style.overflow = "hidden"; 
    
  elPicture.style.height = _options.height + 'px';
  elPicture.style.width  = _options.width + 'px';
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
  spanNbsp.innerHTML = '&nbsp;';

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
  spanNbsp.innerHTML = '&nbsp;';
  
  
  // spanAfter
  var spanAfter =  document.createElement('span');
  spanAfter.className = 'slider-after';
  spanAfter.innerHTML = '>>';
  setBtnStyle(spanAfter.style, "80px");
  // final arangement
  _options.placeholder.appendChild(elPicture);
  _options.placeholder.appendChild(elToolbar);
  elToolbar.appendChild(spanBefore); 
  elToolbar.appendChild(spanNbsp); 
  elToolbar.appendChild(spanPlay); 
  elToolbar.appendChild(spanStop); 
  elToolbar.appendChild(spanNbsp2); 
  elToolbar.appendChild(spanAfter); 




  // show first picture
  getPictureByIndex(_options.currentItem).style.display = '';
  getPictureByIndex(_options.currentItem).style.left = '0px';


  if (_options.autoplay==1){play();}

  ////////////////////////////////////////////////////////////////////////////////////////////////


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


  
  function setBtnStyle(style, left="1px"){
    style.color = "black";
    style.backgroundColor = "#CCCCCC";  ;
    style.left  = left;
    style.top   = "5px";
    style.width = "30px";
    style.textAlign = "center";
    style.position = "absolute";
  }

  function showInfo(mess){
	log.value += mess+ "\n";;  
  }
  
/*
Перевызываем процедуру в следующих случаях:
1. Если в режиме шоу не завершились транзишн
2. Если в режиме пресет не стартовали транзишн, а необходимость была
2. Если в режиме пресет не завершились транзишн

*/
  function goNext(){
    if (((mode == 'show')&&(transitionCount!=0))      // не завершен транзишн при показе рисунков
      || ((mode == 'preset2')&&(transitionCount==0))  // не начат транзишн при предварительной установке нового рисунка
      || ((mode == 'preset3')&&(transitionCount!=0))) // начат, но не завершен транзишн при предварительной установке нового рисунка
    {
      setTimeout(goNext, 100); // imho, a good way to make "sleep"
      return;
    } 

    if (playing&&paused) {return;}  // TODO сделать FSM и работать только через состояния

    if (mode == 'preset'){
      currentDirection = _options.direction; // сохраняем состояние при начале работы с перемещением

      oldPicture =  getPictureByIndex(_options.currentItem); 
      oldPicture.className = 'slider-old';
      if (currentDirection==1){
        _options.currentItem = _options.currentItem + 1;
        if (_options.currentItem == savedItems.length) {_options.currentItem = 0;}
      }
      else{
        _options.currentItem = _options.currentItem - 1;
        if (_options.currentItem == -1) {_options.currentItem = savedItems.length - 1;}
      }
      newPicture =  getPictureByIndex(_options.currentItem); 
      newPicture.className = 'slider-new';
      if (newPicture.style.left != ((currentDirection==1) ? '' : '-') + _options.width + 'px'){
        mode = 'preset2';
        oldPicture.style.zIndex = 2;
        newPicture.style.zIndex = 1; // новую нужно незаметно переставить
        newPicture.style.transition = "left 1ms"
        newPicture.style.left = ((currentDirection==1) ? '' : '-') + _options.width + 'px';
        setTimeout(goNext, 100);
        return;
  	  }
      else{
        mode = 'show';  
      }
    }

    if (mode == 'show'){
      newPicture.style.display = '';
      oldPicture.style.transition = _options.transition;
      newPicture.style.transition = _options.transition;

      setTimeout(function () {
        newPicture.style.left = "0";
        oldPicture.style.left = ((currentDirection==1) ? '-' : '') + elPicture.style.width;
      }, 50);
    }
  }

  function play(){
    show_paused(false);
    playing = true;
    goNext();
  }

  function stop(){
    show_paused(true);
    playing = false;
    paused = false;
  }

  function process_mouseover(){
    if (!playing) {return;}
    paused = true;
    show_paused(true);
  }

  function process_mouseout(){
    if (!paused) {return;}
    paused = false;
    play();
  }

  // При переписывании на прототипы, тут будет callback-function,
  // посколько предку не нужно знать, какие кнопки к нему прицепятся в потомке
  function show_paused(value){
    spanStop.style.display =  (value) ? 'none' : ''     ;
    spanPlay.style.display =  (value) ? ''     : 'none' ;
  }

  _options.placeholder.onclick = function(event) {
    if (event.target.closest('.slider-stop'))   { stop(); }
    if (event.target.closest('.slider-play'))   { play(); }

    // При показе слайд-шоу нет необходимости еще раз запускать goNext(), нужно только изменить направление.
    // И при нескольких кликах по кнопке достаточно один раз действие выполнить.
    if (event.target.closest('.slider-before')) { _options.direction = -1; if ((mode == 'preset') && !playing) {goNext();}}
    if (event.target.closest('.slider-after'))  { _options.direction = 1;  if ((mode == 'preset') && !playing) {goNext();}}
  };
  

  // Не работает в Google Chrom при включенных инструментах разработчика
  _options.placeholder.onmouseover = function(event) {
    if (event.target.closest('.slider-picture')) { process_mouseover(); }
  };
  
  _options.placeholder.onmouseout = function(event) {
    if (event.target.closest('.slider-picture')) { process_mouseout(); }
  };



  // Не работает в Google Chrom 
  _options.placeholder.ontransitionstart = function(event) {
    if (mode == 'preset2') {mode = 'preset3'; };
    transitionCount++;
  }
  
  _options.placeholder.ontransitionend = function(event) {
	  event.target.style.transition = "";
	  transitionCount--;

    if (transitionCount==0){
      if (mode == 'preset3'){mode = 'show'} else {mode = 'preset';}
      if (playing&&!paused) {
        setTimeout(function(){
          if (playing&&!paused) {goNext()};  
	      }, _options.duration);
	    }
    };
  };



}
