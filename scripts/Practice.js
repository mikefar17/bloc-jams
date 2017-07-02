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

// table in album html is created and modified to accomodate the template below
var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
     // below this allows us to access the data held in the attribute using dom method when the mouse leaves the table row
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber +'</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return $(template);
 };

// Changes the headings currently set in original html and sets them to the new album that will be called
var setCurrentAlbum = function(album) {
     // #1
     var albumTitle = document.getElementsByClassName('album-view-title')[0];
     var albumArtist = document.getElementsByClassName('album-view-artist')[0];
     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
     var albumImage = document.getElementsByClassName('album-cover-art')[0];
     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
 
    // Connects the original html and equals it to the new album object
    // You took variables and you gave them new names with the same value 
    // You did this because the new name is needed
     // #2
     albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
 
     // #3
    // Takes the table template and equals it to the innerHTML as a string
     albumSongList.innerHTML = '';
 
     // #4
    // goes through each songObject within the albumObject and takes the new html string and equals is to function that creates songs 
     for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
 };
// i need this explained
var findParentByClassName = function(element, classTarget) {
    if (element){
        var currentParent = element.parentElement;
        while(currentParent.className !== classTarget && currentParent.className !== null) {
            currentParent = currentParent.parentElement;
        }
        return currentParent;
    }
};

// why do i want to always return song-item-number
var getSongItem = function(element){
    switch(element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, '.song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return  element;
        default:
            return; 
                            }            
};


var clickHandler =function(targetElement) {
    var songItem = getSongItem(targetElement);
    // if not playing or null true then set content to the pause button and set cps to the new song
    if (currentlyPlayingSong === null){
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
    //Revert the button back to play button if the playing song is clicked again
    } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
        songItem.innerHTML = playButtonTemplate;
        currentlyPlayingSong = null;
    } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
        var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
        
        currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
        
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
    }
};

 // #1 variable targets table
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

//set it to null so that no song is identified as playing until we click one. 
// Store state of playing songs
var currentlyPlayingSong = null;

 window.onload = function() {
     setCurrentAlbum(albumMarconi);
// #2 if mousehovers ontop of item then console logs the event
     songListContainer.addEventListener('mouseover', function(event) {
         // #1 if event target's parent class name equals album view...
         if(event.target.parentElement.className === 'album-view-song-item') {
          event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
            var songItem = getSongItem(event.target);
// if statement within another if statement  
             if(songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                 songItem.innerHTML = playButtonTemplate;
             }
         } 
     });

     for (var i= 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event){
             //Revert the content back to the number
             //the below was changed from 
             //this.children[0].innerHTML = this.children[0].getAttribute('data-song-number') why
             //#1
             var songItem = getSongItem(event.target);
             var songItemNumber = songItem.getAttribute('data-song-number');
             //#2
             if (songItemNumber !== currentlyPlayingSong) {
                 songItem.innerHTML = songItemNumber;
             }
         });
         
         songRows[i].addEventListener('click', function(event){
             // Event Handler call
             clickHandler(event.target);
         });
     }
 }