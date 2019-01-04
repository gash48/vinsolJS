class ChUtil {
    constructor(){

    }

    allChecksOff(checks) {
        checks.map((ele) => {
            this.setElementCheck(ele, false);
        })
        return [];
    }

    addEvents(checks, checkBoxHandler) {
        let doc = document;
        checks.map((ele) => {
            doc.getElementById(ele).addEventListener('click', checkBoxHandler, false);
        })
    }

    setElementCheck(id, val) {
        document.getElementById(id).checked = val;
    }
}

class CheckBox extends ChUtil {
    constructor() {
        super();
        this.defaultChecks = ['Sunday', 'Monday', 'Wednesday', 'Thursday', 'Tuesday', 'Friday', 'Saturday', 'none'];
        this.currentChecks = [];
    }

    checkChangers(e) {
        let {value, checked} = e.target;
        if (checked) {
            if (value == 'none') {
               this.currentChecks = this.allChecksOff(this.defaultChecks);
            } else {
                if (this.currentChecks.length == 3) {
                    e.preventDefault();
                    alert('Only 3 days can be selected. You have already selected ' + this.currentChecks.join(', '))
                } else {
                    this.currentChecks.push(value);
                }
            }
            this.setElementCheck('none', value == 'none')
        } else {
            if (value != 'none') {
                this.currentChecks = this.currentChecks.filter(((ele) => ele != value))
                this.setElementCheck('none', false);
            }
        }
    }

    initChecks() {
        let listElement = ``;
        this.defaultChecks.map((ele) => {
            listElement += `<li class="checkbox"><label for=${ele}><input type="checkbox" style="margin-right:10px" id=${ele} value=${ele} /> ${ele}</label></li>`
        })
        document.getElementById('customList').innerHTML = listElement;
        // Add Event Handlers
        this.addEvents(this.defaultChecks,(e) => this.checkChangers(e));
    }
}

(function(){
    new CheckBox().initChecks();
})();
