import { inject, Injectable, Signal } from '@angular/core';
import { Author } from '../../models/dotnet-api/author';
import { HttpClient, httpResource } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private authorUrl: string = 'https://localhost:7195/api/author';

  private httpClient = inject(HttpClient);

  getAllAuthorHttpResource() {
    return httpResource<Author[]>(() => `${this.authorUrl}/authorsWithBooksCount`);
  }

  getByIdWithBooksHttpResource(id: Signal<number>) {
    return httpResource<Author>(() => `${this.authorUrl}/authorWithBooks/${id()}`)
  }

  //https://medium.com/@cnkumar28/angular-http-requests-get-post-put-delete-crud-operations-3210a42bdb54
  deleteAuthor(id: number): Observable<any> {
    return this.httpClient.delete(`${this.authorUrl}/delete/${id}`);
  }

  createAuthor(author: Author): Observable<any> {
    return this.httpClient.post(`${this.authorUrl}/create`, author);
  }

  updateAuthor(author: Author): Observable<any> {
    return this.httpClient.put(`${this.authorUrl}/update`, author);
  }
}