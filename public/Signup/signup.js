
function submit() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var Email = document.getElementById('Email').value;
  if (!username || !password || !Email) {
    alert('Please enter fields')
  }
  else {
    var obj = {
      username,
      password,
      Email
    }
    postuser(obj);
  }
}
function postuser(newuser) {
  axios.post("http://localhost:4000/user/signup", newuser)
    .then(responce => {
      console.log(responce);
      alert(responce.data.message);

    })
    .catch((err) => {
      console.log('err')
      alert('request error')
    });

}