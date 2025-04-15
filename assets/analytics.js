// analytics.js
// --- Analytics Script: Capture Clicks and Page Views ---
(function() {
  function getObjectType(target) {
    if (target.tagName === 'IMG') return 'image';
    if (target.tagName === 'A' && target.href.endsWith('.pdf')) return 'pdf-link';
    if (target.tagName === 'A') return 'hyperlink';
    if (target.tagName === 'BUTTON' || target.type === 'submit') return 'button';
    if (target.tagName === 'INPUT') return 'input';
    if (target.tagName === 'SELECT') return 'drop-down';
    if (target.tagName === 'TEXTAREA') return 'textarea';
    if (target.tagName === 'P') return 'text';
    if (target.classList.contains('profile-pic')) return 'profile-picture';
    if (target.classList.contains('pixel-img')) return 'local-picture';
    return target.tagName.toLowerCase();
  }
  window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('section').forEach(section => {
      let type = 'view';
      let objType = section.className || 'section';
      let timestamp = new Date().toISOString();
      console.log(`${timestamp} , ${type} , ${objType}`);
    });
  });
  document.addEventListener('click', function(e) {
    let target = e.target;
    while (target && target !== document.body && !target.tagName.match(/^(A|BUTTON|IMG|INPUT|SELECT|TEXTAREA|P)$/i)) {
      target = target.parentElement;
    }
    if (!target) return;
    let type = 'click';
    let objType = getObjectType(target);
    let timestamp = new Date().toISOString();
    console.log(`${timestamp} , ${type} , ${objType}`);
  }, true);
})();
