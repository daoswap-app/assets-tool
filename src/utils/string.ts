export const trunc = (address: string, firstNum?: number, endNum?: number) =>
  address
    ? address.slice(0, firstNum ?? 6) + "..." + address.slice(-endNum ?? 6)
    : null;
