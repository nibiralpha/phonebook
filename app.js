const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const mongoose = require('mongoose');

const config = require('./Server/Config/config');
const appRoute = require('./Server/route');

// mongoose.connect(config.DBURL,
// 	{ useNewUrlParser: true, useUnifiedTopology: true }
// );

// mongoose.connection.on('error', console.error);

const app = new Koa();

app.use(cors());
app.use(koaBody());
app.use(appRoute.routes());

app.listen(config.PORT, () =>
	console.log(`✅  The server is running at http://localhost:${config.PORT}/`)
);