var contextMenuItem = {
    "id":"search",
    "title":"Search",
    "contexts":["selection"]
};
chrome.contextMenus.create(contextMenuItem);


chrome.contextMenus.onClicked.addListener(function(clickData){

  if (clickData.menuItem == "search" && clickData.selectionText) {


       input = clickData.selectionText
  }
});







