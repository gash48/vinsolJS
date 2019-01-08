/* eslint-disable no-new */
/* eslint-disable func-names */
/* eslint-disable quote-props */
/* eslint-disable prefer-const */
/* eslint-disable array-callback-return */
/* eslint-disable class-methods-use-this */
const DOMSelectors = {
  containerSelector: 'container',
};

const checkBoxValuesJson = {
  color: ['red', 'green', 'yellow', 'blue'],
  drinks: ['coke', 'pepsi', 'dew'],
  movies: ['adhm', 'detachment'],
  bikes: ['harley', 'yamaha', 'r15'],
};

class CheckBoxController {
  constructor(checkBoxValues, DOMAccess) {
    this.checkBoxValues = checkBoxValues;
    this.DOMSelectors = DOMAccess;

    this.initParentCheckboxes();
  }

  initParentCheckboxes() {
    let tempDocFragment = document.createDocumentFragment();
    Object.keys(this.checkBoxValues).map((ele) => {
      let checkBoxContainer = this.createSetElement('div', { 'class': 'checkbox' });
      let label = this.createSetElement('label', { 'for': ele });
      label.textContent = ele;
      let checkBox = this.createSetElement('input', { 'type': 'checkbox', 'id': ele, 'value': ele });
      checkBoxContainer.appendChild(checkBox);
      checkBoxContainer.appendChild(label);
      checkBoxContainer.appendChild(this.initChildCheckBoxes(ele));
      tempDocFragment.appendChild(checkBoxContainer);
    });
    document.getElementById(DOMSelectors.containerSelector).appendChild(tempDocFragment);

    // Adds Parent Checkboxes Event Listeners
    this.initParentEventListeners();
  }

  switchChildCheckboxes(ids, val) {
    ids.map((ele) => {
      document.getElementById(ele).checked = val;
    });
  }

  initChildCheckBoxes(prop) {
    let tempDocFragment = document.createDocumentFragment();
    let listHead = this.createSetElement('ul', { 'id': `${prop}List`, 'class': 'childList' });
    this.checkBoxValues[prop].map((ele) => {
      let childList = this.createSetElement('li');
      let label = this.createSetElement('label', { 'for': ele });
      label.textContent = ele;
      let checkBox = this.createSetElement('input', { 'type': 'checkbox', 'id': ele, 'value': ele });
      childList.appendChild(checkBox);
      childList.appendChild(label);
      tempDocFragment.appendChild(childList);
    });
    listHead.appendChild(tempDocFragment);
    return listHead;
  }

  createSetElement(element, attributes = {}) {
    let createdElement = document.createElement(element);
    Object.keys(attributes).map((key) => {
      createdElement.setAttribute(key, attributes[key]);
    });
    return createdElement;
  }

  initParentEventListeners() {
    Object.keys(this.checkBoxValues).map(() => {
      document.addEventListener('click', e => this.parentCheckboxHandler(e), false);
    });
  }

  parentCheckboxHandler(e) {
    const { checked, value } = e.target;
    const listId = `${value}List`;
    document.getElementById(listId).style.display = checked ? 'block' : 'none';
    this.switchChildCheckboxes(this.checkBoxValues[value], checked);
    document.getElementById(listId).scrollIntoView(false);
  }
}

(function () {
  new CheckBoxController(checkBoxValuesJson, DOMSelectors);
}());
