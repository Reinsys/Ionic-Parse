import { Injectable } from '@angular/core';
import { Parse } from 'parse';
import 'rxjs/add/operator/map';

/*
  Generated class for the ParseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ParseProvider {
  private parseAppId: string = "test";
  private parseServerUrl: string = "http://localhost:1338/parse";

  constructor() {
    this.parseInitialize();
    console.log('Initiated Parse');
  }
  getGameScores(offset: number = 0, limit: number = 3): Promise<any> {
     return new Promise((resolve,reject) => {
        setTimeout(() => {
          const GameScore = Parse.Object.extend("GameScore");
          let query = new Parse.Query(GameScore);
          query.skip(offset);
          query.limit(limit);
          query.find().then(function(gameScores){
            resolve(gameScores);
            }, (error) => {
            reject(error);
          });
        }, 500);
     });
    
  }
  addGameScore(newScore): Promise<any>{
    const GameScore = Parse.Object.extend("GameScore");
    let gameScore = new GameScore();

    gameScore.set("score", parseInt(newScore.score));
    gameScore.set("playerName", newScore.playerName);
    gameScore.set("cheatMode", false);

    return gameScore.save(null, {
      success: function(gameScore) {
        console.log(gameScore);
        return gameScore;
      },
      error: function(gameScore, error) {
        console.log(error);
        return error;
      }
    });
  }
  parseInitialize(){
    Parse.initialize(this.parseAppId);
    Parse.serverURL = this.parseServerUrl;
  }

}
