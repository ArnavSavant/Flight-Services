async function info(req,res) {
   return res.json({message:'FLigths_service API is live. HELLO'});
}

module.exports ={
   info,
}