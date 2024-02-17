const testPostController=(req, res)=>{
    const {name}=req.body;
    res.status(200).send(`${name}`)
}

export default testPostController