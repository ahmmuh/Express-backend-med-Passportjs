import bcrypt from "bcrypt";

const plainPassword = "user"; // eller prova med andra variationer, tex "user\n"
const hash = "$2b$10$BMlCFNaUkSucVbCgp0csHehmX/JQhjWoJB.mwGW/Q2MLAxN7zmEc.";

bcrypt.compare(plainPassword, hash).then((result) => {
  console.log("Manual compare result:", result);
});
