const JSRSASign = require("jsrsasign");

const claims = {
 Username: "ahmed",
 Age: 27,
 Fullname: "ahmed Hassan"
}

const key = "$AhmedIsAwesome!";

const header = {
 alg: "HS512",
 typ: "JWT"
};

var sHeader = JSON.stringify(header);
var sPayload = JSON.stringify(claims);

const sJWT = JSRSASign.jws.JWS.sign("HS512", sHeader, sPayload, key);

console.log(sJWT);

const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImFobWVkIiwiQWdlIjoyNywiRnVsbG5hbWUiOiJhaG1lZCBIYXNzYW4ifQ.fO8ozcUqutzNBPwsrQ5ZaJOBXQhqqodsjGIibzXjGADF-bkkCL_rTeQtmn-0PyF0BtccvsnnavSlmkox4kSWAg";

const algorithm = "HS512";
const key2 = "$AhmedIsAwesome!";

console.log(
 JSRSASign.jws.JWS.verifyJWT(token, key2, {
  alg: [algorithm]
 })
);

const aJWT = token.split(".");
const uHeader = JSRSASign.b64utos(aJWT[0]);
const uClaim = JSRSASign.b64utos(aJWT[1]);

const pHeader = JSRSASign.jws.JWS.readSafeJSONString(uHeader);
const pClaim = JSRSASign.jws.JWS.readSafeJSONString(uClaim);

console.log(pHeader);
console.log(pClaim);