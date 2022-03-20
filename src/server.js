import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import connectDB from './config/connectDB';
require('dotenv').config(); //gọi được đén hàm config trong thư viên env


let app = express();

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app);
initWebRoutes(app);
connectDB();

//lấy tham số trong file env
let port = process.env.PORT || 6969; //nếu port không xác định thì sẽ chạy cổng 6969
app.listen(port, () => {
    //callback
    console.log("server is running on the port: " + port);
})