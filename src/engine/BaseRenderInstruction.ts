export type DrawRectangleRenderInstruction = [operator: 'rect', x: number, y: number, w: number, h: number];
export type FillRenderInstruction = [operator: 'fill', color: string];
export type StrokeRenderInstruction = [operator: 'stroke', color: string, size: number];
export type DrawChildRenderInstruction = [operator: 'child', key: symbol, instructions: BaseRenderInstruction[]];

export type BaseRenderInstruction = DrawRectangleRenderInstruction
  | FillRenderInstruction
  | StrokeRenderInstruction
  | DrawChildRenderInstruction;