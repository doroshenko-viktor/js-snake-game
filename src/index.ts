import _ from "lodash";
import ui from './controllers/ui-controller';
import { FIELD_WIDTH, FIELD_HEIGHT, SNAKE_INIT_LENGTH, GAME_SPEED_MS } from "./configuration/constants";
import { Field } from "./models/field";
import { Snake } from "./models/snake";
import events from "./controllers/keyboard-events-controller";

const app = ui.getAppElement();
const snake = new Snake(SNAKE_INIT_LENGTH);
const field = new Field(FIELD_WIDTH, FIELD_HEIGHT, snake);

events.addDirectionKeyPressedEventHandler('snakeHandler', snake.changeDirection.bind(snake));

run();

async function run() {
    const x = true;
    while (x) {
        await delay(GAME_SPEED_MS);
        field.makeStep();
        ui.renderField(app, field);
    }
}

async function delay(periodMs: number): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, periodMs);
    });
}