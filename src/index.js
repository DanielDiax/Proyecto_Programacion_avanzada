//Aca estoy llamando el app y la base de datos

import app from './app';
import './database';

app.listen(app.get('port'));

console.log('server on port', app.get('port'));