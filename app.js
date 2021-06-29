const { app, BrowserWindow } = require("electron"); // import electron

app.whenReady().then(() => {
  // wait until app has completed basic setup
  // declare window
  const win = new BrowserWindow({
    width: 500,
    height: 520,
    resizable: false,
  });
  win.setAlwaysOnTop(true); // debugging
  win.menuBarVisible = false;
  win.loadFile("index.html"); // load html

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// handle app closing
app.on("window-all-closed", () => {
  // don't fully close app on mac as this is the expected behavior
  if (process.platform != "darwin") app.quit();
});
