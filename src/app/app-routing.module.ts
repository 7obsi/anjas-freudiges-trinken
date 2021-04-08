import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StartPageComponent} from './components/start-page/start-page.component';
import {GameComponent} from './components/game/game.component';

const routes: Routes = [
  {path: 'start', component: StartPageComponent},
  {path: '', redirectTo: '/start', pathMatch: 'full'},
  {path: 'game', component: GameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
