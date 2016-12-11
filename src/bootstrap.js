const increment = () => {
  let i = 0;
  return function () {
    return (i += 1);
  };
};

const text = () => {
  return 'this is a string';
};

export { increment, text };
