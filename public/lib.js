function init() {
  _canvas = document.getElementsByTagName('canvas')[0];
  _context = _canvas.getContext('2d');
}

function Ball(obj) {
  this.radius = obj.radius;

  this.x = _canvas.width / 2;
  this.y = _canvas.height - this.radius;

  var dx = obj.speed;
  var dy = obj.speed;

  this.getDx = function() { return dx; };
  this.getDy = function() { return dy; };

  this.reverseDx = function() { dx = -dx; };
  this.reverseDy = function() { dy = -dy; };
}

Ball.prototype = {
  draw: function() {
    this.updatePosition()

    _context.beginPath();
    _context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    _context.fillStyle = '#fff';
    _context.fill();
    _context.closePath();
  },

  updatePosition: function() {
    var newX = this.x + this.getDx();
    if (newX + this.radius > _canvas.width || newX - this.radius < 0) { this.reverseDx(); }
    this.x += this.getDx();

    var newY = this.y - this.getDy();
    if (newY + this.radius > _canvas.height || newY - this.radius < 0) { this.reverseDy(); }
    this.y -= this.getDy();
  }
}

function Paddle(obj) {
  var distanceFromBottom = 10;

  this.height = 10;
  this.width = obj.width;
  this.speed = obj.speed;

  this.x = _canvas.width / 2;
  this.centerFromBottom = _canvas.height - this.height - distanceFromBottom;
}

Paddle.prototype = {
  addListeners: function() {
    document.addEventListener('keydown', this, false);
    document.addEventListener('keyup', this, false);
  },

  canMoveLeft:  function () { return this.x > 0; },
  canMoveRight: function () { return this.x < _canvas.width - this.width; },

  draw: function() {
    this.updatePosition();

    _context.beginPath();
    _context.rect(this.x, this.centerFromBottom, this.width, this.height);
    _context.fillStyle = '#fff';
    _context.fill();
    _context.closePath();
  },

  handleEvent: function(event) {
    switch(event.type) {
      case 'keydown':
        if (event.keyCode == 39) { this.keyRight = true; }
        else if (event.keyCode == 37) { this.keyLeft = true; }
        break;

      case 'keyup':
        if (event.keyCode == 39) { this.keyRight = false; }
        else if (event.keyCode == 37) { this.keyLeft = false; }
        break;
    }
  },

  isMovingLeft:  function() { return this.keyLeft && !this.keyRight; },
  isMovingRight: function() { return this.keyRight && !this.keyLeft; },

  updatePosition: function() {
    if (this.isMovingLeft() && this.canMoveLeft() ) { this.x -= this.speed; }
    else if (this.isMovingRight() && this.canMoveRight() ) { this.x += this.speed; }
  }
}

