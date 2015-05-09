chrome.app.runtime.onLaunched.addListener(function(launchData) {
    chrome.app.window.create('../index.html', {
        id: "AlphaTether",
        bounds: {
            width: 800,
            height: 600
        },
        minWidth: 800,
        minHeight: 600,
        frame: 'none'
    });
});