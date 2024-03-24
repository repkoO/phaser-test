const game = new Phaser.Game(600, 400, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

  this.load.image('strawberry', './assets/strawberry.jpg');
  this.load.image('button', './assets/button.png')
}

let columns = [];
let button;
let group;
let gameCanvas;

function create() {

  gameCanvas = game.canvas;

  this.stage.backgroundColor = '#0072bc';

  group = game.add.group()

  for (let i = 0; i < 5; i++) {
    columns[i] = game.add.group();
    for (let j = 0; j < 40; j++) {
      const image = columns[i][j] = columns[i].create(0, 240 + j * -100, 'strawberry'); // ??? разобраться с кодом
      image.anchor.set(0.5, 0.5)
      image.scale.set(0.15);
      // columns[i].align(1, 40, 100, 100)
      }
      const mask = game.add.graphics(0, 0);
      mask.beginFill(0xffffff);
      mask.drawRect((i * 115), 20, 115, 280);
      // columns[i].mask = mask;
      group.add(columns[i]);
      group.align(5, 40, 120, 110);
    }

// Создаем кнопку

  button = game.add.button(250, 350, 'button', spinSlot, this, 1, 2, 0);
  button.scale.set(0.2)

// Вращение слотов

  let isAnimationRunning = false;

  function spinSlot() {
    if (isAnimationRunning) { // остановка через 2 секунды после нажатия
      setTimeout(() => {
        columns.forEach((column) => {
            column.tween.stop();
        });
        isAnimationRunning = false;
      }, 2000);
    } else {
        button.events.onInputOver.add(function() { //листенер состояния кнопки для стиля
          gameCanvas.style.cursor = 'pointer';
      }, this);
      button.events.onInputOut.add(function() { //листенер состояния кнопки для стиля
          gameCanvas.style.cursor = 'default';
      }, this);
      button.inputEnabled = false; // отключение курсора
      let delay = 0;
      columns.forEach((column) => {
        column.tween = this.add.tween(column).to({ y: 1000 }, 750, "Linear", true, delay, 1, false);
        delay += 100;
        column.tween.repeat(30);
        column.tween.onComplete.add(function() {
          column.tween.stop();
        }, this);
      });
      isAnimationRunning = true;

      setTimeout(() => {
        button.inputEnabled = true; // включение курсора через 2 секунды после запуска анимации
        gameCanvas.style.cursor = 'pointer'
      }, 2000)
    }
  }
}

function update() {

}