import { Component, inject, input, linkedSignal, signal } from '@angular/core';
import { AuthorService } from '../../../../services/dotnet-api/author-service';
import { authorSchema, initialData } from '../../../../models/dotnet-api/author';
import { form, FormField } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-author-update-component',
  imports: [FormField, JsonPipe],
  templateUrl: './author-update-component.html',
  styleUrl: './author-update-component.css',
})
export class AuthorUpdateComponent {
  private authorService = inject(AuthorService);

  //Route parameter
  id = input<number>(0);

  message = signal<string>('');

  authorHttpResource = this.authorService.getByIdWithBooksHttpResource(this.id);

  protected readonly authorModel = linkedSignal(() => this.authorHttpResource.value() ?? initialData);
  authorForm = form(this.authorModel, authorSchema);


  onSubmit(event: Event) {
    event.preventDefault();

    ////https://www.angulararchitects.io/blog/all-about-angulars-new-signal-forms/
    // const firstname = this.authorForm.Firstname().value();
    // console.log('this.authorForm : ', this.authorForm().controlValue());
    // console.log('this.authorModel : ', this.authorModel());

    this.authorService.updateAuthor(this.authorModel()).subscribe({
      next: (data) => {
        this.message.set(data);
        console.log('DATA', data);
      },
      error: (erreur) => console.log('ERREUR', erreur),
      complete: () => console.log('Complete !!!')
    });
  }
}