// Include the cluster module
const { noIndex } = require('./utils/inject');
const cluster = require('cluster');

// Code to run if we're in the master process
if (cluster.isMaster) {

  // Count the machine's CPUs
  const cpuCount = require('os').cpus().length;

  // Create a worker for each CPU
  for (let i = 0; i < cpuCount; i += 1) {
    if (!i) noIndex();
    cluster.fork();
  }

  // Listen for terminating workers
  cluster.on('exit', function (worker) {
    // Replace the terminated workers
    console.log('Worker ' + worker.id + ' died :(');
    cluster.fork();
  });

// Code to run if we're in a worker process
} else {
  const compression = require('compression');
  const express = require('express');
  const path = require('path');
  const favicon = require('serve-favicon');
  const logger = require('morgan');
  const cookieParser = require('cookie-parser');
  const bodyParser = require('body-parser');
  const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS
  const cors = require('cors');
  const spdy = require('spdy');

  const index = require('./routes/index');

  const app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hjs');

  // uncomment after placing your favicon in /public
  app.use(compression());
  app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'dist')));
  app.use(cors());
  app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

  app.use('/', index);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  const options = {
  // Private key
  //key: fs.readFileSync(__dirname + '/keys/spdy-key.pem'),

  // Fullchain file or cert file (prefer the former)
  //cert: fs.readFileSync(__dirname + '/keys/spdy-fullchain.pem'),

  spdy: {
    protocols: [ 'h2', 'spdy/3.1', 'http/1.1' ],
    plain: true,

    // **optional**
    // Parse first incoming X_FORWARDED_FOR frame and put it to the
    // headers of every request.
    // NOTE: Use with care! This should not be used without some proxy that
    // will *always* send X_FORWARDED_FOR
    'x-forwarded-for': true,

    connection: {
      // **optional** if true - server will send 3.1 frames on 3.0 *plain* spdy
      autoSpdy31: false
    }
  }};

  const server = spdy.createServer(options, app);
  const port = process.env.PORT || 4242;

  server.listen(port, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Server running at http://localhost:' + port + '/');
    }
  });

}
