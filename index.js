const game = new Phaser.Game(600, 400, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

  this.load.image('strawberry', './assets/strawberry.jpg');
  this.load.image('button', './assets/button.png')
}

let columns = [];
let button;
let group;

function create() {

  this.stage.backgroundColor = '#0072bc';

  group = game.add.group()

  for (let i = 0; i < 5; i++) {
    columns[i] = game.add.group();
    for (let j = 0; j < 40; j++) {
      const image = columns[i][j] = group.create(i * 110, 200 + j * -100, 'strawberry');
      image.scale.set(0.15);
      image.anchor.set(-0.3, -0.2)
      columns[i].add(image);
      }
      const mask = game.add.graphics(0, 0);
      mask.beginFill(0xffffff);
      mask.drawRect(i * 115, 15, 110, 300);
      columns[i].mask = mask;
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
      button.inputEnabled = false; // отключение курсора
      button.setCursor('default') // стиль курсора по дефолту
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
        button.setCursor('pointer')
      }, 2000)
    }
  }

}

function update() {

}