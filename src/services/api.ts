export const api = {
  getQuote: async () => {
    try {
      // Usando DummyJSON para frase motivacional ou algo similar
      const response = await fetch('https://dummyjson.com/quotes/random');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching quote', error);
      return { quote: 'Foco no progresso, não na perfeição.', author: 'TaskFlow' };
    }
  },
  
  getCategories: async () => {
    // Exemplo de busca de categorias
    return [
      { id: '1', name: 'Trabalho', icon: 'briefcase' },
      { id: '2', name: 'Pessoal', icon: 'user' },
      { id: '3', name: 'Estudo', icon: 'book' },
      { id: '4', name: 'Saúde', icon: 'heart' },
    ];
  }
};