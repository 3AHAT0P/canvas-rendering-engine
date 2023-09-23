import { throwError } from '../utils';

import { BaseRenderInstruction } from './BaseRenderInstruction';

const tick = (cb: () => void) => {
  setTimeout(cb, 16);
  // requestAnimationFrame(cb);
}

export class Renderer {
  private _ctx: CanvasRenderingContext2D;

  private _queueMap: Map<symbol, BaseRenderInstruction[]> = new Map();

  private renderTree: null = null; // for future. all rendered objects should be in this tree. real render should be tree traversal by level

  private _execRenderInstructions(ctx: CanvasRenderingContext2D, instructionList: BaseRenderInstruction[]): void {
    ctx.save();
    ctx.beginPath();
    for (const instruction of instructionList) {
      const operator = instruction[0];
      switch (operator) {
        case 'rect': {
          const [, x, y, width, height] = instruction;
          if (Number.isNaN(x) || Number.isNaN(y) || Number.isNaN(width) || Number.isNaN(height)) throwError(`Incorrect instruction ${instruction.toString()}`);
          ctx.rect(x, y, width, height);
          break;
        }
        case 'fill': {
          const fillStyle = instruction[1];
          if (!(fillStyle ?? false)) throwError(`Incorrect instruction ${instruction.toString()}`);
          ctx.fillStyle = fillStyle;
          ctx.fill();
          break;
        }
        case 'stroke': {
          const strokeStyle = instruction[1];
          const lineWidth = instruction[2];
          if (!(strokeStyle ?? false) || Number.isNaN(lineWidth)) throwError(`Incorrect instruction ${instruction.toString()}`);

          ctx.strokeStyle = strokeStyle;
          ctx.lineWidth = lineWidth;
          ctx.stroke();
          break;
        }
        case 'child': {
          const symbol = instruction[1];
          const instructionList = instruction[2];
          this.addToRenderQueue(symbol, instructionList);
          break;
        }
      }
    }
    ctx.closePath();
    ctx.restore();
  }

  private _render(): void {
    if (this._queueMap.size > 0) {
      for (const instructionList of this._queueMap.values()) {
        this._execRenderInstructions(this._ctx, instructionList);
      }
      this._queueMap.clear();
    }
    tick(this._render);
  }

  public constructor(ctx: CanvasRenderingContext2D) {
    this._ctx = ctx;
    this._render = this._render.bind(this);
  }

  public run() {
    this._render();
  }

  public addToRenderQueue(key: symbol, renderInstructions: BaseRenderInstruction[]): void {
    this._queueMap.set(key, renderInstructions);
  }
}
