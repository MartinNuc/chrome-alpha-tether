chrome.app.runtime.onLaunched.addListener(function(launchData) {
    chrome.app.window.create('../index.html', {
        id: "AlphaTether",
        bounds: {
            width: 1200,
            height: 800
        },
        minWidth: 1200,
        minHeight: 800,
        frame: 'none'
    });
});