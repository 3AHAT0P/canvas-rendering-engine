import { type Ref, ref } from '@vue/reactivity';

import { BaseRenderInstruction } from '../engine/BaseRenderInstruction';
import { BaseRenderOperations } from '../engine/BaseRenderOperations';

import { CRElement } from './Element';

export type RectOptions = {
  position: {
    type: 'absolute';
    x: number;
    y: number;
  };
  size: {
    x: number;
    y: number;
  };
  color?: string;
  border?: {
    color: string;
    size: number;
  };
};

export const RectangleElement: CRElement<Ref<RectOptions>> = (nodeOptions: Ref<RectOptions>) => {
  const rectSymbol = Symbol('RECT');

  let index = 0;
  const bgColor = ref<string>(`hsl(${++index % 360}, 50%, 50%)`);
  setInterval(() => {
    bgColor.value = `hsl(${++index % 360}, 50%, 50%)`;
  }, 100);

  const renderRectDSL = (): BaseRenderInstruction[] => {
    let instructions: BaseRenderInstruction[] = [
      BaseRenderOperations.drawRect(nodeOptions.value.position.x, nodeOptions.value.position.y, nodeOptions.value.size.x, nodeOptions.value.size.y),
    ];
    if (bgColor.value != null) {
      instructions.push(BaseRenderOperations.fill(bgColor.value));
    }
    if (nodeOptions.value.border != null) {
      instructions.push(BaseRenderOperations.stroke(nodeOptions.value.border.color, nodeOptions.value.border.size));
    }
    return instructions;
  };

  return <const>[rectSymbol, renderRectDSL];
}