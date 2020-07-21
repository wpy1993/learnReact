class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type)
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }
  appendChild(vChild) {
    vChild.mountTo(this.root)
  }
  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content)
  }
  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

export class Component {
  constructor() {
    this.children = []
  }
  setAttribute(name, value) {
    this[name] = value
  }
  mountTo(parent) {
    let vdom = this.render()
    vdom.mountTo(parent)
  }
  appendChild(vChild) {
    this.children.push(vChild)
  }
}


export let ToyReact = {
  createElement(type, attributes, ...children) {
    // let element = document.createElement(type)
    // // debugger;
    // for(let name in attributes) {
    //   element.setAttribute(name, attributes[name])
    // }
    // for(let child of children) {
    //   if (typeof child === 'string') {
    //     child = document.createTextNode(child)
    //   }
    //   element.appendChild(child)
    // }

    let element
    if(typeof type === 'string') {
      element = new ElementWrapper(type)
    } else {
      element = new type // 把传进来的class实例化一下
    }
    for(let name in attributes) {
      element.setAttribute(name, attributes[name])
    }
    // for(let child of children) {
    //   if (typeof child === 'string') {
    //     child = new TextWrapper(child)
    //   }
    //   element.appendChild(child)
    // }

    let insertChildren = (children) => {
      for(let child of children) {
       if (typeof child ==='object' && child instanceof Array) {
         insertChildren(child)
       } else {
         if (typeof child === 'string') {
           child = new TextWrapper(child)
         }
        if (!(child instanceof Component)
          && !(child instanceof ElementWrapper)
          && !(child instanceof TextWrapper)) {
          child = String(child)

          }
         element.appendChild(child)
       }
      }
    }
    insertChildren(children)

    return element
  },
  render(vdom, element) {
    vdom.mountTo(element)
  }
}