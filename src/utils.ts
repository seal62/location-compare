export const getMapTilerKey = () =>
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_MAP_TILER_PROD
    : process.env.REACT_APP_MAP_TILER_DEV;

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
