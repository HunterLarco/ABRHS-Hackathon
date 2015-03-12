(function(){

  window.Post = function Post(url, data, onresponse, onerror){
    var undefined;
    if(typeof data != 'string' && data != undefined) data = JSON.stringify(data);
	
    var request = CreateRequest();
	
    request.open('POST', url, true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	
    request.onreadystatechange = function OnStateChange(){
      if(request.readyState != 4) return;
      if(request.status != 200 && request.status != 304){
        if(typeof onerror == 'function') onerror(request);
        return;
      }
      if(typeof onresponse == 'function') onresponse(request);
    }

    request.send(data);
  }

  window.Get = function Get(url, onresponse, onerror){
    var request = CreateRequest();
	
    request.open('GET', url, true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	
    request.onreadystatechange = function OnStateChange(){
      if(request.readyState != 4) return;
      if(request.status != 200 && request.status != 304){
        if(typeof onerror == 'function') onerror(request);
        return;
      }
      if(typeof onresponse == 'function') onresponse(request);
    }

    request.send();
  }

  var XMLHttpFactories = [
    function() {return new XMLHttpRequest()},
    function() {return new ActiveXObject("Msxml2.XMLHTTP")},
    function() {return new ActiveXObject("Msxml3.XMLHTTP")},
    function() {return new ActiveXObject("Microsoft.XMLHTTP")}
  ];

  function CreateRequest() {
    var xmlhttp = false;
    for(var i=0;i<XMLHttpFactories.length;i++){
      try{ xmlhttp = XMLHttpFactories[i](); }
      catch(e){ continue; }
      break;
    }
    return xmlhttp;
  }

})();