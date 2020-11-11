const config = {
    development: {
        node_server: 'http://localhost:8080'
    },
    production: {
        node_server: 'https://play-my-lottery.herokuapp.com'
    }
}

export default config[process.env.NODE_ENV]

