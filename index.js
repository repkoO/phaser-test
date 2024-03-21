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
      for (let j = 0; j < 30; j++) {
            const image = columns[i][j] = group.create(i * 110, j * -110, 'strawberry');
            image.scale.set(0.15);
            image.anchor.set(-0.3, -0.2)
            columns[i].add(image);
        }
    }



        // Создаем кнопку

        button = game.add.button(250, 350, 'button', spinSlot, this, 1, 2, 0);
        button.scale.set(0.2)

        // Вращение слотов

        function spinSlot() {

            const mask = game.add.graphics(0, 100);

            mask.drawRect(50, 0, 140, 200);
            mask.drawRect(330, 0, 140, 200);
            mask.drawRect(530, 0, 140, 200);
            mask.drawRect(530, 0, 140, 200);
            mask.drawRect(530, 0, 140, 200);

            group.mask = mask;

            // Применяем анимацию к каждому изображению в контейнере
            columns.forEach(column => {
                column.forEach(image => {
                    // Создаем анимацию движения вверх
                    const tweenUp = this.add.tween(image).to({ y: 1000 }, 300, "Linear", true, 0, -1);
                    tweenUp.start();
        });
    });
        }



}

function update() {

}
