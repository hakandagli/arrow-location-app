import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  directionNumber: number = 100;
  directionDeg: number = 0;
  text: string = "LLGRLRG"
  disabled: boolean = false;
  columns: number = 10;
  rows: number = 10;
  bottom: number = 0;
  left: number = 0;
  leftInput: number = 4;
  bottomInput: number = 3;

  ngOnInit(): void {

  }

  constructor() {

  }

  rowCounter() {
    return new Array(this.columns);
  }

  columnCounter() {
    return new Array(this.rows)
  }

  calculate() {

    if(this.leftInput>this.rows || this.bottomInput>this.columns)
      return

    this.left = this.leftInput * 60;
    this.bottom = this.bottomInput * 60;
    this.disabled = true;
    this.text = this.text.toUpperCase();
    setTimeout(() => {
      for (var i = 0; i < this.text.length; i++) {
        this.textReaderAsync(this.text.charAt(i), i);
      }
    }, 2000)
  }

  textReaderAsync(a: string, i: number) {
    setTimeout(() => {
      switch (a) {
        case "R": {
          this.directionNumber++;
          this.directionDeg = this.directionDeg + 90;
          break;
        }
        case "L": {
          if (this.directionNumber == 1)
            this.directionNumber = 97
          this.directionNumber--;
          this.directionDeg = this.directionDeg - 90;
          break;
        }
        case "G": {
          this.arrowLocation();
          break;
        }
        default: {
          break;
        }
      }
    }, i * 1000)
  }

  arrowLocation() {
    switch (this.directionNumber % 4) {
      case 0: {
        this.bottom += 60;
        break;
      }
      case 1: {
        this.left += 60;
        break;
      }
      case 2: {
        if (this.bottom != 60)
          this.bottom -= 60;
        break;
      }
      case 3: {
        if (this.left != 60)
          this.left -= 60;
        break;
      }
    }
  }

  getStyles(directionDeg?: number, left?: number, bottom?: number) {
    return {
      display: "flex",
      transition: "all 1s ease",
      position: "absolute",
      left: `${left}px`,
      bottom: `${bottom}px`,
      width: "15px",
      height: "60px",
      transform: `rotate(${directionDeg}deg)`,
    }
  }
}
