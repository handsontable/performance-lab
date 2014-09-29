//data helper
function getData(row, col) {
  if (row == 3 && col == 3) {
    return "Veryveryvery\nlongtext"
  }
  return row + "." + col;
}

function getRowCount() {
  return 5;
}

function getColCount() {
  return 10;
}

//test helper
function assertEqual(a, b) {
  if (typeof a === 'object') {
    for (var key in a) {
      if (a.hasOwnProperty(key)) {
        if (a[key] !== b[key]) {
          console.error("expected", b, " ... actually", a);
          return false;
        }
      }
    }
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        if (a[key] !== b[key]) {
          console.error("expected", b, " ... actually", a);
          return false;
        }
      }
    }
    return true;
  }
  else {
    return a === b;
  }
}