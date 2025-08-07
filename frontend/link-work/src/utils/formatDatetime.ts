/**
 * Formata uma data no formato ISO (string) para uma data longa em pt-BR.
 * @param isoString A data vinda do backend (ex: "2025-07-28T02:05:00.000Z")
 * @returns A data formatada (ex: "28 de julho de 2025")
 */
export function formatLongDate(isoString: string): string {
  // 1. Cria um objeto Date a partir da string ISO que vem da API.
  const date = new Date(isoString);

  // 2. Cria uma instância do formatador com as opções desejadas.
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long", // ex: "28 de julho de 2025"
    // timeZone: 'UTC', // Boa prática para garantir consistência
  });

  // 3. Usa o formatador para de fato formatar o objeto Date e retorna o resultado.
  return formatter.format(date);
}

/**
 * Formata uma data no formato ISO (string) para data e hora em pt-BR.
 * @param isoString A data vinda do backend
 * @returns A data e hora formatadas (ex: "28/07/2025, 02:05:00")
 */
export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);

  const formatter = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short", // ex: "28/07/2025"
    timeStyle: "medium", // ex: "02:05:00"
  });

  return formatter.format(date);
}