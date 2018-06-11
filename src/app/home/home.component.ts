import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    clickMessage = '';
    values = "";
    items = [];

    datas = [
        {"id": 1, "name": "Angular"},
        {"id": 2, "name": "Node"},
        {"id": 3, "name": "HTML"},
        {"id": 4, "name": "CSS"},
        {"id": 5, "name": "JavaScript"}
    ];

    constructor(private router: Router) { }

    ngOnInit() {
    }

    onClickName() {
        this.clickMessage = "Abc";
    }

    onEnter(value: string) {
        this.values = value;
    }

    addList(value: string) {
        if (value) {
            this.items.push(value);
        }
    }

    onSelect(data) {
        this.router.navigate(['/home', data.id]);
    }
}
