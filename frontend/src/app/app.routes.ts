import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import {LowerSeLevelComponent} from "./lower-se-level/lower-se-level.component";

export const routes: Routes = [
  { path: '', component: ChatComponent },
  { path: 'lower-se-level', component: LowerSeLevelComponent }
];
