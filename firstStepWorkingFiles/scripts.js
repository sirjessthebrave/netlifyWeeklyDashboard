var data;
function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
          callback(rawFile.responseText);
      }
  }
  rawFile.send(null);
}
//usage:
readTextFile("siteInfo.json", function(text){
  data = JSON.parse(text);
  console.log(data);
  setUser(data);
  setHeadline(data);
  populateSiteCards(data);
});

function setUser(data){
  document.getElementById('user').innerText = data.userName;
}
function setHeadline(data){
  let totalDeployments = 0;
  data.sites.forEach(site => {
    totalDeployments = totalDeployments + site.weeklyReports[0].deploys.length;
  });
  document.getElementById('totalDeployment').innerText = totalDeployments;
  document.getElementById('totalSites').innerText = data.sites.length;
}
function populateSiteCards(data){
  let sites = data.sites;
  sites.forEach(site => {
    let thisWeek = site.weeklyReports[0];
    let lastWeek = site.weeklyReports[1]
    let newFeatures = thisWeek.netlifyFeaturesUsed.length - lastWeek.netlifyFeaturesUsed.length
    siteCard = document.createElement('DIV');
    siteCard.className = 'card';
    siteCard.innerHTML = `<h3 class="dark">${site.name}</h3>
    <ul>
      <li>${thisWeek.deploys.length} deployments</li>
      <li>${thisWeek.traffic.uniqueVisitors} unique page views</li>
      <li>${newFeatures} new Netlify features</li>
    </ul>
    <p class="button" onclick="openCard('${site.id}')">See Site Stats</p>`
    document.getElementById('cardWrapper').appendChild(siteCard);
  });
}

function openCard(cardName){
  let thisSite;
  data.sites.forEach(site => {
    if(site.id === cardName) {
      thisSite = site;
    }
  });
  let siteInfo = document.createElement('h2')
  siteInfo.innerText = thisSite.name;
  document.getElementById('individualSite').appendChild(siteInfo);
  document.getElementById('individualSite').classList.remove('hidden');
  document.getElementById('cardWrapper').classList.add('hidden');
};

function close(){
  console.log('click')
  document.getElementById('individualSite').innerHTML = '';
  document.getElementById('individualSite').classList.add('hidden');
  document.getElementById('cardWrapper').classList.remove('hidden');
}

