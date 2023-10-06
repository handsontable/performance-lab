(function (w, d) {
  /**
   * @constructor
   */
  function BarManager(statsMap, sampleSize) {
    this.barsContainer = d.querySelector(".bars");
    this.bars = [];
    this.charts = [];
    this.statsMap = statsMap;
    this.sampleSize = sampleSize || 100;

    this.registerChart("scriptTime");
    this.registerChart("renderTime");
    this.registerChart("pureScriptTime");
    this.registerChart("gcTime");
    this.registerChart("gcAmount");
    this.registerChart("majorGcTime");

    this._createDefaultBars();
    this.renderDOM();
  }

  /**
   * Get benchmark results.
   *
   * @param {String} [hotVersion] Optionally narrow data to test for specify Handsontable version
   * @returns {Object}
   */
  BarManager.prototype.getStatsMap = function (hotVersion) {
    if (hotVersion) {
      return this.statsMap.get(hotVersion.replace(/\./g, "_"));
    }

    return this.statsMap;
  };

  /**
   * @param {String} metric
   */
  BarManager.prototype.registerChart = function (metric) {
    this.charts.push(new ChartItem(metric, this.sampleSize));
  };

  /**
   * @param {String} metric
   * @returns ChartItem
   */
  BarManager.prototype.getChart = function (metricName) {
    var result;

    this.charts.forEach(function (chart) {
      if (chart.metric === metricName) {
        result = chart;
      }
    });

    return result;
  };

  /**
   * Render UI to DOM
   */
  BarManager.prototype.renderDOM = function () {
    this.bars.forEach(function (bar) {
      this.barsContainer.appendChild(bar.renderDOM());
    }, this);
  };

  /**
   * Render charts
   */
  BarManager.prototype.renderCharts = function () {
    var chartData = {};

    this.bars.forEach(function (bar) {
      if (!bar.hasChartData()) {
        return;
      }
      var barData = bar.getChartData();

      Object.keys(ChartItem.METRICS).forEach(function (metricType) {
        var data = barData[metricType];

        if (!chartData[metricType]) {
          chartData[metricType] = [];
        }
        data.selectedHotVersion = bar.selectedHotVersion;
        data.selectedTest = bar.selectedTest;
        chartData[metricType].push(data);
      });
    });

    Object.keys(ChartItem.METRICS).forEach(function (metricType) {
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
  BarManager.prototype.onBarChanged = function (bar) {
    var _this = this;

    var chartData = this.getStatsMap(bar.selectedHotVersion).filter(
      function (sample) {
        return sample.id === bar.selectedTest;
      },
    )[0];

    bar.parseChartData(chartData);
    this.renderCharts();
  };

  /**
   * @param {BarItem} bar
   */
  BarManager.prototype.onBarReset = function (bar) {
    this.renderCharts();
  };

  /**
   * Create bar empty slots
   * @private
   */
  BarManager.prototype._createDefaultBars = function () {
    this.bars.push(new BarItem(this));
    this.bars.push(new BarItem(this));
    this.bars.push(new BarItem(this));
    this.bars.push(new BarItem(this));
    this.bars.push(new BarItem(this));

    this.bars.forEach(function (bar) {
      bar.on("change", this.onBarChanged.bind(this));
      bar.on("reset", this.onBarReset.bind(this));
    }, this);
  };

  w.BarManager = BarManager;
})(window, document);
