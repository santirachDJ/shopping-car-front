export const findElement = (wrapper, element) => {
  return wrapper.find(element).first()
}

export const findElementAll = (wrapper, element) => {
  return wrapper.find(element)
}

export const findClassInElement = (wrapper, element, class_) => {
  return findElement(wrapper, element).hasClass(class_)
}

export const findElementExist = (wrapper, element) => {
  return findElement(wrapper, element).exists()
}


