const express = require('express');
const path = require('path');
const cors = require('cors');
const { create } = require('express-handlebars');
const bodyparser = require('body-parser');

const products = [];
const app = express();

const hbs = create({
	layoutsDir: 'views/layouts/',
	partialsDir: 'views/partials/',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, './views'));
app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json({ type: 'application/json' }));
app.use(express.static('public/'));

app.get('/', (req, res) => {
	res.render('form');
});

app.get('/productos', (req, res) => {
	res.render('products', { products });
});

app.post('/productos', (req, res) => {
	let product = req.body;
	products.push(product);
	res.redirect('/');
});

const PORT = 8080;
const server = app.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto ${server.address().port}`);
});
server.on('error', (error) => console.error(`Error en el servidor ${error}`));
