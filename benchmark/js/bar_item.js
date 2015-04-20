
(function(w, d) {
  var colorIndex = -1;

  /**
   * @param barManager
   * @constructor
   */
  function BarItem(barManager) {
    Observer.call(this);
    this.barManager = barManager;
    this.template = null;
    this.selectedHotVersion = null;
    this.selectedTest = null;
    this.uniqColor = this.getFillColor();
    this.chartData = {};
  }

  BarItem.prototype = Object.create(Observer.prototype, {
    constructor: {
      value: BarItem,
      configurable: true
    }
  });

  /**
   * Render bar UI to DOM
   *
   * @returns {HTMLElement}
   */
  BarItem.prototype.renderDOM = function() {
    if (this.template) {
      return this.template;
    }
    var _this = this,
      t, selHotVersion, selTest,
      btnClean,
      form;

    this.template = t = d.importNode(d.querySelector('#bar').content, true);
    form = t.querySelector('form');
    selHotVersion = t.querySelector('select[name=hot-version]');
    selTest = t.querySelector('select[name=test]');
    btnClean = t.querySelector('.btn-clean');

    selHotVersion.appendChild(this._buildOptionsList(Object.keys(this.barManager.getDirMap())));

    selHotVersion.addEventListener('change', function() {
      selTest.textContent = '';
      selTest.appendChild(_this._buildOptionsList(_this.barManager.getDirMap(selHotVersion.value)));
    });

    selTest.addEventListener('change', function() {
      _this.selectedHotVersion = selHotVersion.value;
      _this.selectedTest = selTest.value;

      _this.emit('change', _this);
    });
    btnClean.addEventListener('click', function() {
      selHotVersion.value = '';
      selTest.value = '';

      _this.clearChartData();
      _this.emit('reset', _this);
    });

    return this.template;
  };

  /**
   * Parse and save chart data
   *
   * @param {Object} data
   * @returns {Object}
   */
  BarItem.prototype.parseChartData = function(data) {
    Object.keys(data.description.metrics).forEach(function(metric) {
      var samples = data.completeSample.map(function(sample) {
        return sample.values[metric];
      });

      this.chartData[metric] = {
        fillColor: this.uniqColor(0.7),
        strokeColor: this.uniqColor(1),
        highlightFill: this.uniqColor(1),
        highlightStroke: this.uniqColor(1),
        data: samples
      };
    }, this);

    this.chartData.description = data.description;
  };

  /**
   * @returns {Object}
   */
  BarItem.prototype.hasChartData = function() {
    return this.chartData.description ? true : false;
  };

  /**
   * @returns {Object}
   */
  BarItem.prototype.getChartData = function() {
    return this.chartData;
  };

  /**
   *
   */
  BarItem.prototype.clearChartData = function() {
    this.chartData = {};
  };

  /**
   * @returns {Function}
   */
  BarItem.prototype.getFillColor = function() {
    var color = function(alpha) {
      // yellow #F9CC01
      return 'rgba(249, 204, 1, ' + alpha + ')';
    };

    if (colorIndex === 0) {
      color = function(alpha) {
        // green #00B972
        return 'rgba(0, 185, 114, ' + alpha + ')';
      }
    }
    else if (colorIndex === 1) {
      color = function(alpha) {
        // red #F36247
        return 'rgba(243, 98, 71, ' + alpha + ')';
      }
    }
    else if (colorIndex === 2) {
      color = function(alpha) {
        // blue
        return 'rgba(27, 149, 200, ' + alpha + ')';
      }
    }
    else if (colorIndex === 3) {
      color = function(alpha) {
        // purple #A35DBD
        return 'rgba(163, 93, 189, ' + alpha + ')';
      }
    }
    else {
      colorIndex = 0;
    }
    colorIndex ++;

    return color;
  };

  /**
   * Build options for select element
   *
   * @param {Array|Object} list
   * @returns {DocumentFragment}
   * @private
   */
  BarItem.prototype._buildOptionsList = function(list) {
    var node = d.createDocumentFragment(), option;

    option = d.createElement('option');
    option.value = '';
    option.textContent = '...';

    node.appendChild(option);

    if (Array.isArray(list)) {
      list.forEach(function(item) {
        var option = d.createElement('option');

        option.value = item;
        option.textContent = item;

        node.appendChild(option);
      });
    }
    else {
      Object.keys(list).forEach(function(groupName) {
        var optgroup = d.createElement('optgroup');

        optgroup.label = groupName;

        Object.keys(list[groupName]).forEach(function(testName) {
          var option = d.createElement('option');

          option.value = groupName + '/' + testName;
          option.textContent = testName;

          optgroup.appendChild(option);
        });

        node.appendChild(optgroup);
      });
    }

    return node;
  };

  w.BarItem = BarItem;

}(window, document));
