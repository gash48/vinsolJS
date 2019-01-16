/* eslint-disable indent */
/* eslint-disable object-property-newline */
/* eslint-disable key-spacing */
/* eslint-disable no-restricted-syntax */
/* eslint-disable one-var-declaration-per-line */
/* eslint-disable one-var */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable no-new */
/* eslint-disable func-names */
/* eslint-disable quote-props */
/* eslint-disable array-callback-return */
/* eslint-disable class-methods-use-this */
const DOMSelectors = {
  containerSelector: 'container',
  checkBoxClass: 'checkBoxes',
  childCheckBoxesList: 'childList',
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
    const tempDocFragment = document.createDocumentFragment();
    for (const category of Object.keys(this.checkBoxValues)) {
      const checkBoxContainer = this.createSetElement('div', { 'class': 'checkbox' }),
        label = this.createSetElement('label', { 'for': category }, category),
        checkBox = this.createSetElement('input', {
          type: 'checkbox', id: category,
          value: category, class: this.DOMSelectors.checkBoxClass,
        });

      checkBoxContainer.appendChild(label).appendChild(checkBox);
      checkBoxContainer.appendChild(this.initChildCheckBoxes(category));
      tempDocFragment.appendChild(checkBoxContainer);
    }
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
    const tempDocFragment = document.createDocumentFragment(),
      listHead = this.createSetElement('ul', { 'id': `${prop}List`, 'class': this.DOMSelectors.childCheckBoxesList });
    for (const propValues of this.checkBoxValues[prop]) {
      const childList = this.createSetElement('li'),
        label = this.createSetElement('label', { 'for': propValues }, propValues),
        checkBox = this.createSetElement('input', {
          type: 'checkbox',
          class: this.DOMSelectors.checkBoxClass, id: propValues, value: propValues,
        });
      childList.appendChild(label).appendChild(checkBox);
      tempDocFragment.appendChild(childList);
    }
    listHead.appendChild(tempDocFragment);
    return listHead;
  }

  createSetElement(element, attributes = {}, innerText = '') {
    const createdElement = document.createElement(element);
    Object.keys(attributes).map((key) => {
      createdElement.setAttribute(key, attributes[key]);
    });
    createdElement.textContent = innerText;
    return createdElement;
  }

  initParentEventListeners() {
    Object.keys(this.checkBoxValues).map(() => {
      document.addEventListener('click', e => this.parentCheckboxHandler(e), false);
    });
  }

  parentCheckboxHandler(e) {
    const { checked, value } = e.target,
      listId = `${value}List`,
      parentElement = document.getElementById(listId);

    if (parentElement) {
      parentElement.style.display = checked ? 'block' : 'none';
      this.switchChildCheckboxes(this.checkBoxValues[value], checked);
      parentElement.scrollIntoView(false);
    }
  }
}

(function () {
  new CheckBoxController(checkBoxValuesJson, DOMSelectors);
}());
