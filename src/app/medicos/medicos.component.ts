import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MedicoModificarComponent } from './medico-modificar.component';
import { MedicoNuevoComponent } from './medico-nuevo.component';
import { Medico } from './medico.model';
import { MedicosService } from './medicos.service';
import { PaginationMedicos } from './pagination-medicos.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) ordenamiento: MatSort;
  @ViewChild(MatPaginator) paginacion: MatPaginator;

  desplegarColumnas = ['cedula','nombre', 'apellido', 'especializacion','star'];
  dataSource = new MatTableDataSource<Medico>();

  private medicoSubscription: Subscription;

  totalLibros = 0;
  itemPorPagina = 5;
  paginaCombo = [1, 2, 5, 10];
  paginaActual = 1;
  sort = 'nombre';
  sortDirection = 'asc';
  filterValue = null;
  timeout: any = null;

  constructor(private medicosService: MedicosService, private dialog: MatDialog) {}

  ngOnDestroy(): void {
    this.medicoSubscription.unsubscribe();
  }
  ordenarColumna(event): void {
    this.sort = event.active;
    this.sortDirection = event.direction;
    this.medicosService.obtenerMedicos(
      this.itemPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
  }
  ngOnInit(): void {
    this.medicosService.obtenerMedicos(
      this.itemPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
    this.medicoSubscription = this.medicosService
      .obtenerActualListener()
      .subscribe((pagination: PaginationMedicos) => {
        this.dataSource = new MatTableDataSource<Medico>(pagination.data);
        this.totalLibros = pagination.totalRows;
      });
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginacion;
  }
  hacerFiltro(event: any): void {
    clearTimeout(this.timeout);
    const $this = this;
    this.timeout = setTimeout(()=>{
      if (event.keyCode != 13) {
        const filterValueLocal = {
          propiedad: 'nombre',
          valor: event.target.value,
        };
        $this.filterValue = filterValueLocal;
        $this.medicosService.obtenerMedicos(
          $this.itemPorPagina,
          $this.paginaActual,
          $this.sort,
          $this.sortDirection,
          $this.filterValue
        );
      }
    }, 1000);
  }
  eventPaginador(event: PageEvent) : void {
    this.itemPorPagina = event.pageSize;
    this.paginaActual = event.pageIndex + 1;
    this.medicosService.obtenerMedicos(
      this.itemPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
  }
  abrirDialog(): void {
    const dialogRef = this.dialog.open(MedicoNuevoComponent, {
      width: '650px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.medicosService.obtenerMedicos(
        this.itemPorPagina,
        this.paginaActual,
        this.sort,
        this.sortDirection,
        this.filterValue
      );
    });
  }
  editarElement(element: any){
    const dialogRef= this.dialog.open(MedicoModificarComponent,{
      width: '650px',
      data: element
    });
    dialogRef.afterClosed().subscribe(() => {
      this.medicosService.obtenerMedicos(
        this.itemPorPagina,
        this.paginaActual,
        this.sort,
        this.sortDirection,
        this.filterValue
      );
      console.log(element);

    });
  }
  eliminarElement(element: any) {
    this.medicosService.eliminarMedico(element.id);
    this.medicoSubscription = this.medicosService.guardarMedicoListener().subscribe(() => {
      this.ngOnInit();
    });
  }
}
