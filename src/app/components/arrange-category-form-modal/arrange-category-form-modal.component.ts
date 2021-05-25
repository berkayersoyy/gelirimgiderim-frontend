import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Room } from 'src/app/models/room';
import { CategoryService } from 'src/app/services/category.service';
import { ImageService } from 'src/app/services/image.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-arrange-category-form-modal',
  templateUrl: './arrange-category-form-modal.component.html',
  styleUrls: ['./arrange-category-form-modal.component.css'],
})
export class ArrangeCategoryFormModalComponent implements OnInit {
  categoryForm: FormGroup;
  clicked = false;
  choosed = false;
  currentCategory: Category;
  categories: Category[];
  @Input() currentRoom: Room;
  file: File;
  path: any;

  constructor(
    private toastrService: ToastrService,
    public activeModal: NgbActiveModal,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.categoryService.getCategories(this.currentRoom.id).subscribe(
      (response) => {
        this.categories = response.data;
      },
      (responseError) => {
        this.toastrService.error(responseError.error.message);
      }
    );
  }
  setCurrentCategory(category: Category) {
    this.currentCategory = category;
    this.createCategoryForm();
    this.choosed = true;
  }
  getCurrentCategoryClass(category: Category) {
    if (category == this.currentCategory) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  getCurrentCategoryImagePath() {
    return this.currentCategory.imagePath;
  }
  createCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      categoryName: [
        this.currentCategory.categoryName,
        [Validators.required, Validators.maxLength(20)],
      ],
    });
  }
  async fileChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files[0];
    this.path = await this.fileToBase64(this.file);
  }
  updateCategory() {
    if (this.categoryForm.valid) {
      if (this.file.size > 1000000) {
        this.toastrService.error("Dosya 1mb'den küçük olmalı!");
      } else {
        this.clicked = true;
        var upload = Object.assign({}, this.categoryForm.value, {
          path: this.path,
        });
        this.storageService.upload(upload).subscribe(
          (response) => {
            var category = Object.assign({}, this.categoryForm.value, {
              roomId: this.currentRoom.id,
              imagePath: response.data[0],
              imageFileName: response.data[1],
            });
            this.categoryService.update(category).subscribe(
              (response) => {
                this.storageService
                  .delete(this.currentCategory.imageFileName)
                  .subscribe(
                    (response) => {
                      this.toastrService.success(response.message);
                      this.activeModal.dismiss();
                    },
                    (errorResponse) => {
                      console.log(errorResponse);
                      this.clicked = false;
                      this.toastrService.error(errorResponse.error.message);
                    }
                  );
              },
              (errorResponse) => {
                console.log(errorResponse);
                this.clicked = false;
                this.toastrService.error(errorResponse.error.message);
              }
            );
          },
          (responseError) => {
            this.clicked = false;
            console.log(responseError);
          }
        );
      }
    }
  }
  deleteCategory() {
    this.clicked=true;
    this.storageService.delete(this.currentCategory.imageFileName).subscribe(
      (response) => {
        this.categoryService.delete(this.currentCategory).subscribe(
          (response) => {
            this.toastrService.info(response.message);
            this.activeModal.dismiss();
          },
          (responseError) => {
            this.clicked=false;
            this.toastrService.error(responseError.error.message);
          }
        );
      },
      (responseError) => {
        this.clicked=false;
        this.toastrService.error(responseError.error.message);
      }
    );
  }

  async fileToBase64(file: File) {
    var buffer = await this.file.arrayBuffer();
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}
