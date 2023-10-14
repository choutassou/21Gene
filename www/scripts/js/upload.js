let uploadButton = document.getElementById("upload-button");
let chosenImage = document.getElementById("chosen-image");
let fileName = document.getElementById("file-name");
let uploadArea = document.querySelector(".upload-area");
let error = document.getElementById("error");

const fileHandler = (file, name, type) => {
  if (type !== "text/csv") {
    //File Type Error
    error.innerText = "Please upload an csv file";
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
            elem.textContent = field2;
        }
    }
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