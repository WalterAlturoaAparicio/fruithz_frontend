import { Injectable } from '@angular/core';
import { Cita } from './citas.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  baseUrl = environment.baseUrl;

  private citaSubject = new Subject();
  private citasLista: Cita[] = [];

  constructor(private http: HttpClient) { }

  obtenerCita() {
    this.http.get<Cita[]>(this.baseUrl + 'Cita')
    .subscribe((data)=>{
      this.citasLista = data;
      this.citaSubject.next([...this.citasLista]);
    });
  }
  guardarCita(cita: Cita): void{
    this.http.post(this.baseUrl + 'Cita', cita).subscribe((response)=>{
      this.citaSubject.next();
    });
  }
  modificarCita(medico: Cita, id: string):void {
    this.http.put(this.baseUrl + 'Cita/' + id, medico).subscribe((response)=>{
      this.citaSubject.next();
    });
  }
  eliminarCita(id: string) :void {
    this.http.delete(this.baseUrl+'Cita/'+id).subscribe(()=>{
      this.citaSubject.next();
    });
  }
  obtenerActualListener(): any{
    return this.citaSubject.asObservable();
  }

 }
