import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { StreamComponent } from './components/stream/stream.component';
import { TwitchComponent } from './components/twitch/twitch.component';
import { MixerComponent } from './components/mixer/mixer.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'twitch', component: TwitchComponent },
  { path: 'mixer', component: MixerComponent },
  { path: 'stream/:platform/:channel/:gameId', component: StreamComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
