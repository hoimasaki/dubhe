const fs = require('fs');

if (fs.existsSync('./dist')) {
    deleteDirectory('./dist');
}
// 重建目录结构

fs.mkdirSync('./dist');

fs.mkdirSync('./dist/oplan');
fs.mkdirSync('./dist/oplan/server');
fs.mkdirSync('./dist/oplan/server/downfiles');

fs.mkdirSync('./dist/oa');
fs.mkdirSync('./dist/oa/server');
fs.mkdirSync('./dist/oa/server/downfiles');


fs.mkdirSync('./dist/abtest');
fs.mkdirSync('./dist/abtest/server');
fs.mkdirSync('./dist/abtest/server/downfiles');

function deleteDirectory(root) {

    let files = fs.readdirSync(root);//读取该文件夹

    files.forEach(function (file) {

        let stats = fs.statSync(root + '/' + file);

        if (stats.isDirectory()) {
            deleteDirectory(root + '/' + file);
        } else {
            fs.unlinkSync(root + '/' + file);
        }
    });

    fs.rmdirSync(root);
}
