import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { IonicStorageModule } from '@ionic/storage-angular';


@NgModule({
  imports: [
    SharedModule,    
    HomePageRoutingModule,
    IonicStorageModule
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
