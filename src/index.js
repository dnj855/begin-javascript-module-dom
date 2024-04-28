class Board {
  static COLORS = ['#ff4500', '#00cc78', '#2450a5', '#fed734', '#f9fafc'];
  static BOARD_SIZE = [25, 25];
  static PIXEL_SIZE = 20;
  static TIME_TO_WAIT = 5000;

  constructor() {
    this.colorPicker = new ColorPicker(Board.COLORS, Board.COLORS[0]);
    this.warning = new Warning();
  }

  init() {
    this.colorPicker.init();
    this.warning.init();
    this.board = document.querySelector('#board');
    this.board.style.gridTemplateColumns = `repeat(${Board.BOARD_SIZE[0]}, ${Board.PIXEL_SIZE}px)`;
    this.initPixels();
    this.timeLeft = document.querySelector('#time-left');
  }

  initPixels() {
    for (let i = 0; i < Board.BOARD_SIZE[0] * Board.BOARD_SIZE[1]; i++) {
      const pixel = new Pixel(Board.COLORS[Board.COLORS.length - 1]);
      pixel.element.addEventListener('click', () => {
        this.onPixelClick(pixel);
      });
      this.board.append(pixel.element);
    }
  }

  onPixelClick(pixel) {
    if (
      this.lastPixelAddedDate &&
      new Date() - this.lastPixelAddedDate < Board.TIME_TO_WAIT
    ) {
      this.warning.showWarning();
      return;
    }
    pixel.color = this.colorPicker.currentColor;
    this.lastPixelAddedDate = new Date();
    this.toggleTimeLeft();
  }

  toggleTimeLeft() {
    let i = Board.TIME_TO_WAIT / 1000;
    this.timeLeft.innerText = `${i}s`;
    const intervalId = setInterval(() => {
      i--;
      if (i > 0) {
        this.timeLeft.innerText = `${i}s`;
      } else {
        this.timeLeft.innerText = '';
        clearInterval(intervalId);
      }
    }, 1000);
  }
}

class Pixel {
  static PIXEL_CLASS = 'pixel';
  static PIXEL_PICKER_CLASS = 'pixel-picker';

  constructor(color) {
    this._color = color;
    this.element = document.createElement('div');
    this.element.style.background = color;
    this.element.classList.add(Pixel.PIXEL_CLASS);
  }

  get color() {
    return this._color;
  }

  set color(newColor) {
    this._color = newColor;
    this.element.style.backgroundColor = newColor;
  }
}

class ColorPicker {
  constructor(colors, currentColor) {
    this.colors = colors;
    this.currentColor = currentColor;
    this.pixels = [];
  }

  init() {
    this.element = document.querySelector('#color-picker');

    for (const color of this.colors) {
      const pixel = new Pixel(color);
      this.pixels.push(pixel);
      pixel.element.classList.add(Pixel.PIXEL_PICKER_CLASS);
      if (color === this.currentColor) {
        pixel.element.classList.add('active');
      }
      pixel.element.addEventListener('click', () => {
        this.onColorPickerClick(pixel.color);
      });
      this.element.appendChild(pixel.element);
    }
  }

  onColorPickerClick(color) {
    this.currentColor = color;
    for (const pixel of this.pixels) {
      pixel.element.classList.toggle('active', pixel.color === this.currentColor);
    }
  }
}

class Warning {
  init() {
    this.element = document.querySelector('#warning');
  }

  showWarning() {
    this.element.classList.remove('hidden');
    setTimeout(() => {
      this.element.classList.add('hidden');
    }, 4000);
  }
}

const game = new Board();
game.init();
