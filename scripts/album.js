var albumPicasso= {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { title: 'Blue', duration: '4:26' },
        { title: 'Green', duration: '3:14' },
        { title: 'Red', duration: '5:01' },
        { title: 'Pink', duration: '3:21' },
        { title: 'Magenta', duration: '2:15' }
    ]
};

// Another Example Album 
var albumMarconi = {
    title: 'The Telephone',
    artist: 'GugLielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { title: 'Hello, Operator?', duration: '1:01' },
        { title: 'Ring, ring, ring', duration: '5:01' },
        { title: 'Fits in your pocket', duration: '3:21' },
        { title: 'Can you hear me now?', duration: '3:14' },
        { title: 'Wrong phone number', duration: '2:15'}
    ]
};

var albumMikey = {
    title: 'Live and Unpluged',
    artist: 'Nirvana',
    label: 'Universal',
    year: '1991',
    albumArtUrl: 'assets/images/album_covers/02.png',
    songs: [
        { title: 'Smells Like Teen Spirit', duration: '3:33'},
        { title: 'Polly', duration: '3:16'},
        { title: 'Whare did you sleep last night?', duration: '3:40'},
        { title: 'In Bloom', duration: '4:15'}
    ]
};

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return template;
 };

    var albumTitle = document.getElementsByClassName('album-view-title')[0];
     var albumArtist = document.getElementsByClassName('album-view-artist')[0];
     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
     var albumImage = document.getElementsByClassName('album-cover-art')[0];
     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
    

var setCurrentAlbum = function(album) {
     // #1 created variables with the elements inside them
     
    //However, i moved them outside of the function so i could use it globally. 
    
 
     // #2 took previous variables and added properties that will 
    // equal to album properties 
    // album at this point is still a parameter of the previous function 
    // Notice-- that 4th var has a picture and therefore uses setAtribute
     // #3
    // which is my table and some string will be added to its html
    
     albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
     albumSongList.innerHTML = '';
    
     // #4 Loop thru the current albums length 
    // sets the tables content to function 1st the song number 2nd songsname 3rd the duration
     for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
 };

 window.onload = function() {
     setCurrentAlbum(albumMikey);
     
     var albums = [albumPicasso, albumMarconi, albumMikey];
     var index = 0;
     
     albumImage.addEventListener('click', function(event){
         setCurrentAlbum(albums[index]); //I want it to use index to go through the array
         index ++;
         // What if the index goes all the way through the array? What do I want it to do?
         if(index == albums.length){
             index = 0;
         }
     });
 };