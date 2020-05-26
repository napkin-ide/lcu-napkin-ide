import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'packageIntervalPipe'})
export class PackageIntervalPipe implements PipeTransform {
  transform(value: string): string {
    //   console.log("pipe =", value)
    if(value === "LCU"){
        return "Fathym Low Code Framework";
    }
    else if(value === "forecast"){
        return "Fathym Forecaster API";
    }
  }
}