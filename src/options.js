function save_options() {
  let num = document.getElementById('num').value;
  let type = document.getElementById('type').selectedIndex;
  chrome.storage.local.set({num, type}, function(){
    const status = document.getElementById('status');
    status.textContent = '設定を保存しました';
    setTimeout(function(){
      status.textContent = '';
    }, 1000);
  });
}

function restore_options() {
  chrome.storage.local.get({
    num: 1,
    type: 7  // year
  }, function(items) {
    document.getElementById('num').value = items.num;
    document.getElementById('type').selectedIndex = items.type;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
