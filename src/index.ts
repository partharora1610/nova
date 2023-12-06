import User from "./models/User";

const user = new User({ name: "parth", age: 22 });

const name = user.get("name");

console.log("name: " + name);
