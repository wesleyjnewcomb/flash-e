function immutableSwap(array, index1, index2) {
  const newArray = array.slice()
  newArray[index1] = array[index2]
  newArray[index2] = array[index1]
  return newArray
}

export default immutableSwap
