function error(message) {
  return { text: 'Error: ' + message };
}

function success(message) {
  return { text: message };
}

// Extract URL from Slack's markup URL
// e.g.
// <http://amazon.com> into http://amazon.com
// <http://amazon.com|amazon.com> into http://amazon.com
function parseUrl(markupUrl) {
  return markupUrl.replace(/^</, '').replace(/\|.*$/, '').replace(/\>.*$/, '');
}

exports.error = error;
exports.success = success;
exports.parseUrl = parseUrl;
