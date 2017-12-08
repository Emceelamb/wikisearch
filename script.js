var searchUrl = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&utf8=1&srsearch=" 
var searchRes = [];

var app = new Vue({
    el: "#app",
    methods:{
        getFormValues(){
            searchRes=[];
            this.output=this.$refs.my_input.value;
            var search = searchUrl+this.output;
            this.$http.get(search).then(response => {
                // console.log("get");
                // get body data
                this.json = response.body.query.search;
                
                for(var i = 0; i < response.body.query.search.length;i++){
                    var article = {
                        title: response.body.query.search[i].title,
                        snippet: response.body.query.search[i].snippet.replace(/<\/?[^>]+>/gi, '').replace(/&quot;/g,'"'),
                        url: 'https://en.wikipedia.org/?curid='+response.body.query.search[i].pageid
                    }
                    searchRes.push(article);
                };
                this.results = searchRes;
                
            }, response => {
                // error callback
            });
            // console.log(searchRes);
        }
    },
    data: {
        hello: "world",
        output: null,
        json: null,
        results: null
    }
})

// giphy 
$(function() {
    var xhr = $.get("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=universe");
    xhr.done(function(data) { 
      $('.gif-bg').css('background-image', 'url(' + data.data.image_url + ')');
    });
  });
 