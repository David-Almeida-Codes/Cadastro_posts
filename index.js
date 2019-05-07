const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/Post')


//config - engine view
	//template engine
	app.engine('handlebars', handlebars({defaultLayout: 'main'}))
	app.set('view engine', 'handlebars')

	//body-parser
	app.use(bodyParser.urlencoded({extended: false}))
	app.use(bodyParser.json())


// Routes

	app.get('/', (req, res)=>{
		Post.findAll({order: [['id', 'DESC']]}).then((posts)=>{
			res.render('home', {posts: posts})
		})
	})

	app.get('/cad', (req, res)=>{
		res.render('formulario')
	})

	app.post('/add', (req, res)=>{
		Post.create({
			titulo: req.body.titulo,
			conteudo: req.body.conteudo
		}).then(()=>{
			res.redirect('/')
		}).catch((error)=>{
			res.send('Falha ao criar a postagem', error)
		})
	})

	app.get('/deletar/:id', (req, res)=>{
		Post.destroy({where: {'id': req.params.id}}).then(()=>{
			res.send('Post deletado com sucesso')
		}).catch((error)=>{
			res.send('esta msg nao existe')
		})
	})


app.listen(3000, ()=>{
	console.log('Server is running on: http://localhost:3000')
})