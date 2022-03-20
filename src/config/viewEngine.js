import express from 'express';
let configViewEngine = (app) => {

    app.use(express.static("./src/public")) //cấu hình để cho server chỉ được lấy ảnh trong thư mục public
    app.set("view engine", "ejs");
    app.set("view", "src/views");
}

//export function để các file js khác có thể sử dụng được function này
module.exports = configViewEngine;