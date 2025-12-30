const formatCNPJ = (value: string) => {
  // Remove qualquer caractere que não seja número
  const digits = value.replace(/\D/g, "");

  // Aplica a formatação progressivamente
  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")               // 1234 -> 12.34
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")    // 12.3456 -> 12.345.6
    .replace(/\.(\d{3})(\d{3})(\d)/, ".$1/$2$3")    // 12.345.6789 -> 12.345.678/9
    .replace(/(\d{4})(\d)/, "$1-$2")                // 12.345.678/901234 -> 12.345.678/9012-34
    .substring(0, 18);                              // Limita ao tamanho final da máscara
};