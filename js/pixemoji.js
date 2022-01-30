/**
 * @fileoverview This is a file where name checks are disabled.
 * @suppress {name}
 */

function cloneCells(el) { // gets content of canvas to duplicate elsewhere as array of elements
var el = el || document.getElementById('canvas');
var cells = el.childNodes;
var gridSize = Math.sqrt(cells.length);
var output = [];
for(var i=0;i<cells.length;i++) {
  if(i!=0 && i%gridSize == 0) {
    output.push(document.createElement('br'));
  }
  var newCell = document.createElement('span');
  newCell.className = 'share-modal-cell';
  newCell.appendChild(cells[i].firstChild.cloneNode(true));
  output.push(newCell);
}
return output;
}

function copyCells(el) { // gets all emoji as a grid in container el
var el = el || document.getElementById('canvas');
var space = '⬜';
var cells = el.childNodes;
var gridSize = Math.sqrt(cells.length);
var output = "";
for(var i=0;i<cells.length;i++) {
  if(i!=0 && i%gridSize == 0) {
    output += "\n";
  }
  if(cells[i].dataset.emoji == "null") {
    output += space;
  }
  else {
    output += String.fromCodePoint(parseInt(cells[i].dataset.emoji, 16)); // unicodeToChar( cells[i].dataset.emoji );
  }
}
return output;
}
function cellDraw(el) {
if(usingSVG) {
  el.textContent = '';
  el.insertAdjacentHTML('beforeend','<svg viewBox="0 0 22 22"><use xlink:href="#'+activeEmoji.unicode+'"></use></svg>');
}
else {
  el.textContent = activeEmoji.character;
}
el.dataset.emoji = activeEmoji.unicode;
}
function cellErase(el) {
var wasActiveEmoji = activeEmoji;
activeEmoji = blankEmoji;
if(shouldFill) {
  cellFill(el);
}
else {
  cellDraw(el);
}
activeEmoji = wasActiveEmoji;
}
function cellOver(el) {
if(drawingEnabled && !shouldFill) {
  if(shouldErase) {
    cellErase(el);
  }
  else {
    cellDraw(el);
  }
}
}
function cellUp(el) {
if(shouldErase) {
  cellErase(el);
}
else if(shouldFill) {
  cellFill(el);
}
else {
  cellDraw(el);
}
}

function cellFill(el) {
var val = el.dataset.emoji;
if(val===activeEmoji.unicode) { return; }
var x, y, north, east, south, west;
var q = [];
cellDraw(el);
q.push(el);
while(q.length>0) {
  el = q.shift();
  x = parseInt(el.dataset.x)-1;
  y = el.dataset.y;
  west = document.getElementById("cell-"+x+"-"+y);
  if(west!==null && west.dataset.emoji===val) {
    cellDraw(west);
    q.push(west);
  }
  x = parseInt(el.dataset.x)+1;
  y = el.dataset.y;
  east = document.getElementById("cell-"+x+"-"+y);
  if(east!==null && east.dataset.emoji===val) {
    cellDraw(east);
    q.push(east);
  }
  x = el.dataset.x;
  y = parseInt(el.dataset.y)-1;
  north = document.getElementById("cell-"+x+"-"+y);
  if(north!==null && north.dataset.emoji===val) {
    cellDraw(north);
    q.push(north);
  }
  x = el.dataset.x;
  y = parseInt(el.dataset.y)+1;
  south = document.getElementById("cell-"+x+"-"+y);
  if(south!==null && south.dataset.emoji===val) {
    cellDraw(south);
    q.push(south);
  }
}
}

function initCanvas(el, config) {
var size = config.size || 12;
for(var i=0;i<size;i++) {
  for(var j=0;j<size;j++) {
    el.insertAdjacentHTML('beforeend',"<div class='cell' data-x='"+j+"' data-y='"+i+"' data-emoji='null' id='cell-"+j+"-"+i+"'' onmousedown='cellOver(this)' onmousemove='cellOver(this)' onmouseup='cellUp(this)'> </div>");
  }
}
}

function initFillCanvas(el) {
var wasActiveEmoji = activeEmoji;
activeEmoji = blankEmoji;
cellFill(el.firstChild);
activeEmoji = wasActiveEmoji;
}

function setActiveEmoji(emoji){
	activeEmoji = emoji; 
}

var activeEmoji = {
unicode: '1f7e9',
character: '🟩'
};
var blankEmoji = {
unicode: '2b1c',
character: '⬜'
};
var drawingEnabled = false;
var usingSVG = false;
var shouldFill = false;
var shouldErase = false;

