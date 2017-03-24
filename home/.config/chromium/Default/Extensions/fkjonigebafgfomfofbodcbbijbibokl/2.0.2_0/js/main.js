var props_defs = {
  default_pan : 'simple',
  update_interval : 0,
  alerting : 0
};

var alert_on = false,
  check_timeout,
  last_ip,
  log,
  log_max_entries = 50,
  options,
  passive_retries = 1,
  svc_url = 'http://geoip.hmageo.com/ext/';

function init() {
  checkDBConsistency();
  if (options.update_interval) {
    getIPInfo();
  }
}

function checkDBConsistency() {
  options = ('options' in localStorage) ? JSON.parse(localStorage.options) : {};
  var i,
    save = false;
  for (i in props_defs) {
    if (!(i in options)) {
      options[i] = props_defs[i];
      save = true;
    }
  }
  if (save) {
    localStorage.options = JSON.stringify(options);
  }
  if (!('log' in localStorage)) {
    localStorage.log = '[]';
    log = [];
  } else {
    log = JSON.parse(localStorage.log);
  }
}

function scheduleGetInfo() {
  if (check_timeout) {
    clearTimeout(check_timeout);
  }
  if (options.update_interval) {
    check_timeout = setTimeout(getIPInfo, options.update_interval * 60000 - (('last_check' in localStorage) ? Date.now() - localStorage.last_check : 0));
  }
}

function isLegitResponse(rs) {
  return rs && typeof rs == 'object' && 'IP' in rs;
}

function getIPInfo(renderer) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", svc_url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) {
      return;
    }
    var log_length = log.length, rs;
    try {
      rs = JSON.parse(xhr.responseText);
      rs.coordinates = formatCoordinate(rs.latitude, true) + ' ' + formatCoordinate(rs.longitude, false);
    } catch (e) {}
    if (!isLegitResponse(rs)) {
      if (passive_retries--) {
        check_timeout = Timers.setTimeout(function () {
          getIPInfo(render);
        }, 1500);
        return;
      }
      rs = null;
    }
    passive_retries = 1;
    //rs.IP = Math.floor(Math.random() * 1000) + '.' + Math.floor(Math.random() * 1000) + '.' + Math.floor(Math.random() * 1000) + '.' + Math.floor(Math.random() * 1000);
    if (rs && (!log_length || log[0].IP != rs.IP)) {
      if (options.alerting && typeof renderer != 'function' && log_length) {
        chrome.browserAction.setBadgeText({text: '!'});
        alert_on = true;
      }
      if (options.update_interval) {
        saveLog({
          IP : rs.IP,
          time : Date.now(),
          country_code : rs.country_code.toLowerCase(),
          country_name : rs.country_name
        });
      }
    }
    if (typeof renderer == 'function') {
      renderer(rs);
    }
    localStorage.last_check = Date.now();
    scheduleGetInfo();
  }
  xhr.send();
}

function formatCoordinate(coord, is_lat) {
  var is_negative = coord < 0;
  coord = Math.abs(coord);
  var deg = Math.floor(coord),
    min_float = (coord - deg) * 60,
    min = Math.floor((coord - deg) * 60),
    sec = Math.floor((min_float - min) * 60),
    letter = is_lat ? (coord < 0 ? 'S' : 'N') : (coord < 0 ? 'W' : 'E');
  return deg + '°' + min + '\'' + sec + '"' + letter; 
}

function saveLog(entry) {
  if (entry === null) {
    log = [];
  } else {
    log.unshift(entry);
    if (log.length > log_max_entries) {
      log.pop();
    }
  }
  //console.info(log);
  localStorage.log = JSON.stringify(log);
}

init();