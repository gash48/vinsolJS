/* eslint-disable no-alert */
/* eslint-disable class-methods-use-this */
class CheckBoxUtility {
  allChecksOff(checks) {
    checks.map(ele => this.setCheckboxVal(ele, false));
    return [];
  }

  addCheckBoxEvent(checks, checkBoxHandler) {
    const doc = document;
    checks.map(ele => doc.getElementById(ele).addEventListener('click', checkBoxHandler, false));
  }

  setCheckboxVal(id, val) {
    document.getElementById(id).checked = val;
  }
}

class CheckBox extends CheckBoxUtility {
  constructor() {
    super();
    this.defaultChecks = ['Sunday', 'Monday', 'Wednesday', 'Thursday', 'Tuesday', 'Friday', 'Saturday', 'none'];
    this.currentChecks = [];
  }

  checkBoxHandler(e) {
    const { value, checked } = e.target;
    if (checked) {
      if (value === 'none') {
        this.currentChecks = this.allChecksOff(this.defaultChecks);
      } else if (this.currentChecks.length === 3) {
        e.preventDefault();
        alert(`Only 3 days can be selected. You have already selected ${this.currentChecks.join(', ')}`);
      } else {
        this.currentChecks.push(value);
      }
      this.setCheckboxVal('none', value === 'none');
    } else if (value !== 'none') {
      this.currentChecks = this.currentChecks.filter((ele => ele !== value));
      this.setCheckboxVal('none', false);
    }
  }

  initCheckBoxes() {
    let listElement = '';
    this.defaultChecks.map((ele) => {
      listElement += `<li class="checkbox"><label for=${ele}><input type="checkbox" style="margin-right:10px" id=${ele} value=${ele} /> ${ele}</label></li>`;
      return null;
    });
    document.getElementById('customList').innerHTML = listElement;
    // Add Event Handlers
    this.addCheckBoxEvent(this.defaultChecks, e => this.checkBoxHandler(e));
  }
}

(function initJs() {
  new CheckBox().initCheckBoxes();
}());
