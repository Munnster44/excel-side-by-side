// app.js - Logic for Excel Side-by-Side Viewer v3.3.3-r3
// © 2025 Glen Carruthers

function readExcelFile(file, callback) {
  const reader = new FileReader();
  reader.onload = e => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const html = XLSX.utils.sheet_to_html(firstSheet, { editable: false });
    callback(html);
  };
  reader.readAsArrayBuffer(file);
}

function loadFiles() {
  const f1 = document.getElementById('file1').files[0];
  const f2 = document.getElementById('file2').files[0];
  if (!f1 || !f2) {
    alert('Please select both Excel files first.');
    return;
  }

  // Load both Excel sheets into side-by-side iframes
  readExcelFile(f1, html => (document.getElementById('frame1').srcdoc = html));
  readExcelFile(f2, html => (document.getElementById('frame2').srcdoc = html));
}

// Create Compare button dynamically
const button = document.createElement('button');
button.textContent = "Load & Compare Files";
button.style.marginTop = "15px";
button.onclick = loadFiles;
document.getElementById('buttons').appendChild(button);
