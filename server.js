// Cyclic app link: https://troubled-beanie-bat.cyclic.app/

const express = require("express")
const path = require("path")
const app = express()
const data = require("./data_prep")


let port = process.env.PORT || 8080

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/",(req,res)=>{
    res.send(`
    <h2>Decalartion</h2>
    <p>I acknowlege the College's academic intergirty policy - and my own integrity - remain in effect
    whether my work is done remotely or onsite. Any test or assignment is an act of trust between me and my instructor, and especially with my classmates
    ...even when no one is watching. I declare I will not break that trust.</p>
    <p>Name: LO TSZ KIT</p>
    <p>Student Number: 160067211</p>
    
    <ul>
        <li><a href="/CPA">CPA students</a></li>
        <li><a href="/highGPA">Highest GPA</a></li>
        <li><a href="/allstudents">All students</a></li>
        <li><a href="/addStudent">Add a student</a></li>
    </ul>
    

    
    
    `)
})

app.get("/CPA",(req,res)=>{
    data.cpa().then(result=>{
        
        res.send(JSON.stringify(result))
    },err=>{
        res.send(err)
    } )
})

app.get("/highGPA",(req,res)=>{
   
    data.highGPA().then(result=>{
        res.send(`
        <style>div{margin:15pt 0pt;}</style>
        <h2>Highest GPA:</h2>
        <div>Student ID: ${result.studId}</div>
        <div>Name: ${result.name}</div>
        <div>Program: ${result.program}</div>
        <div>GPA: ${result.gpa}</div>
        `)
    },err=>{
        res.send(err)
    })

})

app.get("/allstudents",(req,res)=>{
    data.allStudents().then(result=>{
        res.send(JSON.stringify(result))
    },err=>{
        res.send(err)
    } )
})

app.get("/addStudent",(req,res)=>{
    res.sendFile( path.join(__dirname,'./test3_views/addStudent.html') )
})

app.post("/addStudent",(req,res)=>{
   data.addStudent(req.body).then( result=>{
        res.send(`
        <style>h1{color:red}div{margin-bottom:20pt;}</style>
            <h1>The New Student Information</h1>
            <div>Student id:${result.studId}</div>
            <div>Student name:${result.name}</div>
            <div>Program:${result.program}</div>
            <div>GPA:${result.gpa}</div>
           
            <a href="/allstudents">All students</a><br/>
            <a href="/">Go Home</a>
        `);
   },err=>{
    res.send(err)
   } )
})

app.get('/student/:studId',(req,res)=>{
    data.getStudent(req.params.studId).then(result=>{
        res.send(`
        <style>h1{color:red}div{margin-bottom:20pt;}</style>
            <h1>The Student Information</h1>
            <div>Student id:${result.studId}</div>
            <div>Student name:${result.name}</div>
            <div>Program:${result.program}</div>
            <div>GPA:${result.gpa}</div>
           
            <a href="/allstudents">Show all students</a><br/>
            <a href="/">Go Home</a>
        `);
    },err=>{
        res.send(err)
    } )
})

app.use((req, res, next) => {
    res.status(404).send("Error 404: page not found.")
  })

data.prep().then(result=>{
    app.listen(port,()=>{
        console.log(`Express http server listening on ${port}`)
    })
},err=>{
    console.log("Unable to start up server", err)
})