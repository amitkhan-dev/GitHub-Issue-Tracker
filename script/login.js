const signInBtn = document.getElementById('signin-btn');
signInBtn.addEventListener('click', function(){
  // get the usernam
  const inputName= document.getElementById('input-name');
  const userName= inputName.value;
  console.log(userName);
  // get the password
  const inputPassword = document.getElementById('input-password');
  const password = inputPassword.value;
  console.log(password);

  // match the input value
  if(userName === 'admin' && password ==="admin123"){
    alert('Sign In Successefully');

    // window.location.assign("/home.html")
    // Window.location.replace("/home.html")
    window.location.href = ("home.html");
  }else {
    alert('Sign in Fallied')
    return;
  }
});