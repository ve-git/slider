/*last edited 03.05.2017 10:10 */

function Slider(options) {
  var elem = options.elem;
  var savedItems = []; // saved copies of elements
  var elPicture;
  
  for (var i=0; i < elem.children.length; i++){
    savedItems.push(elem.children[i]);
  }

  render_first();
  render();

/*
  function setElPicture(){
    var clientRect = elem.getClientRects()[0];
    elPicture.style.height = (clientRect.height - clientRect.top - 30)+'px';
    elPicture.style.width = (clientRect.width-20)+'px';
  }    
*/  
  function render_first(){
    elem.innerHTML = '';

    // place for pictures
  	elPicture = document.createElement('div');
    elPicture.className = 'slider-picture';
    elPicture.style.position = "relative";
    elPicture.style.overflow = "auto";
    
    elPicture.style.height = (elem.dataset.height - 30) + 'px';
    
    elPicture.style.width  = (elem.dataset.width) + 'px';
    
    elPicture.style.border = "1px solid #003";

    // new line
  	//var pElem = document.createElement('p');
    
    
    elToolbar = document.createElement('div');
    elToolbar.className = 'slider-toolbar';
    elToolbar.style.position = "relative";
    elToolbar.style.height = '30px';
    elToolbar.style.width  = elPicture.style.width;
    elToolbar.style.border = "1px solid #003";

    
    

    // pseudo-buttons
    var spanBefore = document.createElement('div'); 
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
    //elem.appendChild(pElem); 
    elem.appendChild(elToolbar);
    elToolbar.appendChild(spanBefore); 
    elToolbar.appendChild(spanNbsp); 
    elToolbar.appendChild(spanAfter); 
    
//    setElPicture();
  }
  
  function setBtnStyle(style){
    style.color = "black";
    style.backgroundColor = "#CCCCCC";  ;
    style.left  = "0px";
    style.top   = "5px";
    style.width = "30px";
    style.textAlign = "center";
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
        elem.dataset.currentItem = savedItems.length - 1;
      }
      render();
    }
    if (event.target.closest('.slider-after')) {
      elem.dataset.currentItem = parseInt(elem.dataset.currentItem) + 1;
      
      if (elem.dataset.currentItem == savedItems.length){
        elem.dataset.currentItem = 0;
      }
      render();
    }
    
  };
}
