process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHTTP = require('chai-http');
var server = require('../index');
var should = chai.should();
chai.use(chaiHTTP);
describe('/Get',()=>{
    it('recruiter details',(done) =>{
     chai.request(server)
     .get('/recruiter')
     .end((err,res) => {
         res.should.have.status(200);
         console.log(res.text)
         JSON.parse(res.text).should.be.a("array");
         done();
     });
    });
});
describe('/Put',()=>{
    it('recruiter details',(done) =>{
     chai.request(server)
     .put('/recruiter')
     .type('JSON')
     .send({
        "recruiter_id":11,
        "username": "cameldrop",
        "password": "dokhla",
        "email": "jjsdsai@fhdj.com",
        "phoneno": "4245904991"
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
    it('recruiter details',(done) =>{
     chai.request(server)
     .delete('/recruiter')
     .type('JSON')
     .send({
        "recruiter_id":3
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
    it('recruiter details',(done) =>{
     chai.request(server)
     .post('/recruiter')
     .type('JSON')
     .send({
        "username": "Michael Morningstar",
        "password": "kimosabi",
        "email": "dasdnan@fhdj.com",
        "phoneno": "9432524276"
     })
     .end((err,res) => {
         res.should.have.status(200);
         console.log(res.text)
         res.text.should.be.a("string");
         done();
     });
    });
});