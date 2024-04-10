// ./build_installer.js

// 1. Import Modules
const { MSICreator } = require('electron-wix-msi')
const path = require('path')

// 2. Define input and output directory.
// Important: the directories must be absolute, not relative e.g
// appDirectory: "C:\\Users\sdkca\Desktop\OurCodeWorld-win32-x64",
const APP_DIR = path.resolve(__dirname, './dist/win-unpacked')
// outputDirectory: "C:\\Users\sdkca\Desktop\windows_installer",
const OUT_DIR = path.resolve(__dirname, './windows_installer')

// 3. Instantiate the MSICreator
const msiCreator = new MSICreator({
  appDirectory: APP_DIR,
  outputDirectory: OUT_DIR,

  // Configure metadata
  description: 'A notes app built with Electron by Pol Gubau Amores',
  exe: 'notes',
  name: 'Notes by Pol :)',
  manufacturer: 'PolGubau',
  language: 1033,
  version: '1.0.0',
  shortcutName: 'notes',
  shortName: 'notes',

  // Configure installer User Interface
  ui: {
    chooseDirectory: true,
    images: {
      banner: path.resolve(__dirname, 'resources', 'banner.jpg'),
      background: path.resolve(__dirname, 'resources', 'background.jpg')
    }
  }
})

// 4. Create a .wxs template file
msiCreator.create().then(function () {
  // Step 5: Compile the template to a .msi file
  msiCreator.compile()
})
