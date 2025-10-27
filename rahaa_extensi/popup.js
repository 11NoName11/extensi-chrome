const webhookInput = document.getElementById("webhookInput");
const saveBtn = document.getElementById("saveBtn");
const toggleBtn = document.getElementById("toggleBtn");

chrome.storage.local.get(["webhook", "enabled"], (data) => {
  webhookInput.value = data.webhook || "";
  toggleBtn.textContent = data.enabled ? "Matikan Tracking" : "Nyalakan Tracking";
});

saveBtn.onclick = () => {
  chrome.storage.local.set({ webhook: webhookInput.value });
  alert("Webhook disimpan ✅");
};

toggleBtn.onclick = () => {
  chrome.storage.local.get(["enabled"], (data) => {
    chrome.storage.local.set({ enabled: !data.enabled });
    toggleBtn.textContent = !data.enabled ? "Matikan Tracking" : "Nyalakan Tracking";
  });
};
