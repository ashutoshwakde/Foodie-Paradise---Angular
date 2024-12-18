import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  cards: Card[] = [];
  card: Card = {
    id: "",
    cardholderName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
  };

  searchTerm: string = "";

  constructor(private cardsService: CardService) {}

  ngOnInit() {
    this.getAllCards();
  }

  getAllCards() {
    this.cardsService.GetAllCards().subscribe((response) => {
      this.cards = response;
    });
  }

  filteredCards() {
    return this.cards.filter((card) =>
      card.cardholderName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSubmit() {
    if (this.card.id === "") {
      this.cardsService.addCard(this.card).subscribe((response) => {
        this.getAllCards();
        this.card = {
          id: "",
          cardholderName: "",
          cardNumber: "",
          expiryMonth: "",
          expiryYear: "",
          cvc: "",
        };
      });
    } else {
      this.updateCard(this.card);
    }
  }

  deleteCard(id: string) {
    this.cardsService.deleteCard(id).subscribe((Response) => {
      this.getAllCards();
    });
  }

  populateForm(card: Card) {
    this.card = card;
  }

  updateCard(card: Card) {
    this.cardsService.updateCard(card).subscribe((Response) => {
      this.getAllCards();
    });
  }

  defaultValues = {
    cardName: "",
    cardNumber: "",
    CVC: "",
    expiryMonth: "",
    expiryYear: "",
  };

}
