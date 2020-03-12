let tc = 0;
let secs = 0;
let wpm = 0;

let started = false;

let inputArea;

let textList;

let wantedText = "";

let chosen = 0;

let iaText = "";

let toggleButton;
let resetButton;

let typedText = "";

function setup() {
  
  createCanvas(400, 400);
  
  inputArea = createInput();
  
  inputArea.input(inputChanged);
  
  toggleButton = createButton('toggle');
  toggleButton.mousePressed(buttonClick);
  
  resetButton = createButton('reset');
  resetButton.mousePressed(() => {
    tc = 0;
    wpm = 0;
    secs = 0;
    inputArea.value('');
    canType = true;
  });
  
  wantedText = random(["Scythe Possuelo couldn't hide his distaste.  \"They're no better than the sharks that devouwered the Grandslayers.\""]);
  
}

let lastValue = 0;

function checkStartTimer() {
  let val = false;
  if(inputArea.value() < lastValue) {
     
  }
}

function inputChanged() {
  if(canType == false) {
    inputArea.value(iaText);
  } else {
    iaText = inputArea.value();
    typedText = inputArea.value();
  }
  started = true
}

function buttonClick() {
  
  started = !started;
  
}

let canType = true;

function draw() {
  
  if(started == true) {
    tc += 1;

    if(tc >= 60) {
      secs += 1;
      tc = 0;
    }
    
    if(secs >= 5 || wantedText.length == typedText.length) {
      started = false;
      canType = false;
      wpm = ((split(typedText, " ").length / secs)*60);
    }
    
  }
  
  background(255);
  
  textSize(32);
  
  text(`${secs} - ${wpm}`, 250, 300);
  
  let currentWidth = 0;
  let lineLength = 1;
  let writtenLetters = 0;
  
  for(let i = 0; i != wantedText.length; i++) {
    
    if(iaText.charAt(i) == wantedText.charAt(i)) {
      stroke('green');
      fill('green');
    } else {
      if(iaText.charAt(i) == "") {stroke('black'); fill('black');} else {
        stroke('red');
        fill('red');
      }
    }
    
    if(writtenLetters >= 25) {
      lineLength += 1;
      currentWidth = 0;
      writtenLetters = 0;
    }
    
    text(wantedText[i], currentWidth, lineLength*25);
    writtenLetters += 1;
    
    currentWidth += textWidth(wantedText[i]);
    
  }
  
}