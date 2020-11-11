const authLogin = (req, res, next) => {
    res.status(200).json({ message: 'jwt token驗證成功' })
}

export default {
    authLogin
}