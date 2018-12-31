const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    width: 1366,
    height: 1024,
    webPreferences: {
      webSecurity: false
    },
    icon: path.join(__dirname, 'icons/png/256x256.png')
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  // if(process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  mainWindow.webContents.openDevTools();
  // }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});