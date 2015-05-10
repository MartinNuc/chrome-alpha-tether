chrome.app.runtime.onLaunched.addListener(function(launchData) {
    var optionsDictionary = {id: "AlphaTether"};
    optionsDictionary.innerBounds = {};
    optionsDictionary.innerBounds.left = 0;
    optionsDictionary.innerBounds.top = 0;
    optionsDictionary.innerBounds.width = screen.width;
    optionsDictionary.innerBounds.height = screen.height;

    chrome.app.window.create('../index.html', optionsDictionary);
});