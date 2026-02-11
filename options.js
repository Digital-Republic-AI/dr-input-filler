// Options page script for dr-input-filler

const elements = {
  notification: document.getElementById("notificationOption"),
  copy: document.getElementById("copyOption"),
  cpfFormat: document.getElementById("cpfFormatOption"),
  nameFormat: document.getElementById("nameFormatOption"),
  loremSentences: document.getElementById("loremSentencesOption"),
  saveBtn: document.getElementById("saveBtn"),
  resetBtn: document.getElementById("resetBtn"),
  status: document.getElementById("status"),
};

function loadOptions() {
  chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
    elements.notification.checked = settings.notification;
    elements.copy.checked = settings.copy;
    elements.cpfFormat.value = settings.cpf.format;
    elements.nameFormat.value = settings.name.format;
    elements.loremSentences.value = settings.lorem.sentences;
  });
}

function getOptionsFromForm() {
  return {
    notification: elements.notification.checked,
    copy: elements.copy.checked,
    cpf: { format: elements.cpfFormat.value },
    name: { format: elements.nameFormat.value },
    lorem: { sentences: parseInt(elements.loremSentences.value, 10) },
  };
}

function showStatus(message, type) {
  elements.status.textContent = message;
  elements.status.className = `status ${type}`;
  setTimeout(() => {
    elements.status.textContent = "";
    elements.status.className = "";
  }, 2000);
}

function applyDefaults() {
  elements.notification.checked = DEFAULT_SETTINGS.notification;
  elements.copy.checked = DEFAULT_SETTINGS.copy;
  elements.cpfFormat.value = DEFAULT_SETTINGS.cpf.format;
  elements.nameFormat.value = DEFAULT_SETTINGS.name.format;
  elements.loremSentences.value = DEFAULT_SETTINGS.lorem.sentences;
}

elements.saveBtn.addEventListener("click", () => {
  chrome.storage.sync.set(getOptionsFromForm(), () => {
    showStatus("Configurações salvas!", "success");
  });
});

elements.resetBtn.addEventListener("click", () => {
  applyDefaults();
  chrome.storage.sync.set(DEFAULT_SETTINGS, () => {
    showStatus("Restaurado para padrões!", "success");
  });
});

loadOptions();
