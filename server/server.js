import express from 'express';
import jwt from 'jsonwebtoken'
import pg from 'pg';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });

  db.connect();

  


  app.post("/login", async(req,res)=>{
    console.log(req.body);
    const username = req.body.username 
    const password = req.body.password
    try {
      
      
         const result = await db.query("select * from users where email = $1 or name = $1",[username]);
         
         for (let i = 0; i < result.rows.length; i++) {
          const user = result.rows[i];
          if(user){
            if(user.password == password){
                console.log("done");
                const payload = {user_id : user.id, username: user.name}
                let jwtSecretKey = process.env.JWT_SECRET_KEY;
                const token = jwt.sign(payload, jwtSecretKey, { expiresIn: '1h' });
                return res.status(200).json({message : "login successful", user, token});   
            }else{
                return res.status(401).json({ message: "Invalid password" });
            }

         }else{
           return res.status(404).json({ message: "User not found" });
            }
         }
         } catch (error) {
        console.error("error during login:", error)
        return res.status(500).json({ message: "Internal server error" });
        
    }
  })

  app.post('/register', async(req,res)=>{
    const{name,age,email,password} = req.body;
    try {
        await db.query("insert into users (name,age,email,password) values ($1,$2,$3,$4)",[name,age,email,password])
        const user = await db.query("select * from users where email = $1 and password = $2",[email,password])
        const payload = {user_id : user.rows[0].id, username: user.rows[0].name}
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign(payload, jwtSecretKey, { expiresIn: '1h' });
        

   
        return res.status(200).json({
            message: "User registered successfully",
            token,
            user: {
                id: user.rows[0].id,
                name: user.rows[0].name,
                email: user.rows[0].email,
            },
        });
    } catch (err) {
        res.status(500).json({message : err})
    }
    })

  app.post('/questions', async(req,res)=>{
    console.log(req.body.responses);
    
    const token  = req.headers.authorization.split(" ")[1]
    if(!token){
      return res.status(401).json({ message: "Unauthorized: Token is missing" });
    }
    try {
      const jwtSecretKey = process.env.JWT_SECRET_KEY;
      const decoded = jwt.verify(token, jwtSecretKey);

      const userId = decoded.user_id
      const answers = req.body.responses

      if (!answers || !Array.isArray(answers)) {
        return res.status(400).json({ message: "Invalid answers format" });
      }

      await db.query("insert into user_responses (user_id, destination, trip_type, type_of_traveler) values ($1,$2,$3,$4)",[userId,answers[0],answers[1],answers[2]])
      return res.status(200).json({ message: "Responses saved successfully" });
    } catch (error) {
      console.error("Error saving responses:", error);
    return res.status(500).json({ message: "Internal server error" });
    }
    
    
   
  })

  app.post('/trips', async (req, res) => {
    try {
      const response = await db.query("SELECT * FROM trips");
      const result = await db.query("select * from hosts")
      return res.status(200).json({
        trips : response.rows,
        hosts : result.rows}); 
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  });
  



  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
