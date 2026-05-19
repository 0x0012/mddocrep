// scripts/documents.js

async function loadDocuments() {
  try {
    // CSV to JSON
    const response = await fetch("./scripts/documents.csv");
    const text = await response.text();
    const lines = text.trim().split("\n");
    const headers = lines[0].split(";").map((h) => h.trim());
    const data = lines.slice(1).map((line) => {
      const values = line.split(";").map((v) => v.trim());
      const obj = {};
      headers.forEach((header, i) => {
        obj[header] = values[i] || "";
      });
      return obj;
    });

    const table = document.getElementById("data-table");
    data.forEach((item) => {
      const row = document.createElement("tr");
      const cellId = document.createElement("th");
      const cellDoc = document.createElement("td");
      const cellPrj = document.createElement("td");
      const cellRot = document.createElement("td");
      const cellFol = document.createElement("td");
      const cellUrl = document.createElement("td");

      cellId.scope = "row";
      cellId.textContent = item.id || "";
      cellDoc.textContent = item.name || "";
      cellPrj.textContent = item.project || "";
      cellRot.textContent = item.root || "";
      cellFol.textContent = item.folder || "";

      const button = document.createElement("button");
      button.textContent = "Ver Documento";
      button.type = "button";
      button.className = "btn btn-primary btn-sm";
      button.onclick = () => {
        if (item.url) {
          window.open(item.url, "_blank");
        }
      };
      cellUrl.appendChild(button);

      row.appendChild(cellId);
      row.appendChild(cellDoc);
      row.appendChild(cellPrj);
      row.appendChild(cellRot);
      row.appendChild(cellFol);
      row.appendChild(cellUrl);
      table.appendChild(row);
    });

    console.log(JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error("Error loading CSV:", error);
    return [];
  }
}

function searchTable(text) {
  const table = document.getElementById("data-table");
  const rows = table.getElementsByTagName("tr");
  const searchText = text.toLowerCase();

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.getElementsByTagName("td");
    let found = false;

    for (let j = 0; j < cells.length; j++) {
      if (cells[j].textContent.toLowerCase().includes(searchText)) {
        found = true;
        break;
      }
    }

    row.style.display = found ? "" : "none";
  }
}

form = document.getElementById("search-form");
textInput = document.getElementById("search-text");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  searchTable(textInput.value);
});

loadDocuments();
