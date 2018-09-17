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
readTextFile("assets/js/siteInfo.json", function(text){
  data = JSON.parse(text);
  setHeadline(data);
  setChartHeights(data);
});

function setHeadline(data){
  let totalDeployments = 0;
  data.sites.forEach(site => {
    totalDeployments = totalDeployments + site.weeklyReports[0].deploys.length;
  });
  document.getElementById('totalDeployment').innerText = totalDeployments;
  document.getElementById('totalSites').innerText = data.sites.length;
}

function setChartHeights(data){
  let bars = {thisWeekDeployments: 0, lastWeekDeployments: 0, thisWeekPageViews: 0, lastWeekPageViews: 0,thisWeekNewFeatures: 0, lastWeekNewFeatures: 0, thisWeekAll: 0, lastWeekAll: 0};

data.sites.forEach(site => {
  let thisWeek = site.weeklyReports[0];
  let lastWeek = site.weeklyReports[1];

  // Calculate deployments
  bars.thisWeekDeployments = bars.thisWeekDeployments + thisWeek.deploys.length;

  bars.lastWeekDeployments = bars.lastWeekDeployments + lastWeek.deploys.length;

  // Calculate pageviews
  bars.thisWeekPageViews = bars.thisWeekPageViews + parseInt(thisWeek.traffic.uniqueVisitors);

  bars.lastWeekPageViews = bars.lastWeekPageViews + parseInt(lastWeek.traffic.uniqueVisitors);

  // Calculate newFeatures
  bars.thisWeekNewFeatures = bars.thisWeekNewFeatures + thisWeek.netlifyFeaturesUsed.length;

  bars.lastWeekNewFeatures = bars.lastWeekNewFeatures + lastWeek.netlifyFeaturesUsed.length;
});

// calculate total activity 
bars.thisWeekAll = bars.thisWeekDeployments + bars.thisWeekNewFeatures
 + bars.thisWeekPageViews;
bars.lastWeekAll = bars.lastWeekDeployments + bars.lastWeekNewFeatures
+ bars.lastWeekPageViews;

//reduce numbers for ease of viewing on the same graph
bars.thisWeekAll = bars.thisWeekAll / 100;
bars.lastWeekAll = bars.lastWeekAll / 100;
bars.thisWeekPageViews = bars.thisWeekPageViews / 100;
bars.lastWeekPageViews = bars.lastWeekPageViews / 100;

  for (const bar in bars) {
    element = document.getElementById(bar)
    element.style.height = bars[bar] + "%";
    element.innerText = Math.floor(bars[bar]);
  }
}