import SnakeDirection from '../models/snake/snake-direction';

export type KeyPressedHandler = (key: string, code: string) => void;
export type SnakeDirectionChangedHandler = (direction: SnakeDirection) => void;

const keyboardHandlers: Map<string, KeyPressedHandler> = new Map<
  string,
  KeyPressedHandler
>();

document.addEventListener('keydown', (event: KeyboardEvent) => {
  keyboardHandlers.forEach((handler) => handler(event.key, event.code));
});

const addDirectionKeyPressedEventHandler = (
  handlerName: string,
  handler: SnakeDirectionChangedHandler
) => {
  keyboardHandlers.set(handlerName, (key: string, code: string) => {
    console.log(`key: ${key}; code: ${code}`);
    if (key === 'ArrowUp') {
      handler(SnakeDirection.Up);
    } else if (key === 'ArrowDown') {
      handler(SnakeDirection.Down);
    } else if (key === 'ArrowLeft') {
      handler(SnakeDirection.Left);
    } else if (key === 'ArrowRight') {
      handler(SnakeDirection.Right);
    }
  });
};

export default { addDirectionKeyPressedEventHandler };
