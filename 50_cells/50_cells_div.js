(function () {
  var H2 = document.createElement("H2");
  H2.innerHTML = "50 cells in DIV";

  var DIV = document.createElement("DIV");
  DIV.id = "div-container";

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
    var layer = document.createElement('DIV');
    layer.className = "layer";
    var cells = renderGrid(layer);
    element.appendChild(layer);

    var colCount = getColCount();
    var rowCount = getRowCount();
    var cellWidths = measureCellDimensions(cells, 'offsetWidth');
    var cellHeights = measureCellDimensions(cells, 'offsetHeight');
    var colWidths = getColWidths(cellWidths, colCount);
    var rowHeights = getRowHeights(cellHeights, rowCount);
    var cellWidths = getAlignedColWidths(colWidths, rowCount)
    var cellLefts = getAlignedColLefts(colWidths, rowCount);
    var cellHeights = getAlignedRowHeights(rowHeights, colCount);
    var cellTops = getAlignedRowTops(rowHeights, colCount);
    applyToDOM(cells, cellWidths, cellLefts, cellHeights, cellTops);

    return layer;
  }

  //only DOM writes permitted here. No DOM reads!!!!!
  function renderGrid(layer) {
    var cells = [];
    var rowCount = getRowCount();
    var colCount = getColCount();

    for (var row = 0; row < rowCount; row++) {
      for (var col = 0; col < colCount; col++) {
        var cell = document.createElement('DIV');
        cell.className = "cell";
        cell.appendChild(document.createTextNode(getData(row, col)));
        layer.appendChild(cell);
        cells.push(cell);
        cell.offsetHeight;
      }
    }
    return cells;
  }

  function measureCellDimensions(cells, propName) {
    var widths = [];
    var cellCount = cells.length;
    for (var cell = 0; cell < cellCount; cell++) {
      widths.push(cells[cell][propName]);
    }
    return widths;
  }

  function getColWidths(cellWidths, colCount) {
    var cellCount = cellWidths.length;
    var colWidths = [];
    for (var cell = 0; cell < cellCount; cell++) {
      if (cell < colCount) {
        colWidths.push(cellWidths[cell]);
      }
      else {
        var col = cell % colCount;
        if (cellWidths[cell] > colWidths[col]) {
          colWidths[col] = cellWidths[cell];
        }
      }
    }
    return colWidths;
  }

  function getRowHeights(cellHeights, rowCount) {
    var cellCount = cellHeights.length;
    var colCount = cellCount / rowCount;
    var rowHeights = [];
    var row = -1;
    for (var cell = 0; cell < cellCount; cell++) {
      if (cell % colCount == 0) {
        row++;
      }
      if (row == rowHeights.length) {
        rowHeights.push(cellHeights[cell]);
      }
      else {
        if (cellHeights[cell] > rowHeights[row]) {
          rowHeights[row] = cellHeights[cell];
        }
      }
    }
    return rowHeights;
  }

  function getAlignedColWidths(colWidths, rowCount) {
    var widths = [];
    var colCount = colWidths.length;
    var cellCount = colCount * rowCount;
    for (var cell = 0; cell < cellCount; cell++) {
      var col = cell % colCount;
      widths.push(colWidths[col]);
    }
    return widths;
  }

  function getAlignedColLefts(colWidths, rowCount) {
    var offsets = [];
    var colCount = colWidths.length;
    var cellCount = colCount * rowCount;
    var offset = 0;
    for (var cell = 0; cell < cellCount; cell++) {
      var col = cell % colCount;
      if (col == 0) {
        offset = 0;
      }
      offsets.push(offset);
      offset += colWidths[col];
    }
    return offsets;
  }

  function getAlignedRowHeights(rowHeights, colCount) {
    var heights = [];
    var rowCount = rowHeights.length;
    var cellCount = colCount * rowCount;
    var row = -1;
    for (var cell = 0; cell < cellCount; cell++) {
      var col = cell % colCount;
      if (col == 0) {
        row++;
      }
      heights.push(rowHeights[row]);
    }
    return heights;
  }

  function getAlignedRowTops(rowHeights, colCount) {
    var offsets = [];
    var rowCount = rowHeights.length;
    var cellCount = colCount * rowCount;
    var row = -1;
    var offset = 0;
    for (var cell = 0; cell < cellCount; cell++) {
      if (cell % colCount == 0) {
        row++;
        if (row > 0) {
          offset += rowHeights[row - 1];
        }
      }
      offsets.push(offset);
    }
    return offsets;
  }

  //only DOM writes permitted here. No DOM reads!!!!!
  function applyToDOM(cells, cellWidths, cellWidthOffsets, cellHeights, cellHeightOffsets) {
    var cellCount = cells.length;
    for (var cell = 0; cell < cellCount; cell++) {
      var style = cells[cell].style;
      style.width = cellWidths[cell] + 'px';
      style.left = cellWidthOffsets[cell] + 'px';
      style.height = cellHeights[cell] + 'px';
      style.top = cellHeightOffsets[cell] + 'px';
      if (cellWidthOffsets[cell] === 0) {
        cells[cell].className += " firstCol";
      }
      if (cellHeightOffsets[cell] === 0) {
        cells[cell].className += " firstRow";
      }
    }
    cells[0].parentNode.style.height = cellHeightOffsets[cellCount - 1] + cellHeights[cellCount - 1] + 'px';
  }

  //tests
  console.log("Should be 5 rows", assertEqual(getRowCount(), 5));
  console.log("Should be 10 columns", assertEqual(getColCount(), 10));
  console.log("Data at row 2 column 4 should be 2.4", assertEqual(getData(2, 4), "2.4"));
  console.log("Col widths", assertEqual(getColWidths([11, 22, 33, 44, 55, 66], 3), [44, 55, 66]));
  console.log("Row heights", assertEqual(getRowHeights([11, 22, 33, 44, 55, 66], 2), [33, 66]));
  console.log("Aligned col widths", assertEqual(getAlignedColWidths([44, 55, 66], 2), [44, 55, 66, 44, 55, 66]));
  console.log("Aligned col lefts", assertEqual(getAlignedColLefts([44, 55, 66], 2), [0, 44, 99, 0, 44, 99]));
  console.log("Aligned row heights", assertEqual(getAlignedRowHeights([33, 66], 3), [33, 33, 33, 66, 66, 66]));
  console.log("Aligned row tops", assertEqual(getAlignedRowTops([33, 66], 3), [0, 0, 0, 33, 33, 33]));


  suite.add('DIV create grid', function () {
    if (DIV.firstElementChild) {
      DIV.removeChild(DIV.firstElementChild);
    }
    createGrid(DIV);
    DIV.offsetHeight; //trigger paint
  });

  createGrid(DIV);
})();