
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { City } from '../domain/entities/city.model';
import { SearchHistoryService } from '../domain/services/consultaservice';
import { SearchCityService } from '../domain/services/search-city.service';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  errorMessage: string = null;
  cities: City[] = [];
  searchTerm: string;
  history: string[] = [];

  constructor(// initializes and injects the required services and dependencies that are used in the component
    private readonly cityService: SearchCityService,
    private readonly router: Router,
    public readonly searchHistoryService: SearchHistoryService,
    private readonly storage: Storage,
    private readonly navController : NavController
  ) {}

  async ngOnInit() {
    await this.storage.create();
    await this.searchHistoryService.loadHistory();// carrega o historico de pesquisa e atribui a history
    this.history = this.searchHistoryService.getHistory();
  }

  async onSearch(query: string) {// is called when the user types something in the search bar and hits enter or changes
    //the input. it calls the searchbyname to get the list of cities matching the query, and assign it to the cities property
    try {
      this.errorMessage = null;
      this.cities = await this.cityService.searchByName(query);
    } catch (error) {
      this.errorMessage = error.message;
    }
  }

  async onSelect(city: City) { //this function is called when the user clicks on a city in the search results, it uses the router to navigate to the weather page for that city, passing the city ID as a parameter. it also adds the city name to the search history sing addsearch
    await this.router.navigateByUrl(`/weather/${city.id}`, { replaceUrl: true });
    this.searchHistoryService.addSearch(city.name);
    this.navController.navigateRoot(['/city', city.id]).catch(error => console.error(error)); //tratamento de erro
  }

  async search() {// this function is called when the user clicks the search button or hits enter in the search bar. if the search bar is not empty, it adds it to the search history using the addsearch function and updates the history property with the new search history.
    if (this.searchTerm) {

          await this.searchHistoryService.addSearch(this.searchTerm);
          this.history = this.searchHistoryService.getHistory();
      
      this.searchTerm = '';
    }
  }
}
