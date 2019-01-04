const DOMSelectors = {
  containerSelector: 'container'
}

const checkBoxJson = {
  color: ['red', 'green', 'yellow', 'blue'],
  drinks: ['coke', 'pepsi', 'dew'],
  movies: ['adhm', 'detachment'],
  bikes: ['harley', 'yamaha', 'r15']
}

const checkBoxController = {
  initParentCheckboxes: function () {
    var element = ``;
    Object.keys(checkBoxJson).map((ele) => {
      element += `<div class="checkbox"><label for=${ele}><input type="checkbox" id=${ele} value=${ele} /> ${ele}</label></div>${this.initChildCheckBoxes(ele)}`
    })
    document.getElementById(DOMSelectors.containerSelector).innerHTML = element;

    // Adds Parent Checkboxes Event Listeners
    this.initParentEventListeners();
  },
  changeAllChildCheckboxes: function (ids, val) {
    var doc = document;
    ids.map(ele => {
      doc.getElementById(ele).checked = val;
    })
  },
  initChildCheckBoxes: function (prop) {
    var childElement = ``;
    checkBoxJson[prop].map((ele) => {
      childElement += `<li><label for=${ele}><input type="checkbox" id=${ele} value=${ele} /> ${ele}</label></li>`
    })
    return `<ul id=${prop + 'List'} class="childList">${childElement}</ul>`
  },
  initParentEventListeners: function () {
    Object.keys(checkBoxJson).map(() => {
      document.addEventListener('click', (e) => this.parentCheckboxHandler(e), false);
    })
  },
  parentCheckboxHandler: function (e) {
    let { checked, value } = e.target;
    let listId = value + 'List';
    let doc = document;
    if (checked) {
      doc.getElementById(listId).style.display = 'block';
      this.changeAllChildCheckboxes(checkBoxJson[value], true);
    } else {
      doc.getElementById(listId).style.display = 'none';
      this.changeAllChildCheckboxes(checkBoxJson[value], false);
    }
    doc.getElementById(listId).scrollIntoView();
  }
}

  (function () {
    checkBoxController.initParentCheckboxes();
  })();
