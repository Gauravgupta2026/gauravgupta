export function crossesDownward(previousY: number, currentY: number, lineY: number) {
  return previousY < lineY && currentY >= lineY;
}
