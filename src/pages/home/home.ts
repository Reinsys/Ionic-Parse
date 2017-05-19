import { Component } from '@angular/core';
import { ParseProvider } from "../../providers/parse/parse";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  newScore = {playerName: null, score: null};
  gameScores = [];
  constructor(private parseProvider: ParseProvider) {
    this.listScores();
  }
  
   listScores(): Promise<any> {
      let offset = this.gameScores.length;
      let limit = 10;
      return this.parseProvider.getGameScores(offset, limit).then(
        (result)=> {
          for (let i = 0; i < result.length; i++) {
            let object = result[i];
            this.gameScores.push( object );
          }
        },
        (error)=>{
          console.log(error);
        }
    );
  }
  postGameScore(){
    this.parseProvider.addGameScore(this.newScore).then(
      (gameScore)=> {
          this.gameScores.push(gameScore);
          this.newScore.playerName = null;
          this.newScore.score = null;
          alert("Score added.");
        },
      (error)=>{
          console.log(error);
          alert("Error adding score.");
        }
      );
  }

}
