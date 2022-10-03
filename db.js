const{MongoClient}=require('mongodb')
let dbConnction
ConnectionString="mongodb+srv://Abdullahkhan:K_khpz-5MaFahKw@cluster0.djcgmq9.mongodb.net/Bookstore"
module.exports={
    connectToDb: (cb)=>{
        MongoClient.connect(ConnectionString)
        .then((client)=>{dbConnction=client.db()
        return cb()})
        .catch((err)=>{console.log(err)
        return cb})
    },
    getDb:()=> dbConnction
}