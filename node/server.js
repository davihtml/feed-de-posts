const express = require('express')
const app = express()
app.use(express.json())

app.use(express.static(__dirname))

let posts = []

app.get('/posts', function(req, res){
    res.json(posts)
})

app.post('/posts', function(req, res){
    let novo = req.body
    posts.unshift(novo)
    res.json(novo)
})


app.listen(3000, function(){
    console.log('servidor rodando em http://localhost:3000')
})
