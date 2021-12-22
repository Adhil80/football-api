let express = require('express');
global.TextEncoder = require("util").TextEncoder;
require('core-js/stable')

const { fetchMatches } = require('./helpers/fetch-mathes');
const onStartConfig = require('./onStartConfig');
let router = express()

router.listen(process.env.PORT || 5000, () => {
    console.log(`server started at port 5000\nurl:http://localhost:5000`);
})
router.get('/',async (req, res) => {
    res.send('<h1>Hello</h1>')
})
router.get('/update-matches', (req, res) => {
    onStartConfig.fetchMatches()
    res.send('hi')
})
router.get('/wt',(r,s)=>{
    
})
onStartConfig.setUp()

