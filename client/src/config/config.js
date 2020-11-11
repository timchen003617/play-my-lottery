const config = {
    development: {
        node_server: 'http://localhost:3000'
    },
    production: {
        node_server: 'http://localhost:3000'
    }
}

export default config[process.env.NODE_ENV]

