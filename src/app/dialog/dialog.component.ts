import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  hide = true;
  productform!:FormGroup;
  actionbtn='Save';
  constructor(private formb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private api:ApiService,

    private dialogref:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productform=this.formb.group({
      productname:['',Validators.required],
      price:['',Validators.required],
      RAM:['',Validators.required],
      storage:['',Validators.required]
    })
   if(this.editData){
    this.actionbtn="Update";
    this.productform.controls['productname'].setValue(this.editData.productname);
    this.productform.controls['price'].setValue(this.editData.price);
    this.productform.controls['RAM'].setValue(this.editData.RAM);
    this.productform.controls['storage'].setValue(this.editData.storage);
    
   }

  }
  addProduct() {
    if (!this.editData) {
      if (this.productform.valid) {
        this.api.postproduct(this.productform.value).subscribe({
          next: (res) => {
            alert("product added successfully");
            this.productform.reset();
            this.dialogref.close('saved');
          },
          error: () => {
            alert("error while adding the product");
          }
        })

      }
    } else{
      this.updateproduct();
    }
  }
updateproduct(){
  console.log("hello update");
  this.api.putproduct(this.productform.value,this.editData.id)
  .subscribe({
    next:(res)=>{
alert("updated successfully");
this.dialogref.close('updated');
this.productform.reset();
    },error:(err)=>{
alert("error while updating the record");
    }
  })
}
}
