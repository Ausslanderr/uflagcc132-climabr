

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class SearchHistoryService {
  private history: string[] = [];
  private readonly HISTORY_KEY = 'search_history';

  constructor(private storage: Storage) {}

  async loadHistory() {//This function loads the search history from the device storage using the Storage service. If the history is found, it updates the history array with the loaded history. This function is called in the ngOnInit lifecycle hook of the HomePage component to load the search history when the component is initialized.
    const history = await this.storage.get(this.HISTORY_KEY);
    if (history) {
      this.history = history;
    }
  }
/*
  async addSearch(searchTerm: string) {// This function adds a new search term to the search history. It takes a searchTerm string as input and adds it to the beginning of the history array using the unshift method. It also limits the history to a maximum of 5 entries by calling slice(0, 5) on the history array. Finally, it saves the updated history array to the device storage using the Storage service. This function is called in the onSelect and search functions of the HomePage component to add new search terms to the history.
    if (searchTerm) {
      // Add the search term to the beginning of the history array
      this.history.unshift(searchTerm);
      // Only keep the last three searches
      this.history = this.history.slice(0, 5);
      await this.storage.set(this.HISTORY_KEY, this.history);
    }
  }
*/async addSearch(searchTerm: string) {
  if (searchTerm) {
    // Check if the searchTerm already exists in the history array
    const index = this.history.indexOf(searchTerm);
    if (index !== -1) {
      // If it exists, remove it from its current position
      this.history.splice(index, 1);
    }
    // Add the search term to the beginning of the history array
    this.history.unshift(searchTerm);
    // Only keep the last five searches
    this.history = this.history.slice(0, 5);
    await this.storage.set(this.HISTORY_KEY, this.history);
  }
}
  getHistory() {//This function returns the search history as an array of strings. It simply returns the history array. This function is called in the HomePage component's template to display the search history.
    return this.history;
  }
}



