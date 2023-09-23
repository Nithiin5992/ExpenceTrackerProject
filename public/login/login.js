

function submit() {
  var password = document.getElementById('password').value;
  var Email = document.getElementById('Email').value;
  var obj = {
    Email,
    password
  }
  postuser(obj);
}
function postuser(newuser) {
  axios.post("http://3.95.70.131:3000/user/login", newuser)
    .then(responce => {
      alert(responce.data.message);
      window.location.href ="http://3.95.70.131:3000/dailyexpence/dailyexpence.html"
      localStorage.setItem('token', responce.data.token)
      localStorage.setItem('premiumuser', responce.data.premiumuser)
    })
    .catch((err) => {
      console.log(err)
      alert(err.message)
    });
}

function forgotpassword(){
  var email=document.getElementById('email').value;
  var obj={
    email
  }
  const token = localStorage.getItem('token');
  axios.post('http://3.95.70.131:3000/password/forgotpassword',obj,{ headers: { 'authorization': token } })
}