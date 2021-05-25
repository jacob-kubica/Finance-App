import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';

import { CardListComponent } from './card/card-list/card-list.component';
import { CardCreateComponent } from './card/card-create/card-create.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent },
  { path: 'edit/:postId', component: PostCreateComponent },

  { path: 'card', component: CardListComponent },
  { path: 'card/create', component: CardCreateComponent },
  { path: 'card/edit/:cardId', component: CardCreateComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
