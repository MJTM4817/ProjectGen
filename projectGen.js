const fs = require("fs");

function createFile(fileName, data) {
  fs.writeFile(fileName, data, error => {
    if (error) {
      console.log(error);
    } else {
      console.log("The file has been saved");
    }
  });
}

function createDir(path) {
  fs.mkdir(path, error => {
    if (error) {
      console.log(error);
    } else {
      console.log("The directory has been opened");
    }
  });
}

function readFile(filePath, destFilePath) {
  fs.readFile(filePath, "utf8", (error, data) => {
    if (error) {
      console.log(error);
    } else {
      writeFile(destFilePath, data);
      console.log("I've been read.");
    }
  });
}

function writeFile(filePath, data) {
  fs.writeFile(filePath, data, error => {
    if (error) {
      console.log(error);
    } else {
      console.log("I've been written!");
    }
  });
}

// let filePath = `./${projectName}`;

//   createDir(filePath);
//   createFile(filePath + "/.eslintrc.json");

//   createFile(filePath + "/package.json");
//   readFile("./ProjectTemplate/package.json", filePath + "/package.json");

//   createFile(filePath + "/index.js");
//   createFile(filePath + "/README.md");
//   createFile(filePath + "/.gitignore");

//   createDir(filePath + "/spec");
//   createFile(filePath + "/spec/index.spec.js");

function generate(projectName, fileNames) {
  let filePath = `./${projectName}/`;
  createDir(filePath);
  fileNames.map(file => {
    if (file !== "spec") {
      createFile(filePath + file);
    }
    if (file === "package.json") {
      readFile("./ProjectTemplate/package.json", filePath + file);
    }
  });
  createDir(filePath + "spec");
  if (
    !fs.stat(filePath + "spec", error => {
      if (error) {
        console.log(error);
      } else {
        createFile(filePath + "spec/index.spec.js");
      }
    })
  );
}

function fetchDir(path, projectName) {
  fs.readdir(path, "utf8", (error, fileNames) => {
    if (error) {
      console.log(error);
    } else {
      generate(projectName, fileNames);
    }
  });
}

function temp(projectName) {
  fetchDir("./ProjectTemplate", projectName);
}

temp("Cheryl-Project");

module.exports = {};
