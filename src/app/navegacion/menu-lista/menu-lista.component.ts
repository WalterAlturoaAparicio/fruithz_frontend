import { Component,EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeguridadService } from '../../seguridad/seguridad.service';

@Component({
  selector: 'app-menu-lista',
  templateUrl: './menu-lista.component.html',
  styleUrls: ['./menu-lista.component.css']
})
export class MenuListaComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter<void>();
  estadoUsuario: boolean;
  usuarioSubscription: Subscription;

  constructor(private SeguridadService: SeguridadService) { }
  ngOnDestroy(): void {
    this.usuarioSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.usuarioSubscription =this.SeguridadService.seguridadCambio.subscribe(status=>{
      this.estadoUsuario = status;
    });
  }
  onCerrarMenu() {
    this.menuToggle.emit();
  }
  terminarSesionMenu(){
    this.onCerrarMenu();
    this.SeguridadService.salirSesion();
  }
}
