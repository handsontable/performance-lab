(function (w, d) {
  var METRICS = {
    scriptTime:
      "Script execution time in ms, including garbage collection and render (lower is better). " +
      "To keep 60FPS execution time should not exceed 16.6ms.",
    pureScriptTime:
      "Script execution time in ms, without garbage collection nor render (lower is better).",
    renderTime: "Render time in and outside of script in ms (lower is better).",
    gcTime:
      "Garbage collection time in and outside of script in ms (lower is better).",
    gcAmount: "Garbage collection amount in kilobytes (lower is better).",
    majorGcTime: "Time of major garbage collections in ms (lower is better).",
  };

  function parseTooltipMetrics(metric, value) {
    var fps = "";

    if (
      metric === "scriptTime" ||
      metric === "pureScriptTime" ||
      metric === "renderTime"
    ) {
      fps = " (" + ((1000 / parseFloat(value, 10)) >> 0) + "FPS)";
    }

    return parseFloat(value, 10).toFixed(2) + "ms" + fps;
  }

  /**
   * @constructor
   */
  function ChartItem(metric, sampleSize) {
    Observer.call(this);

    this.sampleSize = sampleSize;
    this.chartOptions = {
      barValueSpacing: 1,
      barDatasetSpacing: 0,
      barStrokeWidth: 1,
      barShowStroke: false,
      customTooltips: function (tooltip) {
        if (!tooltip) {
          return;
        }
        if (tooltip.labels) {
          tooltip.title = metric;
          tooltip.labels.forEach(function (value, index) {
            tooltip.labels[index] = parseTooltipMetrics(metric, value);
          });
        } else {
          tooltip.text = parseTooltipMetrics(metric, tooltip.text);
        }
        tooltip.custom = null;
        tooltip.draw();
      },
    };
    this.chart = null;
    this.metric = metric;
    this.container = d.querySelector(".charts");
    this.template = d.importNode(d.querySelector("#chart").content, true);
    this.ctx = this.template.querySelector("canvas").getContext("2d");

    this.template.querySelector(".header").textContent = metric;
    this.template.querySelector(".description").textContent =
      " - " + METRICS[metric];

    this.legendEl = this.template.querySelector(".legend");
    this.container.appendChild(this.template);
    this.createEmptyCharts();
  }

  ChartItem.prototype = Object.create(Observer.prototype, {
    constructor: {
      value: Chart,
      configurable: true,
    },
  });

  ChartItem.METRICS = METRICS;

  /**
   * Render chart data
   *
   * @param {Object|Array|null} data
   */
  ChartItem.prototype.render = function (data) {
    data = data ? (Array.isArray(data) ? data : [data]) : null;

    if (this.chart) {
      this.chart.destroy();
    }
    this.legendEl.textContent = "";

    if (data) {
      this.chart = new Chart(this.ctx).Bar(
        {
          labels: this._generateFixedArray(),
          datasets: data,
        },
        this.chartOptions,
      );

      data.forEach(function (d) {
        this.legendEl.appendChild(this._buildLegendTemplate(d.strokeColor, d));
      }, this);
    } else {
      this.createEmptyCharts();
    }
  };

  /**
   * Create empty charts
   */
  ChartItem.prototype.createEmptyCharts = function () {
    var data = {
      labels: this._generateFixedArray(),
      datasets: [
        {
          data: this._generateFixedArray(),
        },
      ],
    };

    this.chart = new Chart(this.ctx).Bar(data, this.chartOptions);
  };

  /**
   * Build template for chart legend
   *
   * @param {String} color
   * @param {Object} data
   * @returns {Node}
   * @private
   */
  ChartItem.prototype._buildLegendTemplate = function (color, data) {
    var template = d.importNode(d.querySelector("#legend").content, true);

    template.querySelector(".color").style.backgroundColor = color;
    template.querySelector(".description").textContent =
      data.selectedHotVersion + ", " + data.selectedTest;

    return template;
  };

  /**
   * Generate array with fixed size filled by empty strings
   *
   * @returns {Array}
   * @private
   */
  ChartItem.prototype._generateFixedArray = function () {
    return new Array(this.sampleSize).join(",").split(",");
  };

  w.ChartItem = ChartItem;
})(window, document);
