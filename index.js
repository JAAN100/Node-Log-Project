const http = require("http");
const url =  require("url")
const fs = require("fs");
const server = http.createServer((req , res)=>{
  const time = new Date();
  const hours = time.getHours();
  const min = time.getMinutes();
  const parseURL = url.parse(req.url , true);
  const log = `${hours} : ${min} , ${parseURL.pathname}\n`
  fs.appendFile("./login.txt" , log , (err)=>{
    if(err){
      return res.end(JSON.stringify({ msg: "File cannot create" }));
       }
       switch(req.url){
        case "/":
          return res.end(`Home Page msg : ${log}`);
          break;
        case "/about":
          return res.end(`About Page \n msg : ${log}`);
             break;
        default:
          return res.end("404");
          break;
    }
  })
  fs.readFile("./login.txt" , "utf-8" , (err , data)=>{
    if(err){
      console.log("Error : " , err);
    }else{
      console.log(data);
      
    }
  })

})


server.listen(3001 , ()=>{console.log("Connected");})