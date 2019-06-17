(function () {
    const elements = document.getElementsByClassName('post-author__date');
    if (elements.length < 2) { return; }
    const updatedDateString = elements[1].textContent;
    if (!updatedDateString) { return; }

    const updatedDate = new Date(updatedDateString);
    const now = new Date();
    const diffMilliSeconds = now.getTime() - updatedDate.getTime();
    const year = Math.floor(diffMilliSeconds / (1000 * 60 * 60 * 24 * 365)); // 正確性は必要ないので閏は無視する

    if (year === 0) { return; }

    const div = document.createElement('div');
    div.className = 'sendo-bar';
    div.textContent = `この記事は最終更新日から${year}年以上が経過しています。`;

    const icon = document.createElement('i');
    icon.className = 'fa fa-exclamation-triangle';
    div.insertBefore(icon, div.firstChild);

    const mainColumn = document.getElementsByClassName('main-column')[0];
    mainColumn.insertBefore(div, mainColumn.firstChild);
}());
