function go() {
    if (document.form.user.value == 'admin' && document.form.password.value == 'admin1234') {
        document.form.submit();
    }
    else {
        alert("Credenciales incorrectas. Por favor ingrese los datos correctos.");
    }
}
