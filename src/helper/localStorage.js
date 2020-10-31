// setter
export const setItemInLocalStorage = (itemName, itemValue) => {
  localStorage.setItem(itemName, itemValue);
};

// getter
export const getItemFromLocalStorage = (itemName) => {
  return localStorage.getItem(itemName);
};

// remove
export const removeItemFromLocalStorage = (itemName) => {
  localStorage.removeItem(itemName);
};

// clear
export const clearLocalStorage = () => {
  localStorage.clear();
};
