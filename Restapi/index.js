
const {Client} = require("pg");
const express = require("express");
const joi = require("joi");
const app = express();
app.use(express.json());
app.use(express.static("Website"));
const client = new Client({user:"postgres",
                           password:"postgres",
                           host:"localhost",
                           port:5432,
                           database:"portal"
});
//----------------------------------------------------------------------Candidate-----------------------------------------------------------------------
app.get("/candidate",async (req,res)=>{
    const rows = await readcandidate(0,2);
    res.status(200).send(rows);
})
app.get("/candidate/:id",async (req,res)=>{
    let page = parseInt(req.params.id);
    let sum = page*2-2;
    const rows = await readcandidate(sum,2);
    res.status(200).send(rows);
})
/*app.get("/candidate/2",async (req,res)=>{
    const rows = await readcandidate(2,2);
    res.send(rows);
})
app.get("/candidate/3",async (req,res)=>{
    const rows = await readcandidate(4,2);
    res.send(rows);
})*/

app.post("/candidate",async (req,res)=>{
    let result = {};
    try{
    let {error} = await  validateCustomer(req.body,2);
    if(error){
        res.status(404).send(error.details[0].message);
        result.success = false;
    }
    else{    
    await createcandidate(req.body.username,req.body.password,req.body.email,req.body.phoneno);
    result.success = true;
    }}
    catch(e){
        console.log(e);
        res.status(400).send(e.details[0].message);
        result.success = false;
    }
    finally{
        res.status(200).send(result);
        }
})
app.delete("/candidate",async (req,res)=>{
    let result = {};
    try{
      await deletecandidate(req.body.candidate_id);
      result.success = true;
    }
    catch(e){
        console.log(e);
        res.status(400).send(e.details[0].message);
        result.success = false;
    }
    finally{
        res.status(200).send(result);

    }
})
app.put("/candidate",async(req,res)=>{
    let result = {};
    try{
        let {error} = await  validateCustomer(req.body,1);
        if(error){
            res.status(404).send(error.details[0].message);
            result.success = false;
        }
        else
        result.success = await putcandidate(req.body.candidate_id,req.body.username,req.body.password,req.body.email,req.body.phoneno);
    }
    catch(e){
         console.log(e);
         res.status(400).send(e.details[0].message);
         result.success = false;
    }
    finally{
       res.status(200).send(result);
    }
  
})
start()
async function start(){
    await connect();
}                           
async function connect(){
    try{
        await client.connect();
    }
    catch(ex){
        console.log("Error failed to connect");
    }
}
async function readcandidate(offset,limit){
    try{
        const result = await client.query("Select * from candidate order by candidate_id limit $1 offset $2",[limit,offset]);
        return result.rows;
    }
    catch(e){
        console.log(e);
        return [];
    }   
}
async function createcandidate(username,password,email,phoneno){
    try{
        await client.query("Insert into candidate (username,password,email,phoneno) values($1,$2,$3,$4)",[username,password,email,phoneno]);
        return true;
    }
    catch(e){
        return false;
    }   
}
async function deletecandidate(id){
    try{
        await client.query("delete from candidate where candidate_id = $1",[id]);
        return true; 
    }
    catch(e){
        console.log(e);
        return false;
    }   
    
}  
async function putcandidate(id,username,password,email,phoneno){
    try{
       const result = await client.query("select count(*) from candidate where candidate_id = $1",[id]);
       if(result.rows[0].count==0)
       return false
       else
       await client.query("update candidate set username = $1,password = $2,email = $3,phoneno = $4 where candidate_id = $5",[username,password,email,phoneno,id]);
       return true;
    }
    catch(e){
        console.log(e);
        return false;
    }
}                        
//------------------------------------Recruiter--------------------------------------------
app.get("/recruiter",async (req,res)=>{                                               //pagination
    const rows = await readrecruiter(0,2);
    res.status(200).send(rows);
})
app.get("/recruiter/:id",async (req,res)=>{
    let page = parseInt(req.params.id);
    let sum = page*2-2;
    const rows = await readrecruiter(sum,2);
    res.status(200).send(rows);
})
/*app.get("/recruiter/2",async (req,res)=>{
    const rows = await readrecruiter(2,2);
    res.send(rows);
})
app.get("/recruiter/3",async (req,res)=>{
    const rows = await readrecruiter(4,2);
    res.send(rows);
})*/
app.post("/recruiter",async (req,res)=>{
    let result = {};
    try{
    let {error} = await  validaterecruiter(req.body,2);
    if(error){
    res.status(404).send(error.details[0].message);
    result.success = false;
    }
    else{
    await createrecruiter(req.body.username,req.body.password,req.body.email,req.body.phoneno);
    result.success = true;
    }}
    catch(e){
        console.log(e);
        result.success = false;
    }
    finally{
        res.status(200).send(result);
        }
})
app.delete("/recruiter",async (req,res)=>{
    let result = {};
    try{
      await deleterecruiter(req.body.recruiter_id);
      result.success = true;
    }
    catch(e){
        console.log(e);
        result.success = false;
    }
    finally{
        res.status(200).send(result);

    }
})
app.put("/recruiter",async(req,res)=>{
    let result = {};
    try{
        let {error} = await  validaterecruiter(req.body,1);
        if(error){
            res.status(404).send(error.details[0].message);
            result.success = false;
        }
        else
        result.success = await putrecruiter(req.body.recruiter_id,req.body.username,req.body.password,req.body.email,req.body.phoneno);
    }
    catch(e){
         console.log(e);
         result.success = false;
    }
    finally{
       res.status(200).send(result);
    }
  
})
async function readrecruiter(offset,limit){
    try{
        const result = await client.query("Select * from recruiter order by recruiter_id limit $1 offset $2",[limit,offset]);
        return result.rows;
    }
    catch(e){
        return [];
    }   
}
async function createrecruiter(username,password,email,phoneno){
    try{
        await client.query("Insert into recruiter (username,password,email,phoneno) values($1,$2,$3,$4)",[username,password,email,phoneno]);
        return true;
    }
    catch(e){
        return false;
    }   
}
async function deleterecruiter(id){
    try{
        await client.query("delete from recruiter where recruiter_id = $1",[id]);
        return true; 
    }
    catch(e){
        console.log(e);
        return false;
    }   
    
}  
async function putrecruiter(id,username,password,email,phoneno){
    try{
       const result = await client.query("select count(*) from recruiter where recruiter_id = $1",[id]);
       if(result.rows[0].count==0)
       return false
       else
       await client.query("update recruiter set username = $1,password = $2,email = $3,phoneno = $4 where recruiter_id = $5",[username,password,email,phoneno,id]);
       return true;
    }
    catch(e){
        console.log(e);
        return false;
    }
}
//---------------------------------------------------------------JOBS--------------------------------------------------------------------
//Skills based search
app.get("/jobs/skills/:skill",async (req,res)=>{
    const skills = req.params.skill;
    const rows  = await readjobskill(skills);
    res.status(200).send(rows);
})
app.get("/jobs",async (req,res)=>{
    const rows = await readjobs(0,2);
    res.status(200).send(rows);
})
app.get("/jobs/:id",async (req,res)=>{
    let page = parseInt(req.params.id);
    let sum = page*2-2;
    const rows = await readjobs(sum,2);
    res.status(200).send(rows);
})
/*app.get("/jobs/2",async (req,res)=>{
    const rows = await readjobs(2,2);
    res.send(rows);
})
app.get("/jobs/3",async (req,res)=>{
    const rows = await readjobs(4,2);
    res.send(rows);
})*/

