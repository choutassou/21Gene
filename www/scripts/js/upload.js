let uploadButton = document.getElementById("upload-button");
let chosenImage = document.getElementById("chosen-image");
let fileName = document.getElementById("file-name");
let container = document.querySelector(".container");
let error = document.getElementById("error");
let dataDisplay = document.getElementById("data-display");

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
    dataDisplay.innerHTML = ""; // 内容をクリア

    for (let line of lines) {
        const [field1, field2] = line.split(',');
        if (field1 && field2) { // 空行を無視
            const formatted = document.createElement('div');
            formatted.textContent = `${field1}=${field2}`;
            dataDisplay.appendChild(formatted);
        }
    }
  };
};

//Upload Button
uploadButton.addEventListener("change", () => {
  dataDisplay.innerHTML = "";
  Array.from(uploadButton.files).forEach((file) => {
    fileHandler(file, file.name, file.type);
  });
});

container.addEventListener(
  "dragenter",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.classList.add("active");
  },
  false
);

container.addEventListener(
  "dragleave",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.classList.remove("active");
  },
  false
);

container.addEventListener(
  "dragover",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.classList.add("active");
  },
  false
);

container.addEventListener(
  "drop",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.classList.remove("active");
    let draggedData = e.dataTransfer;
    let files = draggedData.files;
    dataDisplay.innerHTML = "";
    Array.from(files).forEach((file) => {
      fileHandler(file, file.name, file.type);
    });
  },
  false
);

window.onload = () => {
  error.innerText = "";
};