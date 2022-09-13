// Modules to control application life and create native browser window
const { app, BrowserWindow, session } = require("electron");
const path = require("path");
const { ipcMain } = require("electron");
const { net } = require("electron");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const axios = require("axios");
const got = (...args) => import("got").then(({ default: got }) => got(...args));
const { dialog } = require("electron");

var mainWindow;
let icounter = 0;
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

ipcMain.handle("doSomethingAxios", async () => {
  const response = await fetch("http://ad05-35-196-154-162.ngrok.io/");
  const body = await response.text();
  console.log(body)
  return body;
});