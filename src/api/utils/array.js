const removeById = (array, id) => {
  const index = array.findIndex(element => element.id === id);
  const found = index !== -1;

  if (found) {
    array.splice(index, 1);
  }

  return found;
}

const removeDuplicatesById = (array) => {
  const set = new Set();

  return array.filter((element) => {
    if (set.has(element.id)) {
      return false;
    }

    set.add(element.id);
    return true;
  });
}

export default { removeById, removeDuplicatesById };
