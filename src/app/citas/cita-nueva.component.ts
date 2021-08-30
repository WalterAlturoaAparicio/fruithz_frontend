import { Time } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption, ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { setDate } from 'date-fns';
import { Subscription } from 'rxjs';
import { Medico } from '../medicos/medico.model';
import { MedicosService } from '../medicos/medicos.service';
import { Cita } from './citas.model';
import { CitasService } from './citas.service';

@Component({
  selector: 'app-cita-nueva',
  templateUrl: 'cita-nueva.component.html',
})
export class CitaNuevaComponent implements OnInit, OnDestroy {
  selectMedico: string;
  selectMedicoTexto: string;
  fechaStart: string;
  fechaEnd: string;
  color: ThemePalette = 'primary';
  medicoSubscription: Subscription;
  hora: string;
  medicos: Medico[] = [];

  constructor(
    private citasService: CitasService,
    private dialogRef: MatDialog,
    private medicoService: MedicosService
  ) {}
  ngOnDestroy(): void {
    this.medicoSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.medicoService.obtenerMedico();
    this.medicoSubscription = this.medicoService
      .obtenerActualListenerSinPag()
      .subscribe((medicosBackend: Medico[]) => {
        this.medicos = medicosBackend;
      });
  }
  selected(event: MatSelectChange) {
    this.selectMedicoTexto = (event.source.selected as MatOption).viewValue;
  }

  guardarCita(form: NgForm) {
    if (form.valid) {
      const medicoRequest = {
        id: this.selectMedico,
        nombreCompleto: this.selectMedicoTexto
      };
      let hh = parseInt(this.hora.split(":")[0]);
      let min =  parseInt(this.hora.split(":")[1]);
      let startNormalized = new Date(this.fechaStart);
      startNormalized.setHours(startNormalized.getHours()+hh, min);
      let endNormalized = new Date(startNormalized);
      endNormalized.setHours(endNormalized.getHours(),min+30);

      const citaRequest = {
        id: null,
        user: form.value.user,
        medico: medicoRequest,
        sede: form.value.sede,
        title: form.value.asunto,
        start: startNormalized,
        end: endNormalized,
        allDay: false,
      }
      this.citasService.guardarCita(citaRequest);
      this.medicoSubscription = this.citasService.obtenerActualListener().subscribe(()=>{
        this.dialogRef.closeAll();
      });
    }
  }
}
