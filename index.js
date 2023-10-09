"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Please use axios for your API requests
var axios_1 = require("axios");
// Find the docs at https://api.metiundo.de/v1/docs
// const baseUrl = "https://api.metiundo.de/v1";
var config = {
    headers: {}
};
var data = {
    "email": "eve.holt@reqres.in",
    "password": "cityslicka"
};
//axios.get('https://reqres.in/api/users?page=2')
axios_1.default.post('https://reqres.in/api/login', data)
    .then(function (res) {
    console.log(res.data.token);
    var token = res.data.token;
    if (token) {
        axios_1.default.get('https://reqres.in/api/users?page=2', { headers: { Authorization: "Bearer ".concat(token) } })
            .then(function (userRes) {
            console.log(userRes.data);
            console.log("sdfds");
        });
    }
}).catch(function (error) {
    console.log(error);
});
