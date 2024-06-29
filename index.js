const dotenv=require('dotenv')
dotenv.config({path:'./.env'});  //we should declare it on the top
const express= require('express')
const courserouter= require('./router/courserouter')
const topicrouter= require('./router/topicrouter')
const speakerrouter= require('./router/speakerrouter')
const coursespeakerrouter= require('./router/coursespeakerrouter')

const app=express();
const port= process.env.PORT ||8080;

const cors=require('cors')

app.use(express.json());
app.use(cors({
    origin:'*'
}))

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

app.use("/course", courserouter)
app.use("/topic", topicrouter)
app.use("/speaker", speakerrouter)
app.use("/coursespeaker", coursespeakerrouter)

app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})


