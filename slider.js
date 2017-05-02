/*  */
function Slider(options) {
  var elem = options.elem;
  var savedItems = []; // saved copies of elements
  var elPicture;
  
  for (var i=0; i < elem.children.length; i++){
	savedItems.push(elem.children[i]);
  }

  render_first();
  render();
  
  // setting area for picture placeholder
  function setElPicture(){
    var clientRect = elem.getClientRects()[0];

//alert('clientRect.height = ' + clientRect.height);
    elPicture.style.height = (clientRect.height - clientRect.top - 30)+'px';
    elPicture.style.width = (clientRect.width-20)+'px';
  }    
  
  function render_first(){
    elem.innerHTML = '';

    // place for pictures
  	elPicture = document.createElement('div');
    elPicture.className = 'slider-picture';
    elPicture.style.position = "absolute";
    elPicture.style.overflow = "auto";

    // new line
  	var pElem = document.createElement('p');

    // pseudo-buttons
    var spanBefore = document.createElement('span'); 
    spanBefore.className = 'slider-before';
	  spanBefore.innerHTML = '<<';
    setBtnStyle(spanBefore.style);

	  var spanNbsp =  document.createElement('span');
	  spanNbsp.innerHTML = '&nbsp';
	
	  var spanAfter =  document.createElement('span');
    spanAfter.className = 'slider-after';
	  spanAfter.innerHTML = '>>';

    setBtnStyle(spanAfter.style);
    spanAfter.style.left = "40px" // добавили сдвиг

    elem.appendChild(elPicture);
    elem.appendChild(pElem); 
    elem.appendChild(spanBefore); 
    elem.appendChild(spanNbsp); 
    elem.appendChild(spanAfter); 
    
    setElPicture();
  }
  
  function setBtnStyle(style){
    style.color = "black";
    style.backgroundColor = "#CCCCCC";  ;
    style.width = "30px";
    style.textAlign = "center";
    style.bottom = "10px"
    style.position = "absolute";
    
  }
  
  function render() {
    elPicture.innerHTML = '';
    elPicture.appendChild(savedItems[elem.dataset.currentItem]); 
  }
  
  elem.onclick = function(event) {
    if (event.target.closest('.slider-before')) {
      elem.dataset.currentItem = elem.dataset.currentItem - 1;
      if (elem.dataset.currentItem == -1){
        elem.dataset.currentItem = elem.children.length - 1;
      }
      render();
    }
    if (event.target.closest('.slider-after')) {
      elem.dataset.currentItem = parseInt(elem.dataset.currentItem) + 1;
      if (elem.dataset.currentItem == elem.children.length){
        elem.dataset.currentItem = 0;
      }
      render();
    }
    
  };
  
  window.onresize = function (){
    setElPicture();
  };

}