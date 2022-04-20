let members = ["JG", "gu", "soh", "d"];

let i = 0;
while (i < members.length) {
  console.log("array", members[i]);
  i = i + 1;
}

let roles = { programmer: "JG", designer: "gu", machine: "soh" };

console.log(roles.programmer);
console.log(roles["programmer"]);

for (var n in roles) {
  console.log("object", n, "value", roles[n]);
}
