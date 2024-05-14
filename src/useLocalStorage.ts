import { useEffect, useState } from "react";
// the logic here..
// Adding generic type to the hook as the initial value will be passed as a T type or a function that will return T type
// we check whether local storage has a value of the key input or the initial state value instead will be the argument passed (initialValue)
// if jsonValue is null then the type of initial value will be checked whether it is a function or not then will be returned
// useEffect hook is used in order to set the new value to the key
// useLocalStorage or useState hook can take the initial value as a callback
function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue == null) {
      if (typeof initialValue === "function") {
        return (initialValue as () => T)();
      } else {
        return initialValue;
      }
    } else {
      return JSON.parse(jsonValue);
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  return [value, setValue] as [T, typeof setValue];
}

export default useLocalStorage;
