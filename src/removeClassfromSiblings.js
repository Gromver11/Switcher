function removeClassfromSiblings(elem, rc) {
  let sibling = elem;
  while (sibling.previousSibling) {
    sibling = sibling.previousSibling;
    if (sibling.nodeType === 1) { sibling.classList.remove(rc); }
  }

  sibling = elem;
  while (sibling.nextSibling) {
    sibling = sibling.nextSibling;
    if (sibling.nodeType === 1) { sibling.classList.remove(rc); }
  }
}
export default removeClassfromSiblings;
