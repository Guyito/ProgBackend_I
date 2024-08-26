export const logMidd =(req, res, next)=>{
    console.log(`peticion del ${new Date().toLocaleDateString()} - url: ${req.url} - metodo: ${req.method}`)

    next()
}