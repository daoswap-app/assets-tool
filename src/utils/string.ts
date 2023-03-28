export const trunc = (address: string) =>
  address ? address.slice(0, 6) + "..." + address.slice(-6) : null;
