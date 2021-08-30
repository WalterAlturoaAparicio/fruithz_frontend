import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { Medico } from './medico.model';
import { MedicosService } from './medicos.service';

@Component({
  selector: 'app-medico-modificar',
  templateUrl: 'medico-modificar.component.html',
})
export class MedicoModificarComponent implements OnInit, OnDestroy {
  selectEspe: string;
  fechaPublicacion: string;

  @ViewChild(MatDatepicker) picker: MatDatepicker<Date>;

  medicoSubscription: Subscription;
  medicos: Medico[] = [];
  cedula: number;

  especialist = [
    'Endodoncista',
    'Ortodoncista',
    'Prostodoncista',
    'Odonpediatra',
  ];

  constructor(
    private medicosService: MedicosService,
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Medico
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

    if (this.data.especializacion !== null)
      this.selectEspe = this.data.especializacion;

    if (this.data.cedula !== null) this.cedula = parseInt(this.data.cedula);
  }

  selected(event: MatSelectChange) {
    this.selectEspe = (event.source.selected as MatOption).viewValue;
  }

  modificarMedico(form: NgForm) {
    if (form.valid) {
      this.cedula = form.value.cedula;
      const medicoRequest = {
        id: this.data.id,
        nombre: form.value.nombre,
        apellido: form.value.apellido,
        cedula: this.cedula.toString(),
        especializacion: this.selectEspe,
      };
      this.medicosService.modificarMedico(medicoRequest, medicoRequest.id);
      this.medicoSubscription = this.medicosService
        .guardarMedicoListener()
        .subscribe(() => {
          this.dialogRef.closeAll();
        });
    }
  }
}
