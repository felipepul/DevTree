import colors from 'colors'
import server from './server';


const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(colors.red.bold('Server is running on port:'), port);
});