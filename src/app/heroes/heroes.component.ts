import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  myMessage: string;
  heroes: Hero[];
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
    this.myMessage = 'This is my message';
  }
  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}
