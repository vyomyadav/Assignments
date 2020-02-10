process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHTTP = require('chai-http');
var server = require('../index');
var should = chai.should();
chai.use(chaiHTTP);
describe('/Get',()=>{
    it('Company details',(done) =>{
     chai.request(server)
     .get('/company')
     .end((err,res) => {
         res.should.have.status(200);
         console.log(res.text)
         JSON.parse(res.text).should.be.a("array");
         done();
     });
    });
});
describe('/Put',()=>{
    it('company details',(done) =>{
     chai.request(server)
     .put('/company')
     .type('JSON')
     .send({
        "company_id": 1,
        "company_name": "Wayne Tech",
        "description": "Hiding Something"
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
    it('company details',(done) =>{
     chai.request(server)
     .delete('/company')
     .type('JSON')
     .send({
        "company_id":1
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
    it('company details',(done) =>{
     chai.request(server)
     .post('/company')
     .type('JSON')
     .send({
        "company_id": 1,
        "company_name": "Queen Corp",
        "description": "Barely profitable"
     })
     .end((err,res) => {
         res.should.have.status(200);
         console.log(res.text)
         res.text.should.be.a("string");
         done();
     });
    });
});