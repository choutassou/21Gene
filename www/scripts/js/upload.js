let uploadButton = document.getElementById("upload-button");
let chosenImage = document.getElementById("chosen-image");
let fileName = document.getElementById("file-name");
let uploadArea = document.querySelector(".upload-area");
let error = document.getElementById("error");
let data = {};
const fileHandler = (file, name, type) => {
  if (type !== "text/csv") {
    //File Type Error
    error.innerText = "Please upload a csv file";
    return false;
  }
  error.innerText = "";
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onloadend = (event) => {
    const lines = event.target.result.split('\n');
    for (let line of lines) {
        const [field1, field2] = line.split(',');
        if (field1 && field2) { // 空行を無視
            let eleId="val-" + field1;
            let elem = document.getElementById(eleId);
            data[field1] = parseFloat(field2);
            elem.textContent = field2;
        }
    }
    let data_ = calc_rsu(data)
    document.getElementById("valg-PROLIFERATION").textContent = data_["g-PROLIFERATION"];
    document.getElementById("valg-ESTROGEN").textContent = data_["g-ESTROGEN"];
    document.getElementById("valg-HER2").textContent = data_["g-HER2"];
    document.getElementById("valg-INVASION").textContent = data_["g-INVASION"];
    document.getElementById("val-RSU").textContent = data_["RSU"];
  };
};

//Upload Button
uploadButton.addEventListener("change", () => {
  Array.from(uploadButton.files).forEach((file) => {
    fileHandler(file, file.name, file.type);
  });
});

uploadArea.addEventListener(
  "dragenter",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadArea.classList.add("active");
  },
  false
);

uploadArea.addEventListener(
  "dragleave",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadArea.classList.remove("active");
  },
  false
);

uploadArea.addEventListener(
  "dragover",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadArea.classList.add("active");
  },
  false
);

uploadArea.addEventListener(
  "drop",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadArea.classList.remove("active");
    let draggedData = e.dataTransfer;
    let files = draggedData.files;
    Array.from(files).forEach((file) => {
      fileHandler(file, file.name, file.type);
    });
  },
  false
);

window.onload = () => {
  error.innerText = "";
};