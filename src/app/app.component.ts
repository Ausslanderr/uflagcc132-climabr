import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `,
})

export class AppComponent {
  constructor() {}
}
/*
export class MyApp {
  constructor(private storage : Storage){}

  storage.get('age').then((val)=>{
    console.log('Your age is', val);
  });
}
*/