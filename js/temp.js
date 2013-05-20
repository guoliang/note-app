
$(document).on('pageshow', function() {
    $('#fill').text(localStorage.getItem("hello"));
});
