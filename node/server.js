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
    novo.id = Date.now()
    posts.unshift(novo)
    res.json(novo)

})

app.delete('/posts/:id', function(req, res){
    let id = Number(req.params.id)
    let pos = posts.findIndex(function(p){ return p.id == id})

    if (pos == -1){

        res.status(404).json({ erro: 'Não achei'})

        return

    }else {
        
        posts.splice(pos, 1)
        res.json({ apagado: id })

    }

})

app.listen(3000, function(){
    console.log('servidor rodando em http://localhost:3000')
})