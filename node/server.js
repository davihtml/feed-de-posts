const express = require('express')
const app = express()

let posts = [
    { content: 'primeiro post do servidor', data: '21/11/2026, 14:30:00', curtida: 0 },
    { content: 'segundo post', data: '21/11/2026, 14:35:00', curtida: 2 },
    { content: 'terceiro post', data: '21/11/2026, 14:32:00', curtida: 4 }
]

app.get('/', function(req, res){
    res.send('olá, servidor funcionando')
})

app.listen(3000, function(){
    console.log('servidor rodando em http://localhost3000')
})

app.get('/posts', function(req, res){
    res.json(posts)
})