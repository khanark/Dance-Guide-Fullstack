const getUser = () => {
  const user = localStorage.getItem('userData');
  if (user === undefined) {
    return false;
  } else {
    return JSON.parse(user);
  }
};

const setUser = user => {
  localStorage.setItem('userData', JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem('userData');
};

export { getUser, setUser, removeUser };