window.onload = function () {
	
document.getElementById('paint-set-green').className = 'icon-color selected'; 
	
document.getElementById('paint-set-black').addEventListener('click', function(e) { 
	setActiveEmoji({unicode:'2b1b',character:'⬛'}); 
	while(el = document.querySelector('.icon-color.selected')){ 
		el.className = "icon-color"; 
	}
	e.target.className = "icon-color selected"; 
	return false; 
}); 

document.getElementById('paint-set-white').addEventListener('click', function(e) { 
	setActiveEmoji({unicode:'2b1c',character:'⬜'}); 
	while(el = document.querySelector('.icon-color.selected')) { 
		el.className = "icon-color"; 
	}
	e.target.className = "icon-color selected"; 
	return false; 
}); 

document.getElementById('paint-set-red').addEventListener('click', function(e) { 
	setActiveEmoji({unicode:'1f7e5',character:'🟥'});
	while(el = document.querySelector('.icon-color.selected')) { 
		el.className = "icon-color"; 
	}
	e.target.className = "icon-color selected"; 	
	return false; 
}); 

document.getElementById('paint-set-orange').addEventListener('click', function(e) { 
	setActiveEmoji({unicode:'1f7e7',character:'🟧'}); 
	while(el = document.querySelector('.icon-color.selected')) { 
		el.className = "icon-color"; 
	}
	e.target.className = "icon-color selected"; 
	return false; 
});

document.getElementById('paint-set-yellow').addEventListener('click', function(e) { 
	setActiveEmoji({unicode:'1f7e8',character:'🟨'}); 
	while(el = document.querySelector('.icon-color.selected')) { 
		el.className = "icon-color"; 
	}
	e.target.className = "icon-color selected"; 
	return false; 
});

document.getElementById('paint-set-green').addEventListener('click', function(e) { 
	setActiveEmoji({unicode:'1f7e9',character:'🟩'}); 
	while(el = document.querySelector('.icon-color.selected')) { 
		el.className = "icon-color"; 
	}
	e.target.className = "icon-color selected"; 
	return false; 
});

document.getElementById('paint-set-blue').addEventListener('click', function(e) { 
	setActiveEmoji({unicode:'1f7e6',character:'🟦'}); 
	while(el = document.querySelector('.icon-color.selected')) { 
		el.className = "icon-color"; 
	}
	e.target.className = "icon-color selected"; 
	return false; 
});

document.getElementById('paint-set-purple').addEventListener('click', function(e) { 
	setActiveEmoji({unicode:'1f7ea',character:'🟪'}); 
	while(el = document.querySelector('.icon-color.selected')) { 
		el.className = "icon-color"; 
	}
	e.target.className = "icon-color selected"; 
	return false; 
});


document.getElementById('control-toggle-grid').addEventListener('click', function(e) {
  if(document.getElementById('canvas').className === 'noGridLines') {
    // grid was off
    document.getElementById('canvas').className = '';
    e.target.className = 'icon-grid_on';
  }
  else {
    document.getElementById('canvas').className = 'noGridLines';
    e.target.className = 'icon-grid_off';
  }
  return false;
});

document.getElementById('control-set-paint').addEventListener('click', function(e) {
  if(shouldFill == true) {
    shouldFill = false;
    e.target.className = 'icon-edit';
    document.getElementById('control-set-fill').className = 'icon-fill inactive';
  }
  return false;
});

document.getElementById('control-set-fill').addEventListener('click', function(e) {
  if(shouldFill == false) {
    shouldFill = true;
    e.target.className = 'icon-fill';
    document.getElementById('control-set-paint').className = 'icon-edit inactive';
  }
  return false;
});

document.getElementById('control-toggle-erase').addEventListener('click', function(e) {
  if(shouldErase == true) {
    shouldErase = false;
    e.target.className = 'icon-delete inactive';
  }
  else {
    shouldErase = true;
    e.target.className = 'icon-delete';
  }
  return false;
});

document.getElementById('share-button').addEventListener('click', function(e) {
  e.preventDefault();
  var canvas = document.getElementById('canvas');

  var artHTML = cloneCells(canvas);

  // copy HTML content into share modal
  var shareCanvas = document.getElementById('share-modal-content');
  emptyNode(shareCanvas);

  while(artHTML.length > 0) {
    shareCanvas.appendChild( artHTML.shift() );
  }

  var art = copyCells();

  document.getElementById('hidden-textarea').value = ''+art+"\n\n#NotaWordle, Just Art";

  var twitterButton = document.getElementById('twitter-share');
  emptyNode(twitterButton);
  twttr.widgets.createShareButton(
    '/',
    twitterButton,
    {
      count: 'none',
      text: ''+art+"\n\n"+'#NotaWordle, Just Art'+"\n",
      size: 'large'/*,
      via: 'm0nt0y4'*/
    }).then(function (el) {
    });

  document.getElementById('share-modal').className = 'modal active';

  return false;
});

/*
document.getElementById('facebook-share').addEventListener('click', function(e) {
  e.preventDefault();
  FB.ui(
    {
      method: 'share',
      href: location.href,
      quote: ''+document.getElementById('hidden-textarea').value,
      hashtag: '#art'
    },
    // callback
    function(response) {}
  );
  return false;
}); */

new ClipboardJS('#copy-to-clipboard');

document.getElementById('copy-to-clipboard').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('copy-to-clipboard').dataset.tooltip = 'Copied!';
  return false;
});

document.getElementById('copy-to-clipboard').addEventListener('mouseleave', function() {
  document.getElementById('copy-to-clipboard').dataset.tooltip = 'Copy to clipboard';
});

var shareModalCloseButtons = document.getElementsByClassName('share-modal-close');
for(var i = 0;i < shareModalCloseButtons.length;i++) {
  var el = shareModalCloseButtons[i];
  el.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('share-modal').className = 'modal';
    return false;
  });
}

document.addEventListener('mousedown',function(e) {
  drawingEnabled = true;
});
document.addEventListener('mouseup',function(e) {
  drawingEnabled = false;
});
window.addEventListener('blur',function() {
  drawingEnabled = false;
});
var emojiCanvasConfig = {
  size: 10
};
initCanvas(document.getElementById('canvas'), emojiCanvasConfig);

initFillCanvas(document.getElementById('canvas')); // fill with white squares
//var picker = new EmojiPanel(emojiPanelConfig);
/*
picker.addListener('select', function(emoji) {
  activeEmoji = emoji;
}); */
};