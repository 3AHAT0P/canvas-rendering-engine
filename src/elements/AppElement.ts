import { computed, ref } from '@vue/reactivity';

import {
  type AbsolutePosition, type Size, 
  BaseRenderInstruction, BaseRenderOperations,
  buildRelativePosition,
} from '@CRE';

import { CRElement } from './Element';
import { RectOptions, RectangleElement } from './RectangleElement';

interface AppElementOptions {
  position: AbsolutePosition;
  size: Size;
}

export const AppElement: CRElement<AppElementOptions> = (options: AppElementOptions) => {
  const symbol = Symbol('APP');

  const buildChildPosition = buildRelativePosition(options.position, options.size);
  const childRectSize: Size = {
    x: 10,
    y: 10,
  };
  const childRectBorder = <const>{
    color: 'red',
    size: 0,
  };

  let indexX = 0;
  let indexY = 0;
  let direction: 'right' | 'down' | 'left' | 'up' = 'right';

  const dx = 10;
  const dy = 10;

  const rectanglePosition = ref<AbsolutePosition>(buildChildPosition(indexX + childRectBorder.size / 2, indexY + childRectBorder.size / 2));
  setInterval(() => {
    switch (direction) {
      case 'right': {
        indexX += dx;
        if (indexX + childRectSize.x + childRectBorder.size + dx >= options.size.x) direction = 'down';
        break;
      }
      case 'down': {
        indexY += dy;
        if (indexY + childRectSize.y + childRectBorder.size + dy >= options.size.y) direction = 'left';
        break;
      }
      case 'left': {
        indexX -= dx;
        if (indexX <= 0) direction = 'up';
        break;
      }
      case 'up': {
        indexY -= dy;
        if (indexY <= 0) direction = 'right';
        break;
      }
    }
    rectanglePosition.value = buildChildPosition(indexX + childRectBorder.size / 2, indexY + childRectBorder.size / 2);
  }, 20);

  const rectangleChildOptions = computed<RectOptions>(() => {
    return {
      position: rectanglePosition.value,
      size: childRectSize,
      color: 'red'
    };
  });

  const [rectSymbol, renderRectDSL] = RectangleElement(rectangleChildOptions);

  const buildRenderingInstructions = (): BaseRenderInstruction[] => {
    const instructions: BaseRenderInstruction[] = [
      BaseRenderOperations.drawChild(rectSymbol, renderRectDSL()),
    ];
    return instructions;
  };

  return <const>[symbol, buildRenderingInstructions];
}