app.post("/jobs",async (req,res)=>{
    let result = {};
    try{ 
        let {error} = await  validatejob(req.body);
        if(error){
            res.status(404).send(error.details[0].message);
            result.success = false;
        }     
    else{    
    await createjobs(req.body.job_id,req.body.jobname,req.body.salary,req.body.owner,req.body.availability,req.body.skills);
    result.success = true;
    }}
    catch(e){
        console.log(e);
        result.success = false;
    }
    finally{
        res.status(200).send(result);
        }
})
app.delete("/jobs",async (req,res)=>{
    let result = {};
    try{
      await deletejobs(req.body.job_id);
      result.success = true;
    }
    catch(e){
        console.log(e);
        result.success = false;
    }
    finally{
        res.status(200).send(result);

    }
})
app.put("/jobs",async(req,res)=>{
    let result = {};
    try{
        let {error} = await  validatejob(req.body);
        if(error){
            res.status(404).send(error.details[0].message);
            result.success = false;
        }
        else
        result.success = await putjobs(req.body.job_id,req.body.jobname,req.body.salary,req.body.owner,req.body.availability,req.body.skills);
    }
    catch(e){
         console.log(e);
         result.success = false;
    }
    finally{
       res.status(200).send(result);
    }
  
})
async function readjobskill(skill){
    try{
        skill = skill.toUpperCase();
        console.log(skill);
        q = `Select * from jobs where skills = ${skill}`;
        const result = await client.query(q);
        return result.rows;
    }
    catch(e){
        console.log(e);
        return [];
    }   
}
async function readjobs(offset,limit){
    try{
        const result = await client.query("Select * from jobs order by job_id limit $1 offset $2",[limit,offset]);
        return result.rows;
    }
    catch(e){
        return [];
    }   
}
async function createjobs(job_id,jobname,salary,owner,availability,skill){
    try{
        skill = skill.toUpperCase();
        await client.query("Insert into jobs (job_id,jobname,salary,owner,availability,skills) values($1,$2,$3,$4,$5,$6)",[job_id,jobname,salary,owner,availability,skill]);
        return true;
    }
    catch(e){
        return false;
    }   
}
async function deletejobs(id){
    try{
        await client.query("delete from jobs where job_id = $1",[id]);
        return true; 
    }
    catch(e){
        console.log(e);
        return false;
    }   
    
}  
async function putjobs(job_id,jobname,salary,owner,availability,skill){
    try{
       skill = skill.toUpperCase();
       const result = await client.query("select count(*) from jobs where job_id = $1",[job_id]);
       if(result.rows[0].count==0)
       return false
       else
       await client.query("update jobs set jobname = $1,salary = $2,owner = $3,availability = $4,skills = $5 where job_id = $6",[jobname,salary,owner,availability,skill,job_id]);
       return true;
    }
    catch(e){
        console.log(e);
        return false;
    }
}                        
//------------------------------------------------------Company----------------------------------------------------------------------------------------------------------
app.get("/company",async (req,res)=>{
    const rows = await readcompany(0,2);
    res.status(200).send(rows);
})
app.get("/company/:id",async (req,res)=>{
    let page = parseInt(req.params.id);
    let sum = page*2-2;
    const rows = await readcompany(0,2);
    res.status(200).send(rows);
})
/*app.get("/company/2",async (req,res)=>{
    const rows = await readcompany(2,2);
    res.send(rows);
})
app.get("/company/3",async (req,res)=>{
    const rows = await readcompany(4,2);
    res.send(rows);
})*/
app.post("/company",async (req,res)=>{
    let result = {};
    try{
    let {error} = await  validatecompany(req.body);
    if(error){
        res.status(404).send(error.details[0].message);
        result.success = false;
    }
    else{
    await createcompany(req.body.company_id,req.body.company_name,req.body.description);
    result.success = true;
    }}
    catch(e){
        console.log(e);
        result.success = false;
    }
    finally{
        res.status(200).send(result);
        }
})
app.delete("/company",async (req,res)=>{
    let result = {};
    try{
      await deletecompany(req.body.company_id);
      result.success = true;
    }
    catch(e){
        console.log(e);
        result.success = false;
    }
    finally{
        res.status(200).send(result);

    }
})
app.put("/company",async(req,res)=>{
    let result = {};
    try{
    let {error} = await  validatecompany(req.body);
    if(error){
        res.status(404).send(error.details[0].message);
        result.success = false;
    }
    else    
    result.success = await putcompany(req.body.company_id,req.body.company_name,req.body.description);
    }
    catch(e){
         console.log(e);
         result.success = false;
    }
    finally{
       res.status(200).send(result);
    }
  
})
async function readcompany(offset,limit){
    try{
        const result = await client.query("Select * from company order by company_id limit $1 offset $2",[limit,offset]);
        return result.rows;
    }
    catch(e){
        return [];
    }   
}
async function createcompany(company_id,company_name,description){
    try{
        await client.query("Insert into company (company_id,company_name,description) values($1,$2,$3)",[company_id,company_name,description]);
        return true;
    }
    catch(e){
        return false;
    }   
}
async function deletecompany(id){
    try{
        await client.query("delete from company where company_id = $1",[id]);
        return true; 
    }
    catch(e){
        console.log(e);
        return false;
    }   
    
}  
async function putcompany(company_id,company_name,description){
    try{
       const result = await client.query("select count(*) from company where company_id = $1",[company_id]);
       if(result.rows[0].count==0)
       return false
       else
       await client.query("update company set company_name = $1,description = $2 where company_id = $3",[company_name,description,company_id]);
       return true;
    }
    catch(e){
        console.log(e);
        return false;
    }
}    
function validateCustomer(customer,i){
    var schema1 = {};
    if(i==1){
        schema1 ={
            candidate_id: joi.number().integer(),
            username: joi.string().min(3).max(30).required(),
            password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
            email: joi.string().email({ minDomainAtoms: 2 }),
            phoneno: joi.number()
        };

    }
    if(i==2){
        schema1 ={
            username: joi.string().min(3).max(30).required(),
            password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
            email: joi.string().email({ minDomainAtoms: 2 }),
            phoneno: joi.number()
        };

    }
    return joi.validate(customer,schema1);
}
function validaterecruiter(recruiter){
    var schema2 = {};
    if(i==1){
        schema2 ={
            recruiter_id: joi.number().integer(),
            username: joi.string().min(3).max(30).required(),
            password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
            email: joi.string().email({ minDomainAtoms: 2 }),
            phoneno: joi.number()
        };

    }
    if(i==2){
        schema2 ={
            username: joi.string().min(3).max(30).required(),
            password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
            email: joi.string().email({ minDomainAtoms: 2 }),
            phoneno: joi.number()
        };

    }
    return joi.validate(recruiter,schema2);
}
function validatecompany(company){
    const schema3 ={
        company_id: joi.number().integer(),
        company_name: joi.string().min(3).max(30).required(),
        description: joi.string()
    };
    return joi.validate(company,schema3);
} 
function validatejob(jobs){
    const schema4 ={
        job_id: joi.number().integer(),
        jobname: joi.string(),
        salary: joi.number(),
        owner: joi.string(),
        availability: joi.string(),
        skill: joi.string()
    };
    return joi.validate(jobs,schema4);
}  
// port enivronment variable
const port = process.env.PORT || 8080;
app.listen(port,() => console.log(`Listen on port ${port}...`));
module.exports = app;