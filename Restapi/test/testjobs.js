process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHTTP = require('chai-http');
var server = require('../index');
var should = chai.should();
chai.use(chaiHTTP);
describe('/Get',()=>{
    it('jobs details',(done) =>{
     chai.request(server)
     .get('/jobs')
     .end((err,res) => {
         res.should.have.status(200);
         console.log(res.text);
         JSON.parse(res.text).should.be.a("array");
         done();
     });
    });
    it('Skill based search',(done) =>{
        chai.request(server)
        .get('/jobs/skills/"JAVA"')
        .end((err,res) => {
            res.should.have.status(200);
            console.log(res.text);
            JSON.parse(res.text).should.be.a("array");
            done();
        });
    });
});
describe('/Put',()=>{
    it('jobs details',(done) =>{
     chai.request(server)
     .put('/jobs')
     .type('JSON')
     .send({
        "job_id":2,
        "jobname": "Assistant to the Regional Manager",
        "salary": 9999,
        "owner": "e424fsfse@fsesfef.com",
        "availability":"yes",
        "skill": "JAVA"
     })
     .end((err,res) => {
         res.should.have.status(200);
         console.log(res.text)
         res.text.should.be.a("string");
         done();
     });
    });
});
describe('/Delete',()=>{
    it('jobs details',(done) =>{
     chai.request(server)
     .delete('/jobs')
     .type('JSON')
     .send({
        "job_id":3
     })
     .end((err,res) => {
         res.should.have.status(200);
         console.log(res.text)
         res.text.should.be.a("string");
         done();
     });
    });
});
describe('/Post',()=>{
    it('job details',(done) =>{
     chai.request(server)
     .post('/jobs')
     .type('JSON')
     .send({
        "job_id":12,
        "jobname": "Assistant Regional Manager",
        "salary": 89999,
        "owner": "e424fsfse@huihb.com",
        "availability":"no",
        "skill": "JAVA"
     })
     .end((err,res) => {
         res.should.have.status(200);
         console.log(res.text)
         res.text.should.be.a("string");
         done();
     });
    });
});