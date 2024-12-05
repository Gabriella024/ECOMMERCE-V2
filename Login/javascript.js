const dataFetch = () => {
  fetch(`https://fakestoreapi.com/users`)
    .then(response => response.json())
    .then(data => {
      window.localStorage.setItem('usuarios', JSON.stringify(data));
    })
}

let attemps = 3;
const btnLogin = document.querySelector('.btnLogin');

btnLogin.addEventListener('click', () => {
  const users = JSON.parse(window.localStorage.getItem('usuarios'));
  const inputUser = document.querySelector('.inputUser').value;
  const inputPassword = document.querySelector('.inputPassword').value;

  let login = false

  users.forEach(user => {
    if (user.username === inputUser && user.password === inputPassword || user.email === inputUser && user.password === inputPassword) {
      login = true
      location.href = '/ECommercce/Ecommerce.html'
    }
  });

  if(!login) {
    --attemps
    if (attemps > 1 ) {
      alert(`Te quedan ${attemps} intentos.`);
    } else if(attemps > 0 && attemps === 1) {
      alert(`Te queda ${attemps} intento.`);
    }
    

    if (attemps === 0) {
      alert('Credenciales incorrectas. Debes esperar 10 segundos.')
      document.querySelector('.inputUser').disabled = true;
      document.querySelector('.inputPassword').disabled = true;
      document.querySelector('.btnLogin').disabled = true;

      setInterval(() => {
        location.reload()
      }, 10000)
    }
  }

});

dataFetch()