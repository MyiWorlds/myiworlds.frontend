const updateKeyValueStringEvent = (name, event) => {
  return { [name]: event.target.value };
};

export default updateKeyValueStringEvent;
