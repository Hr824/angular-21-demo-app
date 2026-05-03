import { Component, computed, inject } from '@angular/core';
import { AuthorService } from '../../../../services/dotnet-api/author-service';
import { Author } from '../../../../models/dotnet-api/author';
import { UpperCasePipe } from '@angular/common';
import { LoaderComponent } from '../../../../components/loader/loader-component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-author-list-component',
  imports: [LoaderComponent, UpperCasePipe, RouterLink],
  templateUrl: './author-list-component.html',
  styleUrl: './author-list-component.css',
})
export class AuthorListComponent {

  authorService = inject(AuthorService);

  authorHttpResource = this.authorService.getAllAuthorHttpResource();

  authorList = computed(() => this.authorHttpResource.value() ?? [] as Author[]);
}