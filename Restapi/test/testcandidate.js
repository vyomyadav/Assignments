process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHTTP = require('chai-http');
var server = require('../index');
var should = chai.should();
chai.use(chaiHTTP);
describe('/Get',()=>{
    it('candidate details',(done) =>{
     chai.request(server)
     .get('/candidate')
     .end((err,res) => {
         res.should.have.status(200);
         console.log(res.text)
         JSON.parse(res.text).should.be.a("array");
         done();
     });
    });
});
describe('/Put',()=>{
    it('candidate details',(done) =>{
     chai.request(server)
     .put('/candidate')
     .type('JSON')
     .send({
        "candidate_id":11,
        "username": "Lucifer Morningstar",
        "password": "wasabi",
        "email": "jjkkjnkjnoi@fhdj.com",
        "phoneno": "6708905677"
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
    it('candidate details',(done) =>{
     chai.request(server)
     .delete('/candidate')
     .type('JSON')
     .send({
        "candidate_id":3
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
    it('candidate details',(done) =>{
     chai.request(server)
     .post('/candidate')
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