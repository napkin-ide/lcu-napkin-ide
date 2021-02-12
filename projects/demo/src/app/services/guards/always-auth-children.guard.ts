import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AlwaysAuthChildrenGuard implements CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        console.log('AlwaysAuthChildrenGuard');
        return true;
    }
}
