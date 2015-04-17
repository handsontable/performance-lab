
(function(w, d) {

  /**
   * @constructor
   */
  function BarManager() {
    var _this = this;

    this.barsContainer = d.querySelector('.bars');
    this.bars = [];
    this.charts = [];
    this.dirMap = null;

    this.registerChart('scriptTime');
    this.registerChart('renderTime');
    this.registerChart('pureScriptTime');
    this.registerChart('gcTime');
    this.registerChart('gcAmount');
    this.registerChart('majorGcTime');

    this._fetchDataMap().then(function() {
      _this._createDefaultBars();
      _this.renderDOM();
    });
  }

  /**
   * Get benchmark results directory structure
   *
   * @param {String} [hotVersion] Optionally narrow data to test for specify Handsontable version
   * @returns {Object}
   */
  BarManager.prototype.getDirMap = function(hotVersion) {
    if (hotVersion) {
      return this.dirMap[hotVersion];
    }

    return this.dirMap;
  };

  /**
   * @param {String} metric
   */
  BarManager.prototype.registerChart = function(metric) {
    this.charts.push(new ChartItem(metric));
  };

  /**
   * @param {String} metric
   * @returns ChartItem
   */
  BarManager.prototype.getChart = function(metric) {
    var result;

    this.charts.forEach(function(chart) {
      if (chart.metric === metric) {
        result = chart;
      }
    });

    return result;
  };

  /**
   * Render UI to DOM
   */
  BarManager.prototype.renderDOM = function() {
    this.bars.forEach(function(bar) {
      var element = bar.renderDOM();

      this.barsContainer.appendChild(element);
    }, this);
  };

  /**
   * Render charts
   */
  BarManager.prototype.renderCharts = function() {
    var chartData = {};

    this.bars.forEach(function(bar) {
      if (!bar.hasChartData()) {
        return;
      }
      var barData = bar.getChartData();

      Object.keys(ChartItem.METRICS).forEach(function(metricType) {
        var data = barData[metricType];

        if (!chartData[metricType]) {
          chartData[metricType] = [];
        }
        data.selectedHotVersion = bar.selectedHotVersion;
        data.selectedTest = bar.selectedTest;
        chartData[metricType].push(data);
      });
    });

    Object.keys(ChartItem.METRICS).forEach(function(metricType) {
      var chart = this.getChart(metricType);

      if (!chart) {
        return;
      }
      chart.render(chartData[metricType]);
    }, this);
  };

  /**
   * @param {BarItem} bar
   */
  BarManager.prototype.onBarChanged = function(bar) {
    var _this = this;

    axios.get('results/' + bar.selectedHotVersion + '/' + bar.selectedTest).then(function(response) {
      bar.parseChartData(response.data);
      _this.renderCharts()
    });
  };

  /**
   * @param {BarItem} bar
   */
  BarManager.prototype.onBarReset = function(bar) {
    this.renderCharts();
  };

  /**
   * Fetch directory structure map
   *
   * @returns {Promise}
   * @private
   */
  BarManager.prototype._fetchDataMap = function() {
    var _this = this;

    return new Promise(function(resolve, reject) {
      axios.get('results/map.json').then(function(response) {
        _this.dirMap = response.data;
        delete _this.dirMap['map.json'];

        resolve(response);
      })
    });
  };

  /**
   * Create bar empty slots
   * @private
   */
  BarManager.prototype._createDefaultBars = function() {
    this.bars.push(new BarItem(this));
    this.bars.push(new BarItem(this));
    this.bars.push(new BarItem(this));
    this.bars.push(new BarItem(this));
    this.bars.push(new BarItem(this));

    this.bars.forEach(function(bar) {
      bar.on('change', this.onBarChanged.bind(this));
      bar.on('reset', this.onBarReset.bind(this));
    }, this);
  };

  w.BarManager = BarManager;

}(window, document));
