import { computed } from '@vue/reactivity';

import { BaseRenderInstruction } from '../engine/BaseRenderInstruction';
import { BaseRenderOperations } from '../engine/BaseRenderOperations';

import { CRElement } from './Element';
import { RectOptions, RectangleElement } from './RectangleElement';

export const AppElement: CRElement = () => {
  const symbol = Symbol('APP');

  const options = computed<RectOptions>(() => {
    return {
      position: {
        type: 'absolute',
        x: 20,
        y: 20,
      },
      size: {
        x: 100,
        y: 40,
      },
      color: 'red',
      border: {
        color: 'green',
        size: 4,
      },
    };
  });

  const [rectSymbol, renderRectDSL] = RectangleElement(options);


  const buildRenderingInstructions = (): BaseRenderInstruction[] => {
    let instructions: BaseRenderInstruction[] = [
      BaseRenderOperations.drawChild(rectSymbol, renderRectDSL()),
    ];
    return instructions;
  };

  return <const>[symbol, buildRenderingInstructions];
}
