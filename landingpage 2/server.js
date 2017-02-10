var http = require('http');
var fs = require('fs');

var server = http.createServer(function(request,response){

  console.log('requested url was:',request.url);

  if (request.url === '/'){
    fs.readFile('index.html', 'utf8', function(errors,contents){
      response.writeHead(202,{'Content-Type': 'text/html'});
      response.write(contents);
      response.end();
    });
  }

  else if (request.url === '/ninjas') {

    fs.readFile('ninjas.html', 'utf8', function(errors,contents){
      response.writeHead(202,{'Content-Type': 'text/html'});
      response.write(contents);
      response.end();
    });

  }

  else if (request.url === '/dojos/new') {

    fs.readFile('dojos.html','utf8',function(errors,contents){
      response.writeHead(202, {'Content-Type': 'text/html'});
      response.write(contents);
      response.end();
    });
  }

  else{
    response.writeHed(416);
    response.end();
  }

});

server.listen(6789);
console.log('srever runnning on localhost:6789');
