var setSong = function(songNumber){
   if(currentSoundFile) {
       currentSoundFile.stop();
   }
    
   currentlyPlayingSongNumber = parseInt(songNumber);
   currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    //#1
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
    //#2
        formats: ['mp3'],
        preload: true
    });
    
    setVolume(currentVolume);
};

var setVolume = function(volume) {
    if(currentSoundFile) {
        currentSoundFile.setVolume(volume);
    }
};

var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]');
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
    
     var clickHandler = function(){
        var songNumber = parseInt($(this).attr('data-song-number'));
        if (currentlyPlayingSongNumber !== null){
 
            var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
            // keeps track of the currentPlayingSongNumber
            // Reverses pausebutton back to number when another song is clicked
            // if removed, previous songs remain with pauseButton
        }
         
        if (currentlyPlayingSongNumber !== songNumber) {
            setSong(songNumber); //stop current song
            currentSoundFile.play();
            $(this).html(pauseButtonTemplate);
            updatePlayerBarSong();
        } else if(currentlyPlayingSongNumber === songNumber) {
            if(currentSoundFile.isPaused()) {
                $(this).html(pauseButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPauseButton);
                currentSoundFile.play();
            } else {
                $(this).html(playButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPlayButton);
                currentSoundFile.pause();
            }
        }
    };
    
    var $row = $(template);
    
    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        
        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    };
//  
    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        console.log("songNumber type is " + typeof songNumber + "/n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
        
        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
            // switch the data-song-number to the new song hovered
        }
    };
    
    $row.find('.song-item-number').click(clickHandler);
    
    $row.hover(onHover, offHover);
    
    return $row;
};
    
// Changes the headings currently set in original html and sets them to the new album that will be called
var setCurrentAlbum = function(album) {
    currentAlbum = album;
     // #1    
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    
    // Connects the original html and equals it to the new album object
    // You took variables and you gave them new names with the same value 
    // You did this because the new name is needed
     // #2
 
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
     // #3
    // Takes the table template and equals it to the innerHTML as a string
 
    $albumSongList.empty();
     // #4
    // goes through each songObject within the albumObject and takes the new html string and equals is to function that creates songs 
     for (var i = 0; i < album.songs.length; i++) {
      
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };


var updatePlayerBarSong = function() {
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    
    $('.main-controls .play-pause').html(playerBarPauseButton);
};


var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

var nextSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    
    currentSongIndex++; 
    
    if(currentSongIndex >= currentAlbum.songs.length){
       currentSongIndex = 0;
       }
    var lastSongNumber = currentlyPlayingSongNumber;
    
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
    
    updatePlayerBarSong();
    
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var previousSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    
    currentSongIndex--;
    
    if(currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length -1;
    }
    var lastSongNumber = currentlyPlayingSongNumber;
    
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
    
    updatePlayerBarSong(); 
    
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var togglePlayFromPlayerBar = function() {
    if($playFromPlayerBar.click){
       var $songNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
       
        if(currentSoundFile.isPaused()) {
            $songNumberCell.html(pauseButtonTemplate);
            $playFromPlayerBar.html(playerBarPauseButton);
        } else {
            $songNumberCell.html(playButtonTemplate);
            $playFromPlayerBar.html(playerBarPlayButton);
        }
        currentSoundFile.togglePlay();
    }
};

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';
//set it to null so that no song is identified as playing until we click one. 
// Store state of playing songs

//#1
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');
var $playFromPlayerBar = $('.main-controls .play-pause');


$(document).ready(function() {
     setCurrentAlbum(albumPicasso);
     $previousButton.click(previousSong);
     $nextButton.click(nextSong);
     $playFromPlayerBar.click(togglePlayFromPlayerBar);
}); 