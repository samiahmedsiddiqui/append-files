function loadScript(script, dependentName) {
  var bodyTag = document.getElementsByTagName('body')[0];
  var appendScript = document.createElement('script');

  var dependentScripts;
  var i;
  var totalLength;

  if (typeof script === 'object') {
    if (script.url) {
      appendScript.src = script.url;

      if (script.async) {
        appendScript.async = true;
      }

      if (script.referrerPolicy) {
        appendScript.referrerPolicy = script.referrerPolicy;
      }
    } else if (script.inline) {
      appendScript.innerHTML = script.inline;
    } else {
      return;
    }

    if (script.id) {
      appendScript.id = script.id;
    }

    if (script.nomodule) {
      appendScript.noModule = true;
    }
  } else {
    appendScript.src = script;
  }

  if (dependentName !== '') {
    document.getElementById(dependentName).addEventListener('load', function() {
      bodyTag.appendChild(appendScript);

      if (typeof script === 'object' && script.dependentScripts && script.dependentScripts.length > 0) {
        dependentName = '';
        if (appendScript.id) {
          dependentName = appendScript.id;
        }

        dependentScripts = script.dependentScripts;
        totalLength = dependentScripts.length;
        for (i = 0; i < totalLength; i += 1) {
          loadScript(dependentScripts[i], dependentName);
        }
      }
    });
  } else {
    bodyTag.appendChild(appendScript);

    if (typeof script === 'object' && script.dependentScripts && script.dependentScripts.length > 0) {
      dependentName = '';
      if (appendScript.id) {
        dependentName = appendScript.id;
      }

      dependentScripts = script.dependentScripts;
      totalLength = dependentScripts.length;
      for (i = 0; i < totalLength; i += 1) {
        loadScript(dependentScripts[i], dependentName);
      }
    }
  }

  return;
}

function addStylesheets(stylePaths) {
  var headerTag = document.getElementsByTagName('head')[0];

  var appendStyle;
  var i;
  var totalLength;

  if (stylePaths.length > 0) {
    totalLength = stylePaths.length;
    for (i = 0; i < totalLength; i++) {
      if (typeof stylePaths[i] === 'object') {
        if (stylePaths[i].href) {
          appendStyle = document.createElement('link');
          appendStyle.rel = 'stylesheet';
          appendStyle.type = 'text/css';
          appendStyle.href = stylePaths[i].href;
        } else {
          appendStyle = document.createElement('style');
          appendStyle.innerHTML = stylePaths[i].inline;
        }
      } else {
        appendStyle = document.createElement('link');
        appendStyle.rel = 'stylesheet';
        appendStyle.type = 'text/css';
        appendStyle.href = stylePaths[i];
      }

      headerTag.appendChild(appendStyle);
    }
  }
}

function addScripts(scriptPaths) {
  var i;
  var totalLength;

  if (scriptPaths.length > 0) {
    totalLength = scriptPaths.length;
    for (i = 0; i < totalLength; i += 1) {
      loadScript(scriptPaths[i], '');
    }
  }
}

exports.appendStylesheets = addStylesheets;
exports.appendScripts = addScripts;
