import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextSpeechService {

  constructor() { }

  
  public voice: SpeechSynthesisVoice | null ;
	public text: string;
	public voices: SpeechSynthesisVoice[] = speechSynthesis.getVoices();

    public speak(text : string) : void {
		this.stop();
		this.synthesizeSpeechFromText(text);
	}

  public stop() : void {
		if ( speechSynthesis.speaking ) {
			speechSynthesis.cancel();
		}
	}

  public synthesizeSpeechFromText(text: string) : void {
		var utterance = new SpeechSynthesisUtterance( text );
		utterance.voice = speechSynthesis.getVoices()[2];
    utterance.rate = 0.7
		speechSynthesis.speak( utterance );
	}

}
