const updateRef = (ref, value) => {
  if (typeof ref === 'function') {
    ref(value);
  } else {
    ref.current = value;
  }
};

export default updateRef;
