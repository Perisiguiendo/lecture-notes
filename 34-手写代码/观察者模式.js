class Subject {
  constructor() {
    this.observers = [];
  }
  add(obs) {
    this.observers.push(obs);
    this.observers = [...new Set(this.observers)];
  }
  remove(obs) {
    let index = this.observers.indexOf(obs);
    this.observers.splice(index, 1);
  }
  notify(...args) {
    this.observers.forEach(v => v.update(...args));
  }
}

class Observer {
  update(...args) {
    console.log(...args);
  }
}

let observer_1 = new Observer();
let observer_2 = new Observer();
let sub = new Subject();
sub.add(observer_1);
sub.add(observer_2);
sub.notify("I changed");
