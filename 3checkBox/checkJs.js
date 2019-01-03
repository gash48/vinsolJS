let currentChecks = [];
const checks = ['Sunday', 'Monday', 'Wednesday', 'Thursday', 'Tuesday', 'Friday', 'Saturday', 'none'];

function checkChangers(e) {
    if (e.target.checked) {
        if (e.target.value == 'none') {
            allChecksOff();
            currentChecks = [];
            setElementCheck('none', true);
        } else {
            setElementCheck('none', false);
            if (currentChecks.length == 3) {
                setElementCheck(e.target.value, false);
                alert('Only 3 days can be selected. You have already selected ' + currentChecks.join(', '))
            } else {
                currentChecks.push(e.target.value);
            }
        }
    } else {
        if (e.target.value != 'none') {
            currentChecks = currentChecks.filter(((ele) => ele != e.target.value))
            setElementCheck('none',false);
        }
    }
}

function allChecksOff() {
    checks.map((ele) => {
        setElementCheck(ele,false);
    })
}

function addEvents() {
    checks.map((ele) => {
        document.getElementById(ele).addEventListener('change', checkChangers, false);
    })
}

function setElementCheck(id, val){
    document.getElementById(id).checked = val;
}

function initChecks() {

    checks.map((ele) => {
        var customLi = document.createElement('li');
        customLi.className = 'checkbox';

        var label = document.createElement('label');
        label.setAttribute('for', ele);

        var checkbox = document.createElement('input');
        checkbox.style.marginRight = '10px';
        checkbox.type = 'checkbox';
        checkbox.id = ele;
        checkbox.value = ele;

        label.appendChild(checkbox);
        label.innerHTML += ele;
        customLi.appendChild(label);
        document.getElementById('customList').appendChild(customLi);
    })

    addEvents();
}



initChecks();
