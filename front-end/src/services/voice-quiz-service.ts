import { Injectable } from '@angular/core';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root',
})
export class VoiceRecognitionService {
  sound = new webkitSpeechRecognition();
  beginspeech = false;
  public text: String = '';
  tempWords: String;

  constructor() {}

  init() {
    this.sound.interimResults = true;
    this.sound.lang = 'fr-FR';
    this.sound.addEventListener('result', (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      console.log(this.tempWords);
    });
  }

  getText() {
    return this.text;
  }
  setText(){
    this.text = "";
  }

  stop() {
    this.text = "";
    this.sound.stop();
    console.log('Terminer');
  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords + '.';
    this.tempWords = '';
  }
}
