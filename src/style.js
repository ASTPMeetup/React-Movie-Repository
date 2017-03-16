function eventListeners() {
  var details = document.getElementById('details');
  var editlink = document.getElementsByClassName('editLink');

  details.addEventListener('mouseover', function(e) {
    editlink.style.display = 'inline';
  });

  details.addEventListener('mouseoout', function(e) {
    editlink.style.display = 'inline';
  });
}



window.onload = eventListeners();
