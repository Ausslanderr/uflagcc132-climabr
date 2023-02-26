

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
    // Verifica se o search term já existe dentro do vetor history
    const index = this.history.indexOf(searchTerm);
    if (index !== -1) {
      // Se ele já esta la, é removido
      this.history.splice(index, 1);
    }
    // Add o search term no inicio do vetor history, de modo que seja o primeiro a aparecer no histórico
    this.history.unshift(searchTerm);
    this.history = this.history.slice(0, 5); // Limita para até 5 termos no histórico
    await this.storage.set(this.HISTORY_KEY, this.history);
  }
}
  getHistory() {//Essa função simplesmente retorna o historico de pesquisa como um vetor de strings. Simplesmente retorna o vetor de historico. Ela é chamada no modelo do componente homepage.ts para exibir o historico de pesquisa

    return this.history;
  }
}



