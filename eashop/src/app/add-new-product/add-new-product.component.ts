import {Component, OnInit, ViewChild} from '@angular/core';
import {GoodsService} from "../api/services/goodsService";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from "../api/models/category";
import {CategoryService} from "../api/services/categoryService";
import {FileService} from "../api/services/fileService";
import {API_URL} from "../api/apiConstants";

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {

  categories: Category[];
  productForm: FormGroup;
  isSuccess: boolean = false;
  isError: boolean = false;
  fileUrl;
  @ViewChild('productFormDirective') productFormDirective;
  productFormErrors = {
    'name': '',
    'description': '',
    'imageFile': '',
    'price': '',
    'size': ''
  };
  validationMessages = {
    'name': {
      'required': 'Назва товару є обов\'язковим полем.',
      'minlength': 'Назва товару повинна складатися щонайменше з двох символів.',
      'maxlength': 'Назва товару максимально може містити 30 символів.'
    },
    'description': {
      'required': 'Опис товару є обов\'язковим полем.'
    },
    'imageFile': {
      'required': 'Зображення товару є обов\'язковим полем.'
    },
    'price': {
      'required': 'Вартість товару є обов\'язковим полем.',
      'min': 'Вартість товару не може бути меншою за 0.'
    },
    'size': {
      'required': 'Розмір товару є обов\'язковим полеем.',
      'maxlength': 'Розмір товару максимально може містити 10 символів.'
    }
  };

  constructor(
    private  categoryService: CategoryService,
    private goodsService: GoodsService,
    private fileService: FileService,
    private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.getCategories();
  }

  createForm() {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', Validators.required],
      imageFile: [],
      price: [0, [Validators.required, Validators.min(0)]],
      size: ['', [Validators.required, Validators.maxLength(10)]],
      active: false,
      categoryName: ['Men', [Validators.min(1), Validators.max(6)]],
    });

    this.productForm.valueChanges
      .subscribe(data => {
        this.onDataChanged(data);
      });

    this.onDataChanged();
  }

  onDataChanged(data?: any) {
    if (!this.productForm) {
      return;
    }
    const form = this.productForm;
    for (const field in this.productFormErrors) {
      if (this.productFormErrors.hasOwnProperty(field)) {
        //clear previous error message (if any)
        this.productFormErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.productFormErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.uploadData();
  }

  resetProductForm() {
    this.productForm.reset({
      name: '',
      description: '',
      image: '',
      price: 0,
      size: '',
      active: false,
      categoryName: 'Men'
    });
  }

  getCategories() {
     this.categoryService.getCategories()
      .then((categories) => {
        this.categories = categories;
      })
      .catch((error) => {
        console.log(error);
      })
  }

  getCategoryId(categoryName) {
    for (let category of this.categories) {
      if (category.name === categoryName) {
        return category.id;
      }
    }
  }

  getFileFromForm() {
    return (<HTMLInputElement>document.getElementById('productImageFile')).files[0];
  }

  getFileInFormDataFormat() {
    let formData:FormData = new FormData();
    formData.append('file', this.getFileFromForm());
    return formData;
  }


  uploadData() {
    this.fileService.uploadFile(this.getFileInFormDataFormat()).subscribe(data => {
        this.fileUrl = data['fileName'];
      },
      error => console.log(error.status),
      () => this.sendForm());
  }

  sendForm() {
    this.goodsService.createGoods(this.loadGoodObject())
      .subscribe((data) => {
        if(data) {
          this.isSuccess = true;
          setTimeout(() => {
            this.isSuccess = false;
          }, 2000);
        }
      },
      error => {
        console.log("Error: " + error);
        if(error) {
          this.isError = true;
          setTimeout(() => {
            this.isError = false;
          }, 2000);
        }
      });
    this.productFormDirective.resetForm();
    this.resetProductForm();
  }

  loadGoodObject() {
    return {
      "id": 0,
      "name": `${this.productForm.value.name}`,
      "description": `${this.productForm.value.description}`,
      "image": `${API_URL}/File/${this.fileUrl}`,
      "price": this.productForm.value.price,
      "size": `${this.productForm.value.size.toUpperCase()}`,
      "active": this.productForm.value.active,
      "categoryId":  this.getCategoryId(this.productForm.value.categoryName)
    }
  }



}
