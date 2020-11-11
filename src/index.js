import server from './app';
import config from './config'

server.listen(process.env.PORT || config.port, () => {
    console.log(`start server web on ${process.env.NODE_ENV}, port:${process.env.PORT || config.port}`);
});