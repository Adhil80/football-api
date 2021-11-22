let express = require('express');
const { fetchMatches } = require('./helpers/fetch-mathes');
const onStartConfig = require('./onStartConfig');
let router = express()
router.listen(3000, () => {
    console.log(`server started at port 3000\nurl:http://localhost:3000`);
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

