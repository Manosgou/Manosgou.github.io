jQuery.githubUser = function(username, callback) {
    jQuery.getJSON('https://api.github.com/users/'+username+'/repos?callback=?',callback)
 }
  
 jQuery.fn.loadRepositories = function(username) {
     this.html("<span>Querying GitHub for " + username +"'s repositories...</span>");
      
     var target = this;
     $.githubUser(username, function(data) {
         var repos = data.data; // JSON Parsing
         sortByName(repos);    
        
         var list = $('<table style="width:100%;"><tr><th style="position:sticky;top:-5px;background-color:#fff;width:68%;">Repository name</th><th style="position: sticky;top:-5px;background-color:#fff;">Language</th></tr></table>');
         target.empty().append(list);
         $(repos).each(function() {
             if (this.name != (username.toLowerCase()+'.github.com')) {
                 list.append('<tr style="height: 50px;"><td><a style="color:black;padding:10px;color:#333;"href="'+ (this.homepage?this.homepage:this.html_url) +'">' + this.name + '</a></td><td>'+(this.language?(' '+this.language):'')+'</td></tr>');
                 //list.append('<dd>' + this.description +'</dd>');
             }
         });      
       });
       
     function sortByName(repos) {
         repos.sort(function(a,b) {
         return a.name - b.name;
        });
     }
 };