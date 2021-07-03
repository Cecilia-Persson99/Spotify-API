//Variables
let redirect_uri = 'http://127.0.0.1:5500/spotify.html';
let client_id = '5fcf2eec6f60427db06e3ccaa6a1284f';
let client_secret = 'x';
const AUTHORIZE = 'https://accounts.spotify.com/authorize';
const TOKEN = 'https://accounts.spotify.com/api/token';

function onPageLoad() {
  if (window.location.search.length > 0) {
    handleRedirect();
  }
}
// Removes parameter from url
function handleRedirect() {
  let code = getCode();
  fetchAccessToken(code);
  window.history.pushState('', '', redirect_uri); // remove param from url
}

// Pull code from URL
function getCode() {
  let code = null;
  const queryString = window.location.search;
  if (queryString.length > 0) {
    const urlParams = new URLSearchParams(queryString);
    code = urlParams.get('code');
  }
  return code;
}
// Generate a url to request access to the API, this will redirect the user when pressing the Generate button.
function requestAuthorization() {
  client_id = '5fcf2eec6f60427db06e3ccaa6a1284f';
  client_secret = 'x';
  let url = AUTHORIZE;
  url += '?client_id=' + client_id;
  url += '&response_type=code';
  url += '&redirect_uri=' + encodeURI(redirect_uri);
  url += '&show_dialog=true';
  url +=
    '&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private user-top-read user-follow-read';
  window.location.href = url; // Show Spotify's authorization screen
}

//Request Access & Refresh Token
function fetchAccessToken(code) {
  let body = 'grant_type=authorization_code';
  body += '&code=' + code;
  body += '&redirect_uri=' + encodeURI(redirect_uri);
  body += '&client_id=' + client_id;
  body += '&client_secret=' + client_secret;
  callAuthorizationApi(body);
}

function callAuthorizationApi(body) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', TOKEN, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ':' + client_secret));
  xhr.send(body);
  xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse() {
  if (this.status == 200) {
    var data = JSON.parse(this.responseText);
    console.log(data);
    var data = JSON.parse(this.responseText);
    if (data.access_token != undefined) {
      access_token = data.access_token;
      localStorage.setItem('access_token', access_token);
    }
    if (data.refresh_token != undefined) {
      refresh_token = data.refresh_token;
      localStorage.setItem('refresh_token', refresh_token);
    }
    onPageLoad();
  } else {
    console.log(this.responseText);
    alert(this.responseText);
  }
}
