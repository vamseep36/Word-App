let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");
let fileName = document.getElementById("file-name");
let saveButton = document.getElementById("save");
let clearButton = document.getElementById("clear");

let fontList = [
    "Arial",
    "Calibri",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "Cursive",
];

const intializer = () => {
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);
    fileName.innerText="Untitled Document";
    fontList.map((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });
     
    const fontSizes = [
        4,5,6,7,8,9,10,11,12,14,16,18,20,22,24,26,28,36,48,72
    ];
    

    for (let i=0;i<19;i++) {
        let option = document.createElement("option");
        option.value = fontSizes[i];
        option.innerHTML = fontSizes[i];
        fontSizeRef.appendChild(option);
    }

    fontSizeRef.value = 8;
};

const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
};

optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);
    });
});

advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value);
    });
});

linkButton.addEventListener("click", () => {
    let userLink = prompt("Enter URL to insert");
    if (/http/i.test(userLink)) {
        modifyText(linkButton.id, false, userLink);
    } else {
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink);
    }
});



fileName.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        textInput.blur();
      }
      if(fileName.innerText==''){
        fileName.innerText = ' ';
      }
    
});

const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            if (needsRemoval) {
                let alreadyActive = false;
                if (button.classList.contains("active")) {
                    alreadyActive = true;
                }
                highlighterRemover(className);
                if (!alreadyActive) {
                    button.classList.add("active");
                }
            } else {
                button.classList.toggle("active");
            }
        });
    });
};

const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    });
};
saveButton.addEventListener("keydown",function(event){
    if(event.key === 's' && event.ctrlKey){
            save();
    }
});

function save(){
    const contentToSave = writingArea.innerText;
    const blob = new Blob([contentToSave], { type: "text/plain" });
    const downloadLink = document.createElement("a");
    downloadLink.download = fileName.innerText; // File name
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.click();
    window.URL.revokeObjectURL(downloadLink.href);
}

saveButton.addEventListener("click", () => {
    save();
  });


const cachedContent = localStorage.getItem('cachedContent');

if (cachedContent) {
    document.getElementById('text-input').innerText = cachedContent;
}

document.getElementById('text-input').addEventListener('input', function() {
    const content = this.innerText;
    localStorage.setItem('cachedContent', content);
});

clearButton.addEventListener("click",function(){
    writingArea.innerText="";
});

window.onload = intializer();