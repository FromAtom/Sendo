function setUpdatedDate(num, type) {
    const thresholds = [
        [1, "ミリ秒"],
        [1000, "秒"],
        [60*1000, "分"],
        [60*60*1000, "時間"],
        [24*60*60*1000, "日"],
        [7*24*60*60*1000, "週間"],
        [30*24*60*60*1000, "ヶ月"],
        [365*24*60*60*1000, "年"],
    ]
    const thresholdMS = num * thresholds[type][0]

    const elements = document.getElementsByClassName('post-author__date');
    if (elements.length < 2) { return; }
    const updatedDateString = elements[1].textContent;
    if (!updatedDateString) { return; }

    const updatedDate = new Date(updatedDateString);
    const now = new Date();
    const diffMilliSeconds = now.getTime() - updatedDate.getTime();
    if (diffMilliSeconds < thresholdMS) { return; }
    let idx;
    for (idx = 0; idx <= 7; idx++) {
        if (diffMilliSeconds < thresholds[idx][0]) {
            break;
        }
    }
    idx--;

    const div = document.createElement('div');
    div.className = 'sendo-bar';
    div.textContent = `この記事は最終更新日から${Math.floor(diffMilliSeconds/thresholds[idx][0])}${thresholds[idx][1]}以上が経過しています。`;

    const icon = document.createElement('i');
    icon.className = 'fa fa-exclamation-triangle';
    div.insertBefore(icon, div.firstChild);

    const mainColumn = document.getElementsByClassName('layout-post__main')[0];
    mainColumn.insertBefore(div, mainColumn.firstChild);
}

(function () {
    let num = 1;
    let type = 7;  // year
    chrome.storage.local.get("num", function(r) {
        if (typeof r.num !== "undefined") {
            num = r.num;
        }
        chrome.storage.local.get("type", function(r) {
            if (typeof r.type !== "undefined") {
                type = r.type;
            }
            setUpdatedDate(num, type);
        });
    });
}());
