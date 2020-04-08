import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, pipe } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HeroService {

    private heroesUrl = 'api/heroes';
    private httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    constructor(private messageService: MessageService, private httpClient: HttpClient) { }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.log(error);
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

    getHeroes(): Observable<Hero[]> {
        return this.httpClient.get<Hero[]>(this.heroesUrl).pipe(
            tap(_ => this.log('fetched heroes')),
            catchError(this.handleError<Hero[]>('getHeroes', []))
        );
    }

    getHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.httpClient.get<Hero>(url).pipe(
            tap(_ => this.log(`fetched hero id=${id}`)),
            catchError(this.handleError<Hero>(`getHero id=${id}`))
        );
    }

    updateHero(hero: Hero): Observable<any> {
        return this.httpClient.put(this.heroesUrl, hero, this.httpOptions).pipe(
            tap(_ => this.log(`Updated hero id=${hero.id}`),
                catchError(this.handleError<any>('updateHero'))
            )
        );
    }

    addHero(hero: Hero): Observable<Hero> {
        return this.httpClient.post(this.heroesUrl, hero, this.httpOptions).pipe(
            tap((newHero: Hero) => this.log(`added hero with id = ${newHero.id}`)),
            catchError(this.handleError<Hero>('addHero'))
        );
    }

    deleteHero(hero: Hero | number): Observable<Hero> {
        const id = typeof hero === 'number' ? hero : hero.id;
        const url = `${this.heroesUrl}/${id}`;

        return this.httpClient.delete<Hero>(url, this.httpOptions).pipe(
            tap(_ => this.log(`deleted hero id = ${id}`)),
            catchError(this.handleError<Hero>('deleteHero'))
        )

    }

    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }
}
