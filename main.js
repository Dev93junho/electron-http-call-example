// Modules to control application life and create native browser window
const { app, BrowserWindow, session } = require("electron");
const path = require("path");
const { ipcMain } = require("electron");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { dialog } = require("electron");

var mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    title: "Just a little tutorial",
    icon: "assets/logo.png",
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "./preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("./views/home/index.html");

  let wc = mainWindow.webContents;
  //wc.openDevTools()

  wc.on("dom-ready", (e) => {
    dialog.showMessageBox(
      (options = {
        message: "Hi! I got called from a WebContents Object",
        title: "This is a message",
      })
    ).then((res) => {
      console.log(res);
    });
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  mainWindow.maximize();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.handle("doSomethingFetch", async () => {
  url = "https://www.lawmaking.go.kr/opnPtcp/nsmLmSts/out?pageIndex=1"
  const response = await fetch("http://f899-34-125-103-31.ngrok.io/getItem?url="+url);
  console.log("0");
  const body = await response.json();
  return body;
});