export interface AbsolutePosition {
  type: 'absolute';
  x: number;
  y: number;
}

export interface Size {
  x: number;
  y: number;
}

export type RelativePositionCorner = 'left-top' | 'left-bottom' | 'right-bottom' | 'right-top';
