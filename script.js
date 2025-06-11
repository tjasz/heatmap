function init() {
  initForm();
  initMap();
}

function initMap() {
  var map = L.map('map').setView([46.85288, -121.76042], 10);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Base map &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  window["map"] = map;
  updateMap();
}

function updateMap() {
  window["heatmap"]?.remove();

  const activities = document.getElementById("activities").value;
  const color = document.getElementById("color").value;
  const keyPairId = document.getElementById("key-pair-id").value.trim();
  const policy = document.getElementById("policy").value.trim();
  const signature = document.getElementById("signature").value.trim();
  const stravaIdcf = document.getElementById("strava-idcf").value.trim();

  if (keyPairId?.length && policy?.length && signature?.length) {
    let url = `https://content-a.strava.com/identified/globalheat/{activities}/{color}/{z}/{x}/{y}.png?v=19&t=1749597887362&Key-Pair-Id=${keyPairId}&Policy=${policy}&Signature=${signature}`;
    if (stravaIdcf?.length) {
      url += `&_strava_idcf=${stravaIdcf}`;
    }
    window["heatmap"] = L.tileLayer(url, {
      activities,
      color,
      maxNativeZoom: 15,
      attribution: 'Heatmap &copy; <a href="https://www.strava.com/maps">Strava</a>'
    }).addTo(window["map"])
  }
  else {
    window["heatmap"] = L.tileLayer('https://heatmap-external-a.strava.com/tiles/{activities}/{color}/{z}/{x}/{y}.png', {
      activities,
      color,
      maxNativeZoom: 11,
      attribution: 'Heatmap &copy; <a href="https://www.strava.com/maps">Strava</a>'
    }).addTo(window["map"])
  }
}

function initForm() {
  document.getElementById("activities").value = getCookie("activities") ?? "all";
  document.getElementById("color").value = getCookie("color") ?? "hot";
  document.getElementById("key-pair-id").value = getCookie("key-pair-id") ?? "";
  document.getElementById("policy").value = getCookie("policy") ?? "";
  document.getElementById("signature").value = getCookie("signature") ?? "";
  document.getElementById("strava-idcf").value = getCookie("strava-idcf") ?? "";
  updateUrlTemplate();
}

function updateUrlTemplate() {
  const activities = document.getElementById("activities").value;
  const color = document.getElementById("color").value;
  const urlTemplateBlock = document.getElementById("urltemplate");
  urlTemplateBlock.textContent = `https://heatmap-external-a.strava.com/tiles/${activities}/${color}/{Z}/{X}/{Y}.png`;

  const keyPairId = document.getElementById("key-pair-id").value.trim();
  const policy = document.getElementById("policy").value.trim();
  const signature = document.getElementById("signature").value.trim();
  const stravaIdcf = document.getElementById("strava-idcf").value.trim();

  if (keyPairId?.length && policy?.length && signature?.length && stravaIdcf?.length) {
    let url = `https://content-a.strava.com/identified/globalheat/${activities}/${color}/{Z}/{X}/{Y}.png?v=19&t=${Date.now().toString()}&Key-Pair-Id=${keyPairId}&Policy=${policy}&Signature=${signature}&_strava_idcf=${stravaIdcf}`;
    urlTemplateBlock.textContent = url;
  }
}

function copyUrlTemplate() {
  const urlTemplateBlock = document.getElementById("urltemplate");
  navigator.clipboard.writeText(urlTemplateBlock.textContent);
  alert("Copied URL template to clipboard!");
}

function setCookieAndUpdateUrlTemplate(cname, exdays) {
  const cvalue = document.getElementById(cname).value.trim();
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  updateUrlTemplate();
  updateMap();
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return undefined;
}