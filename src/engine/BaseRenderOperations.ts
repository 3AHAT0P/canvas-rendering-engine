import {
  BaseRenderInstruction,
  DrawChildRenderInstruction,
  DrawRectangleRenderInstruction,
  FillRenderInstruction,
  StrokeRenderInstruction,
} from './BaseRenderInstruction';

export const BaseRenderOperations = <const>{
  drawRect(x: number, y: number, w: number, h: number): DrawRectangleRenderInstruction {
    return ['rect', x, y, w, h];
  },
  fill(color: string): FillRenderInstruction {
    return ['fill', color];
  },
  stroke(color: string, size: number): StrokeRenderInstruction {
    return ['stroke', color, size];
  },
  drawChild(childKey: symbol, childInstructionList: BaseRenderInstruction[]): DrawChildRenderInstruction {
    return ['child', childKey, childInstructionList];
  }
};