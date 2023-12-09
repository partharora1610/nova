import User from "./models/User";

const parth = User.build({ name: "Parth", age: 20 });

console.log(parth);
console.log(parth.get("name"));
