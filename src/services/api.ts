export async function getQuote() {
  try {
    const res = await fetch('https://api.quotable.io/random');
    const data = await res.json();
    return data.content;
  } catch {
    return 'Não foi possível carregar a frase';
  }
}