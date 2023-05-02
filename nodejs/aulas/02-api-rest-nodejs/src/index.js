function calcularIdadeUsuario(user) {
  return new Date().getFullYear() - user.birthYear;
}

calcularIdadeUsuario("Pablo");
calcularIdadeUsuario({});
