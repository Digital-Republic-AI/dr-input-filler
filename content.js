// Content script for dr-input-filler extension
const APP_NAME = "dr-input-filler";

console.log(`%c ${APP_NAME} `, 'background: #367838; color: white; border-radius: 2px; padding: 1px 4px;', 'content script loaded');

function generateValue(type, settings) {
  const generators = {
    [DATA_TYPES.FILL_CPF]: () => {
      const cpf = CPFGenerator.generateValidCPF();
      return settings.cpf.format === 'formatted' ? CPFGenerator.formatCPF(cpf) : cpf;
    },
    [DATA_TYPES.FILL_EMAIL]: () => EmailGenerator.generate(),
    [DATA_TYPES.FILL_NAME]: () => PersonNameGenerator.generate(settings.name.format),
    [DATA_TYPES.FILL_LOREM]: () => LoremIpsumGenerator.generate(settings.lorem.sentences),
  };

  const generator = generators[type];
  if (!generator) {
    console.error("Unknown data type:", type);
    return null;
  }
  return generator();
}

function isEditableElement(element) {
  if (!element) return false;
  if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") return true;
  return element.isContentEditable;
}

function setElementValue(element, value) {
  if (element.isContentEditable) {
    element.textContent = value;
  } else {
    element.value = value;
  }
  element.dispatchEvent(new Event("input", { bubbles: true }));
  element.dispatchEvent(new Event("change", { bubbles: true }));
}

function fillFocusedElement(type, settings) {
  const focused = document.activeElement;

  if (!isEditableElement(focused)) {
    console.warn("No editable field focused");
    return { success: false, value: null };
  }

  const value = generateValue(type, settings);
  if (!value) {
    return { success: false, value: null };
  }

  setElementValue(focused, value);

  const label = DATA_TYPE_LABELS[type] || type;
  console.log(`%c ${APP_NAME} `, 'background: #367838; color: white; border-radius: 2px; padding: 1px 4px;', `${label} filled:`, value);

  if (settings.notification) {
    showNotification(`${label} preenchido: ${value}`);
  }

  return { success: true, value };
}

function loadSettings() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(DEFAULT_SETTINGS, resolve);
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action !== "fill") return false;

  loadSettings().then((settings) => {
    const result = fillFocusedElement(request.type, settings);
    sendResponse(result);
  });

  return true;
});

function showNotification(message) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.cssText = `
    animation: drFillerSlideIn 0.3s ease-out;
    background-color: #4CAF50;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    color: white;
    font-family: Arial, sans-serif;
    font-size: 14px;
    padding: 16px 24px;
    position: fixed;
    right: 20px;
    top: 20px;
    z-index: 999999;
  `;

  const styleId = "dr-input-filler-notification-style";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes drFillerSlideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes drFillerSlideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "drFillerSlideOut 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}
