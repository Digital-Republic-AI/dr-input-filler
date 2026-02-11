// Popup script for dr-input-filler

const typeSelect = document.getElementById("typeSelect");
const generateBtn = document.getElementById("generateBtn");
const dataDisplay = document.getElementById("dataDisplay");

function generateByType(type, settings) {
  const generators = {
    [DATA_TYPES.FILL_CPF]: () => {
      const cpf = CPFGenerator.generateValidCPF();
      return settings.cpf.format === 'formatted' ? CPFGenerator.formatCPF(cpf) : cpf;
    },
    [DATA_TYPES.FILL_EMAIL]: () => EmailGenerator.generate(),
    [DATA_TYPES.FILL_NAME]: () => PersonNameGenerator.generate(settings.name.format),
    [DATA_TYPES.FILL_LOREM]: () => LoremIpsumGenerator.generate(settings.lorem.sentences),
  };

  return (generators[type] || generators[DATA_TYPES.FILL_CPF])();
}

function loadSettings() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(DEFAULT_SETTINGS, resolve);
  });
}

function displayValue(value) {
  dataDisplay.textContent = value;
  dataDisplay.style.display = "block";
}

function copyAndNotify(value) {
  navigator.clipboard.writeText(value).then(() => {
    const originalText = generateBtn.textContent;
    generateBtn.textContent = "Copiado!";
    setTimeout(() => {
      generateBtn.textContent = originalText;
    }, 2000);
  });
}

async function generateAndDisplay() {
  const settings = await loadSettings();
  const value = generateByType(typeSelect.value, settings);
  displayValue(value);

  if (settings.copy) {
    copyAndNotify(value);
  }
}

generateBtn.addEventListener("click", generateAndDisplay);
typeSelect.addEventListener("change", generateAndDisplay);

window.addEventListener("load", generateAndDisplay);
