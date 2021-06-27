const { app, BrowserWindow } = require("electron"); // import electron

app.whenReady().then(() => {
  // wait until app has completed basic setup
  // declare window
  const win = new BrowserWindow({
    width: 600,
    height: 500,
  });
  win.loadFile("index.html"); // load html
});
// handle app closing
app.on("window-all-closed", () => {
  // don't fully close app on mac as this is the expected behavior
  if (process.platform != "darwin") app.quit();
});
