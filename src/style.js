function eventListeners() {
  document.getElementsById('make_edit').addEventListener('keypress', function(e) {
    e.currentTarget.style.width = ((e.currentTarget.value.length + 1) * 16) + 'px';
    console.log(e.currentTarget);
  }
}

window.onload = eventListeners();
