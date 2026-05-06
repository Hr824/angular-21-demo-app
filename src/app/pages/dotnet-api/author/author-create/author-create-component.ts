import { Component, inject, signal } from '@angular/core';
import { Author, authorSchema, initialData } from '../../../../models/dotnet-api/author';
import { form, FormField } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { AuthorService } from '../../../../services/dotnet-api/author-service';

@Component({
  selector: 'app-author-create-component',
  imports: [FormField, JsonPipe],
  templateUrl: './author-create-component.html',
  styleUrl: './author-create-component.css',
})
export class AuthorCreateComponent {

  private authorService = inject(AuthorService);

  authorModel = signal<Author>(initialData);
  authorForm = form(this.authorModel, authorSchema);

  message = signal<string>('');

  reset(): void {
    this.authorForm().reset(initialData);
  }

  onSubmit(event: Event) {
    event.preventDefault();

    //console.log('EVENT : ', event);
    
    this.authorService.createAuthor(this.authorModel()).subscribe({
      next: (data) => {
        //this.deleteButtonIsDisabled.set(true);
        this.message.set(data);
        console.log('DATA', data);
      },
      error: (erreur) => console.log('ERREUR', erreur),
      complete: () => console.log('Complete !!!')
    });

    this.authorForm().reset();
  }
}