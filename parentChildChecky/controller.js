const DOMSelectors = {
  containerSelector: 'container',
};

const checkBoxValuesJson = {
  color: ['red', 'green', 'yellow', 'blue'],
  drinks: ['coke', 'pepsi', 'dew'],
  movies: ['adhm', 'detachment'],
  bikes: ['harley', 'yamaha', 'r15'],
};

const checkBoxController = {
  initParentCheckboxes() {
    let element = '';
    Object.keys(checkBoxValuesJson).map((ele) => {
      element += `<div class="checkbox"><label for=${ele}><input type="checkbox" id=${ele} value=${ele} /> ${ele}</label></div>${this.initChildCheckBoxes(ele)}`;
      return null;
    });
    document.getElementById(DOMSelectors.containerSelector).innerHTML = element;

    // Adds Parent Checkboxes Event Listeners
    this.initParentEventListeners();
  },
  switchChildCheckboxes(ids, val) {
    const doc = document;
    ids.map((ele) => {
      doc.getElementById(ele).checked = val;
      return null;
    });
  },
  initChildCheckBoxes(prop) {
    let childElement = '';
    checkBoxValuesJson[prop].map((ele) => {
      childElement += `<li><label for=${ele}><input type="checkbox" id=${ele} value=${ele} /> ${ele}</label></li>`;
      return null;
    });
    return `<ul id="${prop}List" class="childList">${childElement}</ul>`;
  },
  initParentEventListeners() {
    Object.keys(checkBoxValuesJson).map(() => {
      document.addEventListener('click', e => this.parentCheckboxHandler(e), false);
      return null;
    });
  },
  parentCheckboxHandler(e) {
    const { checked, value } = e.target;
    const doc = document;
    const listId = `${value}List`;
    doc.getElementById(listId).style.display = checked ? 'block' : 'none';
    this.switchChildCheckboxes(checkBoxValuesJson[value], checked);
    doc.getElementById(listId).scrollIntoView(false);
  },
};

checkBoxController.initParentCheckboxes();
