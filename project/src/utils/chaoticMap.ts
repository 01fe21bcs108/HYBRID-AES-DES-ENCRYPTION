// Logistic Map implementation for chaotic key generation
export const logisticMap = (x: number, r: number, iterations: number): number[] => {
  const sequence: number[] = [];
  let currentX = x;

  for (let i = 0; i < iterations; i++) {
    currentX = r * currentX * (1 - currentX);
    sequence.push(currentX);
  }

  return sequence;
};

// Convert chaotic sequence to encryption key
export const generateKeyFromChaos = (sequence: number[], length: number): string => {
  const key = sequence
    .map(x => Math.floor(x * 256))
    .map(x => x.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, length * 2);
  
  return key;
};