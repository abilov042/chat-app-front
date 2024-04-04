const exoress = require('express')
const path = require('path');
const app = exoress();
app.use(exoress.static(path.join(_dirname, 'build')));
app.get('/*', function(req,res){
    res.sendFile(path.join(_dirname, 'build', 'index,html'))
})
app.listen(9000);