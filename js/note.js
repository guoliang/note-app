$(document).ready(function() {
    bindOpenEventOnPopup();
    bindCloseEventOnPopUp();
    loadNotes();
    showNote();
});

function showNote() {
    $(document).on('click', '.note', function() {
        var id = $(this).attr('noteid');
        $('#header h1').text('Note #' + id);
        $('#noteContent').text(localStorage.getItem(id));
    });

}
function loadNotes() {
    var currentIndex = getIndex();
    for (var i = currentIndex - 1; i >= 0; i--) {
        var note = localStorage.getItem(i);
        if (note.length > 5)
            note = note.substring(0, 5) + '...';
        $('#noteList').append('<li><a class="note" noteid="'+i+'" href="#shownote" data-rel="dialog" data-transition="flip">'+note+'</a></li>');
    }
    $('#noteList').listview('refresh');
}

function bindOpenEventOnPopup() {
    $('#postnote').click(function() {
        addNote();
        popupDialog();
    });
}

function popupDialog() {
    $(document).one('pageshow', '#mainPage', function() {
        $('#dialog').popup('open');
    });
}

function bindCloseEventOnPopUp() {
    $(document).on('popupafteropen', function() {
        setTimeout(function() {
            $('#dialog').popup('close');
        }, 600);
    });
}

//<!-- private functions -->
function addNote() {
    var currentIndex = getIndex();
    var note = $('#note').val();

    if (!noteEmpty(note)) {
        localStorage.setItem(currentIndex, note);
        $('#noteList').prepend('<li><a href="#shownote" data-transition="flip">'+note+'</a></li>');
        $('#noteList').listview('refresh');
        updateIndex();
        $('#note').val('');
        $('#popUpMessage').text('Note posted');
    } else {
        $('#popUpMessage').text('Note cannot be empty!');
    }
}

function getIndex() {
    var currentIndex = 0;
    if (localStorage.getItem("index") !== null) {
        currentIndex = localStorage.getItem("index");
    } else {
        localStorage.setItem("index", currentIndex) ;
    }
    return currentIndex;
}

function updateIndex() {
    var currentIndex = localStorage.getItem("index");
    localStorage.setItem("index", ++currentIndex);
}

function noteEmpty(note) {
    // console.log(note === '');
    return note === '';
}