const express = require('express');
const app = express();
const connectDB = require('./db');
const routes = require('./router/route');
const cors = require('cors');
//const { authRoute } = require('./controller/control');
// const {authroute} = require('./authroutes');
// const { MongoClient } = require('mongodb');




app.use(cors());
app.use(express.json())
app.use('/api/v0/users',routes);

// app.use('/auth',authRoute);

//midUrl = '

//token : $2b$10$mBDia/LhyiydE8hU1wW32ef.KQGmoGLxNiJDk5baXPSvRLghVX8zO

app.listen(3002,()=>{
    connectDB();
    console.log('successful http://localhost:3002/api/v0/users/postUser')
})



// const dbUrl3 = 'mongodb+srv://ecommerece:admin11@cluster0.swircm7.mongodb.net/E-commerace'
// const client = new MongoClient(dbUrl3);


// async function deleteAllUserDatabases() {
//     try {
//       await client.connect();
//       const adminDb = client.db().admin();
//       const dbs = await adminDb.listDatabases();
      
//       for (const dbInfo of dbs.databases) {
//         const name = dbInfo.name;
//         if (!['admin', 'local', 'config'].includes(name)) {
//           console.log(`Dropping database: ${name}`);
//           await client.db(name).dropDatabase();
//         }
//       }
  
//       console.log('All user databases dropped.');
//     } finally {
//       await client.close();
//     }
//   }
  
//   deleteAllUserDatabases().catch(console.dir);
  
  
  