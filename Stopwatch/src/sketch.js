var hours = 0;
var mins = 0;
var secs = 0;
var mills = 0;

var dotArr = [];
var minArr = [];
var hourArr = [];

var secIncr = 1;
var secRow = 26;
var minIncr = 1;
var minRow = 20;
var houIncr = 1;
var houRow = 10;

var enabled = true;

var drawColor = 2;
var defaultDrawColor = 2;

var toggleButton;
var setButton;

function scaleHeight(a) {
  return a * height;
}

function scaleWidth(a) {
  return a * width;
}

function setup() {
  createCanvas(400, 400);
  frameRate(60);

  toggleButton = createButton("Toggle");
  toggleButton.position(scaleWidth(0.4), scaleHeight(0.5));
  toggleButton.mousePressed(toggle);

  setButton = createButton("Set Time");
  setButton.position(scaleWidth(0.385), scaleHeight(0.6));
  setButton.mousePressed(setTime);

  draw();

}

function setTime() {
  enabled = false;

  let a = prompt("Time?  hh:mm:ss:ms");

  if (a == null) {
    enabled = true;
    return;
  }

  let split = a.split(':');
  let rev = split.reverse();

  let newMils = rev[0];
  let newSecs = rev[1];
  let newMins = rev[2];
  let newHour = rev[3];

  mills = Number(newMils);
  secs = Number(newSecs);
  mins = Number(newMins);
  hours = Number(newHour);

  justSet = true;

  draw();

  justSet = false;
}

function toggle() {
  enabled = !enabled;
}

var justSet = false;

function keyPressed() {
  if (key == "r") {
    hours = 0;
    mins = 0;
    secs = 0;
    mills = 0;
    dotArr = [];
    minArr = [];
    hourArr = [];
    draw();
  }

  if (key == "q") {

    setTime();

  }

}

function draw() {

  if (drawColor != 0 && drawColor != 1 && drawColor != 2) {
    drawColor = defaultDrawColor;
  }

  background(230);

  if (enabled) {
    if (justSet == false) {
      mills += 14;
    }

    if (Math.floor(mills) >= 1000) {
      secs += secIncr;
      for (let i = 0; i != secIncr; i++) {
        dotArr.push(1);
      }
      mills = 0;
      Number()
    }

    if (secs >= 60) {
      mins += minIncr;
      for (let i = 0; i != minIncr; i++) {
        minArr.push(1);
      }
      dotArr = [];
      secs = 0;
    }

    if (mins >= 60) {
      hours += houIncr;
      for (let i = 0; i != houIncr; i++) {
        hourArr.push(1);
      }
      minArr = [];
      mins = 0;
    }
  }

  textSize(32);
  fill('black');

  let txt = ((hours < 10) ? "0" : "") + hours + "h : " + ((mins < 10) ? "0" : "") + mins + "m : " + ((secs < 10) ? "0" : "") + secs + "s : " + Math.floor(mills) + "ms";

  if (drawColor == 2) {
    fill(mills * 0.5, 200, 255);
    rect(45, 20, (mills / 3), 12);
    fill(secs * 8.33, 200, 255);
    rect(45, 40, (secs * 5.5), 12);
    fill(mins * 8.33, 200, 255);
    rect(45, 60, (mins * 5.5), 12);
    fill(hours * 8.33, 200, 255);
    rect(45, 80, (hours * 5.5), 12);
  }

  fill(0);


  text(txt, scaleWidth(0.1), scaleHeight(0.45));
  text(`Enabled: ${enabled}`, scaleWidth(0.25), scaleHeight(0.35));
  if (drawColor == 1) {
    let c = 0;
    let b = 0;
    for (let i = 0; b != dotArr.length; i++) {
      if (i >= secRow) {
        c++;
        i = 0;
      }
      let isCol = 'red';
      fill(isCol);
      ellipse((15 * i) + 10, (c * 15) + 10, 10, 10);
      b++;
    }

    b = 0;
    c = 1;

    for (let i = 0; b != minArr.length; i++) {
      if (i >= minRow) {
        c++;
        i = 0;
      }

      let isCol = 'green';
      fill(isCol);
      ellipse(10 + (i * 15), 400 - (c * 15), 10, 10);
      b++;

    }

    b = 0;
    c = 1;

    for (let i = 0; b != hourArr.length; i++) {
      if (i >= houRow) {
        c++;
        i = 0;
      }

      let isCol = 'blue';
      fill(isCol);
      ellipse((width - (c * 15)), height - (i * 15) - 20, 10, 10);
      b++;

    }
  }
}