import { effect, effectScope } from '@vue/reactivity';

import { AppElement } from './elements/AppElement';
import { Renderer } from './engine/Renderer';
import { throwError } from './utils';

import './style.css';

const rootElement = document.querySelector<HTMLDivElement>('#root')!;

const createCanvas = (): [HTMLCanvasElement, CanvasRenderingContext2D] => {
  const canvasElement = document.createElement('canvas');
  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;
  
  const ctx: CanvasRenderingContext2D = canvasElement.getContext('2d', { desynchronized: true }) ?? throwError('Canvas context is null');

  return [canvasElement, ctx];
};


const main = () => {
  const [canvasElement, ctx] = createCanvas();

  rootElement.appendChild(canvasElement);

  const renderer = new Renderer(ctx);

  const scope = effectScope();

  scope.run(() => {
    const [symbol, buildRenderingInstructions] = AppElement(null);

    effect(() => {
      renderer.addToRenderQueue(symbol, buildRenderingInstructions());
    });
  });

  renderer.run();
};

main();