import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { Medico } from './medico.model';
import { MedicosService } from './medicos.service';

@Component({
  selector: 'app-medico-nuevo',
  templateUrl: 'medico-nuevo.component.html',
})
export class MedicoNuevoComponent implements OnInit, OnDestroy {
  selectEspe: string;
  fechaPublicacion: string;

  medicoSubscription: Subscription;
  medicos: Medico[] = [];
  especialist = ["Endodoncista","Ortodoncista", "Prostodoncista","Odonpediatra"];

  constructor(
    private medicosService: MedicosService,
    private dialogRef: MatDialog
  ) {}
  ngOnDestroy(): void {
    this.medicoSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.medicosService.obtenerMedico();
    this.medicoSubscription = this.medicosService
      .obtenerActualListener()
      .subscribe((medicoBackend: Medico[]) => {
        this.medicos = medicoBackend;
      });
  }

  selected(event: MatSelectChange) {
    this.selectEspe = (event.source.selected as MatOption).viewValue;
  }

  guardarMedico(form: NgForm) {
    if (form.valid) {
      const medicoRequest = {
        id: null,
        nombre: form.value.nombre,
        apellido: form.value.apellido,
        cedula: form.value.cedula.toString(),
        especializacion: this.selectEspe
      };
      this.medicosService.guardarMedico(medicoRequest);
      this.medicoSubscription = this.medicosService.guardarMedicoListener().subscribe(() => {
        this.dialogRef.closeAll();
      });
    }
  }
}
