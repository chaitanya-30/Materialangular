import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MaterialCRUD';
  displayedColumns: string[] = ['productname', 'price', 'RAM', 'storage','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private dialog:MatDialog,private api:ApiService){

  }
  ngOnInit(): void {
    this.getallproducts();
  }
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent,{
width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val==='saved'){
        this.getallproducts();
      }
    });

   
  }
  getallproducts(){
this.api.getproduct().subscribe({
  next:(res)=>{
this.dataSource=new MatTableDataSource(res);
this.dataSource.paginator=this.paginator;
this.dataSource.sort=this.sort;
  },error:(err)=>{
    alert("error while fetching data");
  }

})

}
  editproduct(rowdata: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: rowdata

    }).afterClosed().subscribe(val => {
      if (val === 'updated') {
        this.getallproducts();
      }
    })

  }
  deleteproduct(row:any){
    this.api.deleteproduct(row.id)
    .subscribe({
      next:(res)=>{
        alert("deleted successfully");
        this.getallproducts();
      },error:(err)=>{
        alert("problem in deleting");
      }
    })
  }
} 
  // export class TableOverviewExample implements AfterViewInit {
   
  
  //   constructor() {
  //     // Create 100 users
  //     // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
  
  //     // Assign the data to the data source for the table to render
  //     // this.dataSource = new MatTableDataSource(users);
  //   }
  
   
  
    
  // }
  
  // // /** Builds and returns a new User. */
  // // function createNewUser(id: number): UserData {
  //   const name =
  //     NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
  //     ' ' +
  //     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
  //     '.';
  
  //   return {
  //     id: id.toString(),
  //     name: name,
  //     progress: Math.round(Math.random() * 100).toString(),
  //     fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  //   };
  // }
