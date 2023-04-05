// 暫時用不到
navigator.mediaDevices.getUserMedia({ audio: true })
.then(function(stream) {
    showSuccess()
})
.catch(function(err) {
    showFailure()
});

function showSuccess() {
  document.getElementById('success').classList.remove('hidden');
  document.getElementById('failure').classList.add('hidden');
}

function showFailure() {
  document.getElementById('failure').classList.remove('hidden');
  document.getElementById('success').classList.add('hidden');
}