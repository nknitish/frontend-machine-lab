const { useEffect, useState } = require("react");

const useDebounce = (initVal, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(initVal);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(initVal);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, initVal]);

  return debouncedValue;
};

export { useDebounce };
