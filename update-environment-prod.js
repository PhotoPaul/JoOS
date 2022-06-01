var fs = require('fs')
fs.readFile('./src/environments/environment.prod.ts', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    fs.readFile('./.hash', 'utf8', function (err, hash) {
        if (err) {
            return console.log(err);
        }
        
        var result = data.replace(/version: \'.*\'/g, 'version: \'' + hash + '\'');

        fs.writeFile('./src/environments/environment.prod.ts', result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
});