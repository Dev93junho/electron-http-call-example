const { contextBridge, ipcMain, ipcRenderer } = require('electron')

let indexBridge = {
  // doSomething: async () => {
  //     var result = await ipcRenderer.invoke("doSomething");
  // },
  // doSomethingFetch: async() => {
  //     var result = await ipcRenderer.invoke("doSomethingFetch");
  //     var whattodo = document.getElementById("whattodo");
  //     whattodo.innerText = JSON.parse(result).activity;
  // },
  // doSomethingAxios: async() => {
  //     var result = await ipcRenderer.invoke("doSomethingAxios");
  //     var whattodo = document.getElementById("whattodo");
  //     whattodo.innerText = JSON.parse(result).activity;
  // },
  getScrappy: async () => {

    console.log("getScrappy");
    var result = await ipcRenderer.invoke("getScrappy");

    let result0 = JSON.parse(result[0]);
    let resultTable = makeTable(result0);
    let resultStr = makeStr(result[1]);

    var whattodo = document.getElementById("whattodo");
    whattodo.innerHTML = resultTable;
    whattodo.appendChild(resultStr);

  },
  getImg: async () => {
    
    console.log("getImg");
    var result = await ipcRenderer.invoke("getImg");

    imgBin = result.img;
    imgDsc = result.text;

    var imgContainer = document.getElementById("image");
    imgContainer.src = "data:image/png;base64," + imgBin;
    imgContainer.alt = imgDsc;
  },
}

ipcRenderer.on("gotData", (event, json) => {

  console.log("gotData");
  var whattodo = document.getElementById("whattodo");
  whattodo.innerText = JSON.parse(json);

})

contextBridge.exposeInMainWorld("indexBridge", indexBridge);

function makeTable(data) {
  let v = data;

  try {
    for (i in v) {
      let len = v[i].length;

      // open table
      let tableHeader = "<table><tr>";
      // make header
      for (k in v[i][0]) {
        tableHeader += ("<th>" + k + "</th>");
      }
      tableHeader += "</tr>";

      // make content
      let tableContent = "";
      for (n = 0; n < len; n++) {
        tableContent += "<tr>";
        for (k in v[i][n]) {
          tableContent += "<td>";
          tableContent += v[i][n][k];
          tableContent += "</td>";
        }
        tableContent += "</tr>";
      }
      // close table
      let tableFooter = "</table>";

      return (tableHeader + tableContent + tableFooter);
    }
  }
  catch (error) {
    let fragment = document.createDocumentFragment();
    let p = document.createElement('p');
    p.textContent = "fail to scrap";
    fragment.append(p);
    console.log(error);
  }
}

function makeStr(data) {
  v = JSON.parse(data);

  try {
    let d = document.createElement('div');
    for (e in v) {
      let p = document.createElement('p');
      p.textContent = v[e];
      d.appendChild(p)
    };
    //console.log(v);
    return d;
  }
  catch (error) {
    let fragment = document.createDocumentFragment();
    let p = document.createElement('p');
    p.textContent = "fail to scrap";
    fragment.append(p);
    console.log(error);
  }
}