function closestForIe(css) {
  let node = this;

  while (node) {
    if (node.matches(css)) return node;
    node = node.parentElement;
  }
  return null;
}


export default closestForIe;
