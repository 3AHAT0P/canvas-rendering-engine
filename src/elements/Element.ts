import { BaseRenderInstruction } from '@CRE';

export type CRElementSimple = () => readonly [key: symbol, buildRenderingInstructions: () => BaseRenderInstruction[]];
export type CRElementWithOptions<T> = (options: T) => readonly [key: symbol, buildRenderingInstructions: () => BaseRenderInstruction[]];
export type CRElement<T = any> = CRElementSimple | CRElementWithOptions<T>;