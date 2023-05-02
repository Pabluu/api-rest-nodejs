interface User {
  birthYear: number; // propriedade obrigatório
  // birthYear?: number; // propriedade opcional
}

function calcularIdadeUsuario(user: User) {
  return new Date().getFullYear() - user.birthYear;
}

calcularIdadeUsuario({
  birthYear: 12,
});
