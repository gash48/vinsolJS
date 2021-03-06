/* eslint-disable consistent-return */
/* eslint-disable no-alert */
/* eslint-disable no-new */
class ImPromptu {
  constructor(promptArr) {
    const promptResponse = promptArr.map(promptMessage => this.askForPrompt(promptMessage));
    document.querySelector('[data-attr=introMessage]').innerHTML = `Hello ${promptResponse.join(' ')}`;
  }

  askForPrompt(message) {
    const promptPopup = prompt(message);
    const inputData = promptPopup && promptPopup.trim();
    if (inputData) {
      return inputData;
    }
    this.askForPrompt(message);
  }
}

(function initPromptization() {
  const promptArr = ['First Name', 'Last Name'];
  new ImPromptu(promptArr);
}());
