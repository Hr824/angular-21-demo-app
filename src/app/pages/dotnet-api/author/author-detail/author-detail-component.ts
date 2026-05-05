import { Component, computed, inject, input, signal } from '@angular/core';
import { AuthorService } from '../../../../services/dotnet-api/author-service';
import { Author } from '../../../../models/dotnet-api/author';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { LoaderComponent } from '../../../../components/loader/loader-component';

@Component({
  selector: 'app-author-detail-component',
  imports: [LoaderComponent, DatePipe, UpperCasePipe],
  templateUrl: './author-detail-component.html',
  styleUrl: './author-detail-component.css',
})
export class AuthorDetailComponent {

  //Route parameter
  id = input<number>(0);

  deleteButtonIsDisabled = signal<boolean>(false);
  message = signal<string>('');

  authorService = inject(AuthorService);

  authorHttpResource = this.authorService.getByIdWithBooksHttpResource(this.id);

  author = computed(() => this.authorHttpResource.value() ?? {} as Author);

  deleteAuthor(authorId: number) {
    this.authorService.deleteAuthor(authorId).subscribe({
      next: (data) => {
        this.deleteButtonIsDisabled.set(true);
        this.message.set(data);
        console.log('DATA', data);
      },
      error: (erreur) => console.log('ERREUR', erreur),
      complete: () => console.log('Complete !!!')
    });
  }
}
