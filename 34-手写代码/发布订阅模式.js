class EventBus {
  constructor() {
    this.handleMaps = {};
  }
  /**
  * 订阅方法
  * @param {String} type 类型名称
  * @param {Function} handler 订阅待执行的方法
  */
  on(type, handler) {
    if (!handler instanceof Function) {
      throw new Error("请传入函数类型");
    }
    if (!(type in this.handleMaps)) {
      this.handleMaps[type] = [];
    }
    this.handleMaps[type].push(handler);
  }
  /**
  * 发布方法
  * @param {String} type 类型名称
  * @param {*} params 传入待执行的参数
  */
  emit(type, params) {
    if (type in this.handleMaps) {
      this.handleMaps[type].forEach((v) => {
        v(params);
      });
    }
  }
  /**
  * 销毁方法
  * @param {String} type 类型名称
  */
  off(type) {
    if (type in this.handleMaps) {
      delete this.handleMaps[type];
    }
  }
}
