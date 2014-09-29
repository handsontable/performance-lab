(function () {
  var H2 = document.createElement("H2");
  H2.innerHTML = "50 cells in HOT";

  var DIV = document.createElement("DIV");
  DIV.id = "table-container";

  var BUTTON = document.createElement("BUTTON");
  BUTTON.innerHTML = "Create grid!";
  BUTTON.addEventListener("click", function () {
    DIV.removeChild(DIV.firstChild);
    createGrid(DIV);
    DIV.offsetHeight; //trigger paint
  });

  document.body.appendChild(H2);
  H2.appendChild(BUTTON);
  document.body.appendChild(DIV);

  //create grid
  function createGrid(element) {
    var layer = document.createElement('div');
    element.appendChild(layer);

    var dataArray = [];
    var rowCount = getRowCount();
    var colCount = getColCount();

    for (var row = 0; row < rowCount; row++) {
      var dataRow = [];
      for (var col = 0; col < colCount; col++) {
        dataRow.push(getData(row, col));
      }
      dataArray.push(dataRow);
    }

    $(layer).handsontable({
      data: dataArray
    });
    return layer;
  }

  function refreshGrid(layer) {
    $(layer).handsontable("render")
  }

  suite.add('HOT create grid', function () {
    var layer = createGrid(document.body);
    layer.offsetHeight; //trigger paint
    document.body.removeChild(layer);
  });
  suite.add('HOT refresh grid', function () {
    refreshGrid(DIV.firstElementChild);
  });

  createGrid(DIV);
})();