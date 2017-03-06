'use strict';

class _dom {
  constructor(clsName) {
    this.clsName = clsName;
  }

  init() {
    let self = this;
    let domRoot = document.createElement("div");
    domRoot.id = "root";
    domRoot.className = self.clsName;
    document.body.appendChild(domRoot);
  }

  root(clsName) {
    this.init();
    return document.querySelector("#root");
  }
}


export {_dom as Dom};
