import User from "./models/User";

const user = new User({ name: "parth", age: 22 });

const name = user.get("name");
user.on("change", () => {
  console.log("change");
});

console.log("name: " + name);
console.log(user);
