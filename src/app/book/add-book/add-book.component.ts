import { BookService } from './../../services/book.service';
import { Book } from './../../models/book';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
  }

  submit(form: NgForm) {

    const book : Book = {
      auteur : form.value["auteur"],
      nom: form.value["nom"],
      photoUrl: form.value["photo"],
      description: form.value["description"]
    }

    this.bookService.add(book).then(
     (value) => {
       form.reset();
     }
    )


  }

}
