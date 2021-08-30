import { Injectable } from '@angular/core';
import { Medico } from './medico.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { PaginationMedicos } from './pagination-medicos.model';

@Injectable({
  providedIn: 'root',
})
export class MedicosService {
  baseUrl = environment.baseUrl;

  private medicoSubject = new Subject();
  private medicosLista: Medico[] = [];

  medicoPagination: PaginationMedicos;
  medicoPaginationSubject = new Subject<PaginationMedicos>();

  constructor(private http: HttpClient) { }

  obtenerMedico() {
    this.http.get<Medico[]>(this.baseUrl + 'Medico')
    .subscribe((data)=>{
      this.medicosLista = data;
      this.medicoSubject.next([...this.medicosLista]);

    });
  }
  obtenerMedicos(itemPorPagina: number, paginaActual: number, sort: string, sortDirection: string, filterValue: any) : void{
    const request ={
      pageSize: itemPorPagina,
      page: paginaActual,
      sort,
      sortDirection,
      filterValue
    };
    this.http.post<PaginationMedicos>(this.baseUrl + 'Medico/Pagination', request)
    .subscribe((response)=>{
      this.medicoPagination = response;
      this.medicoPaginationSubject.next(this.medicoPagination);
    });
  }
  obtenerActualListener(): any{
    return this.medicoPaginationSubject.asObservable();
  }
  obtenerActualListenerSinPag(): any{
    return this.medicoSubject.asObservable();
  }
  guardarMedico(medico: Medico): void{
    this.http.post(this.baseUrl + 'Medico', medico).subscribe((response)=>{
      this.medicoSubject.next();
    });
  }
  modificarMedico(medico: Medico, id: string):void {
    this.http.put(this.baseUrl + 'Medico/' + id, medico).subscribe((response)=>{
      this.medicoSubject.next();
    });
  }
  guardarMedicoListener() : any{
    return this.medicoSubject.asObservable();
  }
  eliminarMedico(id: string) :void {
    this.http.delete(this.baseUrl+'Medico/'+id).subscribe(()=>{
      this.medicoSubject.next();
    });
  }

 }
