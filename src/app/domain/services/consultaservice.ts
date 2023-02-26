

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class SearchHistoryService {
  private history: string[] = [];
  private readonly HISTORY_KEY = 'search_history';

  constructor(private storage: Storage) {}

  async loadHistory() {////Esta função carrega o histórico de pesquisa do device storage usando o Storage service. Se o histórico for encontrado, ele atualiza o vetor de histórico com o histórico carregado. Essa função é chamada no ngOnInit lifecycle hook do componente HomePage para carregar o histórico de pesquisa quando o componente é inicializado
    const history = await this.storage.get(this.HISTORY_KEY);
    if (history) {
      this.history = history;
    }
  }

 
async addSearch(searchTerm: string) {
  if (searchTerm) {
    // Verifica se o searchTerm já existe dentro do vetor history
    const index = this.history.indexOf(searchTerm);
    if (index !== -1) {
      // Se ele já está lá, é removido da posição atual
      this.history.splice(index, 1);
    }
    // Add the search term to the beginning of the history array Add o search Term no inicio do vetor history, de modo que seja o primeiro a aparecer no histórico.
    this.history.unshift(searchTerm);
    this.history = this.history.slice(0, 5); // Limita pra até 5 termos no histórico
    await this.storage.set(this.HISTORY_KEY, this.history);
  }
}
  getHistory() {//Essa função retorna o histórico de pesquisa como uma vetor de strings. Ele simplesmente retorna a matriz de histórico. Essa função é chamada no modelo do componente HomePage para exibir o histórico de pesquisa.
    return this.history;
  }
}



