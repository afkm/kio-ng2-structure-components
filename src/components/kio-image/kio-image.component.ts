import { 
  Component, EventEmitter, ViewChild, ElementRef, 
  Input, Output
} from '@angular/core';

@Component({
  selector: 'kio-image',
  templateUrl: './kio-image.component.html',
  styleUrls: ['./kio-image.component.css']
})
export class KioImageComponent {

  @Output() loadStart:EventEmitter<any>=new EventEmitter<any>()
  @Output() load:EventEmitter<any>=new EventEmitter<any>()
  @Output() error:EventEmitter<any>=new EventEmitter<any>()

  @Input('src') src:string

  elementClass:string[]=['loading']
  loaded:boolean=false

  elementStartsToLoad ( ) {
    this.elementClass = [ 'loading' ]
    this.loaded = false
    this.loadStart.emit()
  }

  elementLoadProgress ( event:ProgressEvent ) {
    const p = (event.loaded / event.total) * 100
    console.log('progress: %s', p )
  }

  elementDidLoad ( event ) {
    //console.log ( 'image did load "%s"' , this.src )
    this.elementClass = ['loaded']
    this.loaded = true
    this.load.emit()
  }

  elementFailed ( event ) {
    this.elementClass = ['error']
    this.error.emit()
  }
}
