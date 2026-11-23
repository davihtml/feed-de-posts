const express = require('express')

const { DatabaseSync } = require('node:sqlite')
const db = new  DatabaseSync('posts.db')

db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL,
        data TEXT NOT NULL,
        curtida INTEGER NOT NULL DEFAULT 0
    )
`)
    
const app = express()
app.use(express.json())

app.use(express.static(__dirname))

app.get('/posts', function(req, res){

    let lista = db.prepare('SELECT * FROM posts ORDER BY id DESC').all()
    res.json(lista)
})

app.post('/posts', function(req, res){

    let inserir = db.prepare('INSERT INTO posts (content, data) VALUES (?, ?)')
    inserir.run(req.body.content, req.body.data)
    res.json({ criado: true })
    

})

app.delete('/posts/:id', function(req, res){
    let id = Number(req.params.id)
    let apagar = db.prepare('DELETE FROM posts WHERE id = ?').run(id)

    if (apagar.changes == 0){

        res.status(404).json({ erro: 'Não recebi' })
        return

    } else{

        res.json({ apagado: id })
    }
    

})

app.patch('/posts/:id', function(req, res){

    let id = Number(req.params.id)
    let curtir = db.prepare('UPDATE posts SET curtida = curtida + 1 WHERE id = ?').run(id)
    
    if (curtir.changes == 0){

        res.status(404).json({ erro: 'Não achei'})
        return

    } else{

        res.json({ curtido: id})
        
    }
})

app.listen(3000, function(){
    console.log('servidor rodando em http://localhost:3000')
})