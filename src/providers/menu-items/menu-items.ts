import { Injectable } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { DisciplinasPage } from '../../pages/disciplinas/disciplinas';
import { EventosPage } from '../../pages/eventos/eventos';
import { ProfAddDisciplinaPage } from '../../pages/prof-add-disciplina/prof-add-disciplina';

@Injectable()
export class MenuItemsProvider {

  public pages: Array<{title: string, component: any}>;

  setPages(ocupacao) {
    if(ocupacao == 'aluno') {
      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Disciplinas', component: DisciplinasPage },
        { title: 'Eventos', component: EventosPage },
      ];
    } else if(ocupacao = 'docente') {
      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Criar disciplina', component: ProfAddDisciplinaPage},
        { title: 'Eventos', component: EventosPage },
      ];
    }
  }

}
