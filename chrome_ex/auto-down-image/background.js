chrome.action.onClicked.addListener((tab) => {
  const currentUrl = tab.url;
  const newUrl = `https://trungnguyenthien.github.io/private_tool/getimage.html?url=${encodeURIComponent(currentUrl)}`;

  chrome.tabs.create({ url: newUrl });
});
