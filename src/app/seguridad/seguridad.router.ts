import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { SeguridadService } from "./seguridad.service";

@Injectable()
export class SeguridadRouter implements CanActivate{
  constructor(private seguridadServicie: SeguridadService, private router: Router){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if(this.seguridadServicie.onSesion()){
      return true;
    }else{
      this.router.navigate(['/login']);
    }

  }

}
