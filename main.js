const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let win = null;

const createWindow = () => {
  win = new BrowserWindow({
    width: 1200,
    height: 800
  });
  const URL = url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  });
  win.loadURL('http://localhost:8089/#/');
  win.webContents.openDevTools();
  win.on('close', () => {
    win = null;
  });
};

app.on('ready', createWindow);
app.on('window-all-close', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (win === null) createWindow();
});
