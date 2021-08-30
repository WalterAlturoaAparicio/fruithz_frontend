import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeguridadService } from '../../seguridad/seguridad.service';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit, OnDestroy {
  @Output() menuToogle = new EventEmitter<void>();
  estadoUsuario: boolean;
  usuarioSubscription: Subscription;

  constructor(private seguridadServicie: SeguridadService) { }
  ngOnDestroy(): void {
    this.usuarioSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.usuarioSubscription = this.seguridadServicie.seguridadCambio.subscribe( status => {
      this.estadoUsuario = status;
    });
  }

  onMenuToggleDispatch() {
    this.menuToogle.emit();
  }
  terminarSesion() {

    this.seguridadServicie.salirSesion();
  }
}
