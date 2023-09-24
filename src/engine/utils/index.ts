import type { AbsolutePosition, Size, RelativePositionCorner } from '../@types';

export const buildAbsolutePosition = (x: number, y: number): AbsolutePosition => {
  return {
    type: 'absolute',
    x, y,
  };
};

export const buildRelativePosition = (parentBlockPosition: AbsolutePosition, parentBlockSize: Size) => {
  return (dx: number, dy: number, corner: RelativePositionCorner = 'left-top'): AbsolutePosition => {
    const childAbsolutePosition: AbsolutePosition = buildAbsolutePosition(parentBlockPosition.x, parentBlockPosition.y);

    switch (corner) {
      case 'left-top': {
        childAbsolutePosition.x += dx;
        childAbsolutePosition.y += dy;
        break;
      }
      case 'left-bottom': {
        childAbsolutePosition.x += dx;
        childAbsolutePosition.y += parentBlockSize.y;
        childAbsolutePosition.y -= dy;
        break;
      }
      case 'right-bottom': {
        childAbsolutePosition.x += parentBlockSize.x;
        childAbsolutePosition.x -= dx;
        childAbsolutePosition.y += parentBlockSize.y;
        childAbsolutePosition.y -= dy;
        break;
      }
      case 'right-top': {
        childAbsolutePosition.x += parentBlockSize.x;
        childAbsolutePosition.x -= dx;
        childAbsolutePosition.y += dy;
        break;
      }
    }

    return childAbsolutePosition;
  };
};
