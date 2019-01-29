const removeById = (array, id) => {
  const index = array.findIndex(element => element.id === id);
  const found = index !== -1;

  if (found) {
    array.splice(index, 1);
  }

  return found;
}

export default { removeById };
