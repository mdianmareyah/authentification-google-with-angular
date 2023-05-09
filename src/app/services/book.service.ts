import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Observable , map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private bookCollection!: AngularFirestoreCollection<Book>;
  books !: Observable<Book[]>;
  private bookDocument !: AngularFirestoreDocument<Book>;

  constructor(private afirestore: AngularFirestore) {
    this.bookCollection = this.afirestore.collection<Book>("Livres");
    this.books = this.bookCollection.snapshotChanges().pipe(
      map(changes => changes.map(
        value => {
          const data = value.payload.doc.data() as Book;
          const id = value.payload.doc.id;
          return {id, ...data}
        }
      ))
    )
  }

  add(book : Book) {
    return this.bookCollection.add(book);
  }

  delete(book : Book) {
    this.bookDocument = this.afirestore.doc<Book>("Livres/" + book.id);
    return this.bookDocument.delete();
  }

  update(book: Book) {
    this.bookDocument = this.afirestore.doc<Book>("Livres/" + book.id);
    return this.bookDocument.update(book);
  }
}
