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
  doSomethingGot: async () => {
    
    console.log("1");
    var result = await ipcRenderer.invoke("doSomethingFetch");

    // makeTable(result[0]);
    // makeStr(result[1]);
    var whattodo = document.getElementById("whattodo");
    whattodo.innerText = JSON.parse(result);
  }
}

ipcRenderer.on("gotData", (event, json) => {

  console.log("2");
  var whattodo = document.getElementById("whattodo");
  whattodo.innerText = JSON.parse(json);
})

contextBridge.exposeInMainWorld("indexBridge", indexBridge);

function makeTable(data) {
  let v = data;
  v = v.replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t")
    .replace(/&#34;/g, "\"")
    .replace(/&#39;/g, "\'")
    .replace(/&gt;/g, "\>")
    .replace(/&lt;/g, "\<");
  //console.log(v);

  try {
    v = JSON.parse(v);

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

      document.getElementById("table").innerHTML = tableHeader + tableContent + tableFooter;
    }
  }
  catch (error) {
    let parent = document.querySelector('#table');
    let fragment = document.createDocumentFragment();
    let p = document.createElement('p');
    p.textContent = "fail to scrap";
    fragment.append(p);
    console.log(error);
  }
}

function makeStr(data){
  v = data;
					v=v.replace(/\n/g, "\\n")
						.replace(/\r/g, "\\r")
						.replace(/\t/g, "\\t")
						.replace(/&#34;/g, "\"")
						.replace(/&#39;/g,"\'")
						.replace(/&gt;/g, "\>")
						.replace(/&lt;/g,"\<");
						
					parent = document.querySelector('#text');
					fragment = document.createDocumentFragment();

					try{
						let w = JSON.parse(v);

						for(e in w) {
							let p = document.createElement('p');
							p.textContent = w[e];
							fragment.append(p);
						};
						//console.log(v);
					}
					catch(error){
						let p = document.createElement('p');
						p.textContent = "fail to scrap";
						fragment.append(p);
						console.log(error);
					}
					
					parent.append(fragment);
}