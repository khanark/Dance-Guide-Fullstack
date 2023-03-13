const getUser = () => {
  const user = localStorage.getItem('userData');
  console.log(user);
  if (!user) {
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
