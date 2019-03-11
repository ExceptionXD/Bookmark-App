document.getElementById("myForm").addEventListener('submit',saveBookmark);

function saveBookmark(e){

  var siteName = document.getElementById('siteName').value;
  var siteURL = document.getElementById('siteUrl').value;

  if(!siteName || !siteUrl){
    alert("Please Fill in the Details ") ;
  }

  var bookmark = {
    name : siteName ,
    url : siteURL
  }

  if(localStorage.getItem('bookmarks')===null){
    //init an array
    var bookmarks = [] ;
    //Add To array
    bookmarks.push(bookmark) ;
    //Add to localStorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks)) ;
  }else{
    //fetch from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Add to Array
    bookmarks.push(bookmark);
    //Add to localStorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks)) ;
  }
  //prevent the form from submitting
  e.preventDefault();


  fetchBookmarks();
}

// Fetching Bookmarks

function fetchBookmarks(){

  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //console.log(bookmarks);
  var bookmarksResults = document.getElementById('bookmarksResults');
  bookmarksResults.innerHTML='';
  for(var i = 0; i<bookmarks.length; i++){
    var name = bookmarks[i].name ;
    var url = bookmarks[i].url ;

    bookmarksResults.innerHTML += '<div class = "card card-body bg-light">'+
                                  '<h3>'+name+
                                  ' <a href="'+url+'" target= "blank" class="btn btn-success">Visit</a> ' +
                                  ' <a onclick = "deletebookmark(\''+url+'\')" target= "#" class="btn btn-danger">Delete</a> ' +
                                  '</h3> '
                                  '</div>' ;
  }
}

function deletebookmark(url){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  var bookmarksResults = document.getElementById('bookmarksResults');
  console.log(bookmarksResults);
  for(var i = 0 ; i<bookmarks.length ; i++){
    if(bookmarks[i].url == url){
      bookmarks.splice(i ,1) ;
    }
  }
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

  fetchBookmarks();
}
