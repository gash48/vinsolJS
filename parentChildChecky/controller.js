const checkStructure = {
    color: ['red', 'green', 'yellow', 'blue'],
    drinks: ['coke', 'pepsi', 'dew'],
    movies: ['adhm', 'detachment'],
    bikes: ['harley', 'yamaha', 'r15']
}

const checkMethods = {
    initParentCheckboxes : function() {
        var element = ``;
        Object.keys(checkStructure).map((ele) => {
            element += `<div class="checkbox"><label for=${ele}><input type="checkbox" id=${ele} value=${ele} /> ${ele}</label></div>${this.initChildCheckBoxes(ele)}`
        })
        document.getElementById('container').innerHTML = element;
    
        // Adds Event Listeners
        this.initEventListeners();
    },
    changeCheck : function(ids, val) {
        var doc = document;
        ids.map(ele => {
            doc.getElementById(ele).checked = val;
        })
    },
    initChildCheckBoxes : function(prop) {
        var childElement = ``;
        checkStructure[prop].map((ele) => {
            childElement += `<li><label for=${ele}><input type="checkbox" id=${ele} value=${ele} /> ${ele}</label></li>`
        })
        return `<ul id=${prop + 'list'} class="childList">${childElement}</ul>`
    },
    initEventListeners : function() {
        Object.keys(checkStructure).map((ele) => {
            document.addEventListener('click', (e)=>this.parentCheckChange(e), false)
        })
    },
    parentCheckChange : function(e) {
        if (e.target.checked) {
            document.getElementById(e.target.value + 'list').style.display = 'block';
            this.changeCheck(checkStructure[e.target.value], true);
        } else {
            document.getElementById(e.target.value + 'list').style.display = 'none';
            this.changeCheck(checkStructure[e.target.value], false);
        }
    }
}


checkMethods.initParentCheckboxes();