import { NgForm } from '@angular/forms';
import { BookService } from './../services/book.service';
import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books !: Book[];
  bookState : boolean = false;
  bookMo !: Book;

  constructor(private bookService : BookService) {

  }

  ngOnInit(): void {
    this.bookService.books.subscribe(
      (items) => {
        this.books = items;
      }
    )
  }

  delete(event: any, book: Book) {
    this.bookService.delete(book).then(
      (value) => {
        alert("suppression du livre" + book.nom);
      }
    );
  }

  edit(event : any , book : Book)  {
    this.bookState = true;
    this.bookMo = book;
  }


  submit(form: NgForm) {
    if(this.bookMo) {
      this.bookService.update(this.bookMo).then(
        () => {
          alert("reussie");
          this.bookState = false;
          
        }
      )
    }
  }
}
