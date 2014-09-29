(function () {
  var H2 = document.createElement("H2");
  H2.innerHTML = "50 cells in TABLE";

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
    var layer = document.createElement('TABLE');
    renderGrid(layer);
    element.appendChild(layer);
    return layer;
  }

  //only DOM writes permitted here. No DOM reads!!!!!
  function renderGrid(layer) {
    var cells = [];
    var rowCount = getRowCount();
    var colCount = getColCount();

    for (var row = 0; row < rowCount; row++) {
      var TR = document.createElement('TR');
      for (var col = 0; col < colCount; col++) {
        var TD = document.createElement('TD');
        TD.appendChild(document.createTextNode(getData(row, col)));
        TR.appendChild(TD);
        cells.push(TD);
      }
      layer.appendChild(TR);
    }

    return cells;
  }

  suite.add('TABLE create grid', function () {
    var layer = createGrid(document.body);
    layer.offsetHeight; //trigger paint
    document.body.removeChild(layer);
  });

  createGrid(DIV);
})();