(function (w, d) {
  /**
   * Simple implementation event observer pattern
   */
  function Observer() {
    this.listeners = {};
  }

  Observer.prototype.emit = function (name, args) {
    if (!this.listeners[name]) {
      return this;
    }
    var items = this.listeners[name];
    var itemsLength = this.listeners[name].length;
    var i = 0;

    while (i < itemsLength) {
      items[i].apply(this, Array.isArray(args) ? args : [args]);
      i++;
    }
  };

  Observer.prototype.on = function (name, callback) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }
    if (this.listeners[name].indexOf(callback) === -1) {
      this.listeners[name].push(callback);
    }

    return this;
  };

  w.Observer = Observer;
})(window, document);
