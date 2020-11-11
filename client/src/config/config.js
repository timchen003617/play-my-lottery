const config = {
    development: {
        node_server: 'http://localhost:3000'
    },
    production: {
        node_server: 'https://play-my-lottery.herokuapp.com'
    }
}

export default config[process.env.NODE_ENV]

