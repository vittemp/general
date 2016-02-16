Object.prototype.extends = function (properties) {
  function f() {};
	var prop;
    f.prototype = Object.create(this);
    for (prop in properties) {
        f.prototype[prop] = properties[prop];
	};

	f.prototype._super = this;
	return new f();
}

var employee = {
  init: function init(name, salary){
    this.name = name;
    this.salary = salary;
    return this;
  },
  
  sayHello: function sayHello(){
    return "Hello, I am " + this.name;
  },
  saySalary: function saySalary(){
    return "Hello, I get " + this.salary + "K EUR";
  },
  
  sayWorkers: function sayWorkers(){ 
    if (this.workers === undefined){
      return "I am a worker, I do not have employees.";
    }else{
      return "Hello, I get " + this.workers + " employees.";
    }
  }
};
  
var boss = employee.extends({
  init:function init(name,salary,workers){
    this._super.init.call(this,name,salary)
    this.workers = workers;
    return this;
  },
  
  sayHello: function sayHello(){
    return this._super.sayHello.call(this) + " and I am boss!";
  },
  
  saySalary: function sayHello(){
    return this._super.saySalary.call(this) + " and I am boss!";
  },
  
  sayWorkers: function sayWorkers(){
    return this._super.sayWorkers.call(this);
  }
  
});

var e = Object.create(employee).init("Vitosh",140);

console.log(e.sayHello());
console.log(e.saySalary());
console.log(e.sayWorkers());

var b = Object.create(boss).init("Vitosh-Boss",240,4);

console.log(b.sayHello());
console.log(b.saySalary());
console.log(b.sayWorkers());



