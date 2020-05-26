import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'nthPowerToString'})
export class NthPowerToStringPipe implements PipeTransform {
  transform(value: string): string {
    //   console.log("pipe =", value)
    if(value === "10000"){
        return "10 thousand";
    }
    else if(value === "100000"){
        return "100 thousand";
    }
    else if(value === "1000000"){
        return "1 million";
    }
    else if(value === "10000000"){
        return "10 million";
    }
    else if(value === "1000000000"){
        return "1 billion";
    }
  }
}