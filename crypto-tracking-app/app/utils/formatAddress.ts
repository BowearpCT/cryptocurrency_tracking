export const truncateAddress = (
  address: string,
  startLength: number = 6,
  endLength: number = 4
) => {
  if (address.length <= startLength + endLength) {
    return address;
  }
  return `${address.substring(0, startLength)}...${address.substring(
    address.length - endLength
  )}`;
};
