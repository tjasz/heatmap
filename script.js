function updateUrlTemplate() {
  const activities = document.getElementById("activities").value;
  const color = document.getElementById("color").value;
  const urlTemplateBlock = document.getElementById("urltemplate");
  urlTemplateBlock.textContent = `https://heatmap-external-a.strava.com/tiles/${activities}/${color}/{Z}/{X}/{Y}.png`;

  const keyPairId = document.getElementById("key-pair-id").value.trim();
  const policy = document.getElementById("policy").value.trim();
  const signature = document.getElementById("signature").value.trim();
  if (keyPairId?.length && policy?.length && signature?.length) {
    urlTemplateBlock.textContent = `https://heatmap-external-a.strava.com/tiles-auth/${activities}/${color}/{Z}/{X}/{Y}.png?Key-Pair-Id=${keyPairId}&Policy=${policy}&Signature=${signature}`;
  }
}

function copyUrlTemplate() {
  const urlTemplateBlock = document.getElementById("urltemplate");
  navigator.clipboard.writeText(urlTemplateBlock.textContent);
  alert("Copied URL template to clipboard!");
}