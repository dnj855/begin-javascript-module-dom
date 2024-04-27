class Board {
  static COLORS = ['#ff4500', '#00cc78', '#2450a5', '#fed734', '#f9fafc'];
  static BOARD_SIZE = [25, 25];
  static PIXEL_SIZE = 20;
  static TIME_TO_WAIT = 5000;

  constructor() {
    this.colorPicker = new ColorPicker(Board.COLORS, Board.COLORS[0]);
  }

  init() {
    this.board = document.querySelector('#board');
    this.board.style.gridTemplateColumns = `repeat(${Board.BOARD_SIZE[0]}, ${Board.PIXEL_SIZE}px)`;
    this.initPixels();
    this.colorPicker.init();
  }

  initPixels() {
    for (let i = 0; i < Board.BOARD_SIZE[0] * Board.BOARD_SIZE[1]; i++) {
      const pixel = new Pixel(Board.COLORS[Board.COLORS.length - 1]);
      this.board.append(pixel.element);
    }
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
      this.element.appendChild(pixel.element);
    }
  }
}

const game = new Board();
game.init();
