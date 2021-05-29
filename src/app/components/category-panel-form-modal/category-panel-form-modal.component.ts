import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Room } from 'src/app/models/room';
import { CategoryService } from 'src/app/services/category.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-category-panel-form-modal',
  templateUrl: './category-panel-form-modal.component.html',
  styleUrls: ['./category-panel-form-modal.component.css'],
})
export class CategoryPanelFormModalComponent implements OnInit {
  categoryForm: FormGroup;
  clicked = false;
  @Input() currentRoom: Room;
  file: File;
  path:any;
  constructor(
    private toastrService: ToastrService,
    public activeModal: NgbActiveModal,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.createCategoryForm();
  }

  createCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      categoryName: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }
  async fileChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files[0];
    this.path = await this.fileToBase64(this.file);
  }
   addCategory() {
    if (this.categoryForm.valid) {
      if(this.file.size>1000000){
        this.toastrService.error("Dosya 1mb'den küçük olmalı!")
      }else{
        this.clicked = true;
        var upload = Object.assign({},this.categoryForm.value,{path:this.path})
        this.storageService.upload(upload).subscribe(
          (response) => {
            var category = Object.assign({}, this.categoryForm.value, {
              roomId: this.currentRoom.id,
              imagePath: response.data[0],
              imageFileName: response.data[1],
            });
            this.categoryService.add(category).subscribe(
              (response) => {
                this.toastrService.success(response.message);
                this.activeModal.dismiss();
              },
              (responseError) => {
                this.clicked = false;
                this.toastrService.error(responseError);
              }
            );
          },
          (responseError) => {
            this.clicked=false;
            this.toastrService.error(responseError);
          }
        );
      }
     
    }
  }
 
  async fileToBase64(file:File) {
    var buffer = await this.file.arrayBuffer()
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}
}
