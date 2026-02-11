// Background service worker for dr-input-filler extension

importScripts("utils.js");

const APP_NAME = "dr-input-filler";

console.log(`%c ${APP_NAME}`, 'background: #367838; color: white; border-radius: 1px;', 'service worker initialized');


const MENU_ITEMS = [
  { id: DATA_TYPES.FILL_CPF, title: "CPF valido" },
  { id: DATA_TYPES.FILL_CNPJ, title: "CNPJ valido" },
  { id: DATA_TYPES.FILL_RG, title: "RG" },
  { id: DATA_TYPES.FILL_EMAIL, title: "Email" },
  { id: DATA_TYPES.FILL_NAME, title: "Nome de pessoa" },
  { id: DATA_TYPES.FILL_CELULAR, title: "Celular" },
  { id: DATA_TYPES.FILL_LOREM, title: "Lorem Ipsum" },
];

const PARENT_MENU_ID = "drInputFiller";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: PARENT_MENU_ID,
    title: APP_NAME,
    contexts: ["editable"],
  });

  MENU_ITEMS.forEach((item) => {
    chrome.contextMenus.create({
      id: item.id,
      parentId: PARENT_MENU_ID,
      title: item.title,
      contexts: ["editable"],
    });
  });

  console.log(`%c ${APP_NAME} `, 'background: #367838; color: white; border-radius: 2px; padding: 1px 4px;', 'Context menu created');
});

function sendFillMessage(tabId, type) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, { action: "fill", type }, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }
      resolve(response);
    });
  });
}

function injectContentScripts(tabId) {
  return chrome.scripting.executeScript({
    target: { tabId },
    files: ["utils.js", "content.js"],
  });
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const validIds = MENU_ITEMS.map((item) => item.id);

  if (!validIds.includes(info.menuItemId)) {
    return;
  }

  sendFillMessage(tab.id, info.menuItemId)
    .then((response) => console.log(`%c ${APP_NAME} `, 'background: #367838; color: white; border-radius: 2px; padding: 1px 4px;', "Filled:", response))
    .catch(() => {
      injectContentScripts(tab.id)
        .then(() => sendFillMessage(tab.id, info.menuItemId))
        .then((response) => console.log(`%c ${APP_NAME} `, 'background: #367838; color: white; border-radius: 2px; padding: 1px 4px;', "Filled after inject:", response))
        .catch((err) => console.error(`%c ${APP_NAME} `, 'background: #ed1515; color: white; border-radius: 2px; padding: 1px 4px;', "Failed to fill:", err));
    });
});