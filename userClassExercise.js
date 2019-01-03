class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    compare(person) {
        return this.age > person.age ? `${this.name} is older than ${person.name} by ${this.age - person.age} years` :
            `${person.name} is older than ${this.name} by ${person.age - this.age} years`;
    }
}

let p1 = new User('Gash', 24);
let p2 = new User('Wolf', 18);

console.log(p2.compare(p1));

