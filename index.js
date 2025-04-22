import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = 'https://flames-love-calculator.p.rapidapi.com/flame/'

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.post("/submit",async (req,res)=>{
    try{
        const response = req.body;
        console.log(response);
        const dataToReceiveFromAPI = await axios.get(API_URL+response.yourName+"/"+response.yourPartnerName,{
            headers: {
            'x-rapidapi-key': 'ef9bb685a1mshaa0cc0729fa3572p12b539jsn0ee2809d4732',
            'x-rapidapi-host': 'flames-love-calculator.p.rapidapi.com' 
            }
        })
        const message = dataToReceiveFromAPI.data
        console.log(message)
        res.render("index.ejs",{message:message.result})
    }catch(error){
        console.log(error.message)
    }})
app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})
