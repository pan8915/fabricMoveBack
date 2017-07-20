$(document).ready(function() {
  var field = document.getElementById('field');
  var f = field.getContext('2d');
  var fabrics = {};
  var starIndex = 0;
  var numFabrics = 0;
  var acceleration = 1;
  var mouseX = 0;
  var mouseY = 0;


  var images = ['sontte1.png', 'sontte2.png', 'sontte3.png', 'sontte4.png', 'sontte5.png', 'sontte6.png', 'sontte7.png', 'sontte8.png', 'sontte9.png', 'sontte10.png',
  'sontte11.png', 'sontte12.png', 'sontte13.png', 'sontte14.png', 'sontte15.png',
  'sontte16.png', 'sontte17.png', 'sontte18.png', 'sontte19.png', 'sontte20.png', 'sontte21.png', 'sontte22.png', 'sontte23.png', 'sontte24.png', 'sontte25.png',
  'sontte26.png', 'sontte27.png', 'sontte28.png', 'sontte29.png', 'sontte30.png', 'sontte31.png', 'sontte32.png', 'sontte33.png', 'sontte34.png', 'sontte35.png',
  'sontte36.png', 'sontte37.png', 'sontte38.png', 'sontte39.png'
  ];

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  field.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(field, evt);
    mouseX = mousePos.x;
    mouseY = mousePos.y;
  }, false);

  function Fabric(image) {
    this.X = field.width / 2;
    this.Y = field.height / 2;

    this.SX = Math.random() * 10 - 5;
    this.SY = Math.random() * 10 - 5;

    var start = 0;

    this.W = 80;
    this.H = 80;

    this.image = image;

    starIndex++;
    fabrics[starIndex] = this;

    this.ID = starIndex;
  }

  Fabric.prototype.Reset = function() {
    this.X = field.width / 2;
    this.Y = field.height / 2;
  }
  Fabric.prototype.Draw = function() {

    if (mouseX > this.X && mouseX < this.X+this.W && mouseY > this.Y && mouseY < this.Y+this.H) {
      var img = new Image();
      img.src = this.image;
      f.drawImage(img, this.X, this.Y, this.W+250, this.H+250);
    } else {
      this.X += this.SX;
      this.Y += this.SY;

      if (this.X < 0 || this.X + this.W > field.width || this.Y  < 0 || this.Y + this.H > field.height) {
        this.SX = -this.SX;
        this.SY = -this.SY;
        // this.Reset();
      }
      var img = new Image();
      img.src = this.image;
      console.log(this.X + ":::" + this.Y);
      f.drawImage(img, this.X, this.Y, this.W, this.H);
    }

  }

  field.width = window.innerWidth;
  field.height = window.innerHeight;

  function drawScreen() {
    if (field.width != window.innerWidth)
      field.width = window.innerWidth;
    if (field.height != window.innerHeight)
      field.height = window.innerHeight;

    f.fillStyle = 'rgba(255, 255, 255, 1)';
    f.fillRect(0, 0, field.width, field.height);

    for (var fabric in fabrics) {
      fabrics[fabric].Draw();
    }
  }

  var initFabrics = function() {
    for (var i = 0; i < images.length; i++) {
      console.log("load fabric" + i);
      new Fabric('image/' + images[i]);
    }
  }

  initFabrics();

  setInterval(drawScreen, 60);
});
