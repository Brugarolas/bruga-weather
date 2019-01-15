function* counter() {
  let index = 0;
  while (index < Number.MAX_SAFE_INTEGER) {
    yield index++;
  }
}

export default counter;
