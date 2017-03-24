"use strict";
var data_rows_map = {
    isp : 'ISP',
    city : 'City',
    country_name : 'Country',
    coordinates : 'Coordinates'
  },
  main_dom = chrome.extension.getBackgroundPage(),
  map_keys = ['AIzaSyAfIwkZttQZuuDQl6ZJ8thGy_QY9-mRq0M', 'AIzaSyCk5VhpQMuU1Voc1kdaHHSar7OR_F2pX4c', 'AIzaSyAEGitcPjBBpZ0YxF4pEa0oOwut7q5wEV8'], //ABQIAAAATfHumDbW3OmRByfquHd3SRTRERdeAiwZ9EeJWta3L_JZVS0bOBRQeZgr4K0xyVKzUdnnuFl8X9PX0w',
  ip_mover_count = 0;

function renderInfo(rs) {
  if (!rs) {
    $('#loading_indicator').hide();
    $('#no_rs').show();
  } else {
    $('#base_info IMG').attr('src', 'http://aws.hidemyass.com/flags_iso/64/' + rs.country_code.toLowerCase() + '.png');
    $('#base_info SPAN').text(rs.IP);
    var ipinfolist_el = document.getElementById('ipinfolist'),
      rel, th, td, tr;
    for (rel in data_rows_map) {
      if (!rs[rel]) {
        continue;
      }
      tr = document.createElement('TR');
      tr.setAttribute('rel', rel);
      th = document.createElement('TH');
      th.textContent = data_rows_map[rel];
      tr.appendChild(th);
      td = document.createElement('TD');
      td.textContent = rs[rel];
      tr.appendChild(td);
      ipinfolist_el.appendChild(tr);
    };
    $('#loading_indicator').hide();
    $('#base_info').show();
    //map_url = 'https://maps.google.com/maps?f=q&source=s_q&geocode=&aq=&t=m&ie=UTF8&ll=' + rs.latitude + ',' + rs.longitude + '&q=' + rs.latitude + ',' + rs.longitude + '&z=7&output=embed';
    $('.map-holder IMG').attr('src', 'https://maps.googleapis.com/maps/api/staticmap?center=' + rs.latitude + ',' + rs.longitude + '&zoom=9&size=720x370&sensor=false&key=' + map_keys[Math.floor(Math.random() * map_keys.length)]);
    $('.map-holder').data('target', 'https://google.com/maps/@' + rs.latitude + ',' + rs.longitude + ',9z');
  }
  var log_length = main_dom.log.length,
    log_rows = [];
  if (!log_length) {
    $('#nologs').show();
  } else {
    var jtbody = $('.ip-table TBODY');
    $('#clear_button').on('click', function () {
      main_dom.saveLog(null);
      $('.log_entry').remove();
      this.style.display = 'none';
      $('#nologs').show();
    }).show();
    main_dom.log.forEach(function (entry, key) {
      var date = new Date(entry.time);
      jtbody.append(
        $('<tr class="log_entry">').append(
          $('<td>', { html : '<time datetime="' + sprintf('%d-%02d-%02dT%02d:%02d', date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes()) + '">' + sprintf('%02d/%02d/%d <span>- %02d:%02d</span>', date.getMonth() + 1, date.getDate(), date.getFullYear(), date.getHours(), date.getMinutes()) + '</time></td>' }),
          $('<td>', { text : entry.IP }),
          $('<td>', { text : entry.country_name })
        )
      );
    });
  }
}

function openGmaps() {
  chrome.tabs.create({
    url : $('.map-holder').data('target')
  });
}

function commenceOptions() {
  $('#update_interval_selector').val(main_dom.options.update_interval);
  $('#alerting_switch').val([main_dom.options.alerting])[0].disabled = !main_dom.options.update_interval;
}

function setEvents() {
  $('.map-holder, TR[rel="coordinates"] TD').on('click', openGmaps);
  $('#update_interval_selector').bind('change', function () {
    saveOptions('update_interval', +this.value);
    main_dom.scheduleGetInfo();
    var alerting_switch = document.getElementById('alerting_switch');
    alerting_switch.disabled = !+this.value;
    jcf.getInstance(alerting_switch).refresh();
  });
  $('#alerting_switch').bind('change', function () {
    saveOptions('alerting', +this.checked);
  });
}

function saveOptions(key, val) {
  main_dom.options[key] = val;
  var str_opts = JSON.stringify(main_dom.options);
  localStorage.options = str_opts;
}

function init() {
  if (main_dom.alert_on) {
    chrome.browserAction.setBadgeText({text: ''});
    main_dom.alert_on = false;
  }
  commenceOptions();
  setEvents();
  main_dom.getIPInfo(renderInfo);
}

document.addEventListener('DOMContentLoaded', init, false);