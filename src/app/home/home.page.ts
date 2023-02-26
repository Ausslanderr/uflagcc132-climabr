
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

  async onSearch(query: string) {
    try {
      this.errorMessage = null;
      this.cities = await this.cityService.searchByName(query);
    } catch (error) {
      this.errorMessage = error.message;
    }
  }

  async onSelect(city: City) {
    await this.router.navigateByUrl(`/weather/${city.id}`, { replaceUrl: true });
    this.searchHistoryService.addSearch(city.name);// adiciona o termo pesquisado (nome da cidade) ao histórico
    //this.navController.navigateRoot(['/city', city.id]).catch(error => console.error(error)); //tratamento de erro
    this.history = this.searchHistoryService.getHistory();//atualiza o histórico com o novo termo pesquisado
  }

}
