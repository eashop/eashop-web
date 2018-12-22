import {Component, OnInit, ViewChild} from '@angular/core';
import {GoodsService} from "../api/services/goodsService";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from "../api/models/category";
import {CategoryService} from "../api/services/categoryService";
import {FileService} from "../api/services/fileService";

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {

  categories: Category[];
  productForm: FormGroup;
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
      categoryId: ['Men', [Validators.min(1), Validators.max(6)]],
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
    let img = document.getElementById('productImageFile');
    let formData:FormData = new FormData();
    formData.append('uploadFile', img[0].file);
    console.log(img[0].file);
    console.log(formData);

    let product = this.productForm.value;
    product.categoryId = this.getCategoryId(this.productForm.value.categoryId);
    product.size = product.size.toUpperCase();
    console.log(this.productForm.value);
    console.log(this.productForm.value.imageFile);
    this.fileService.uploadFile(formData).subscribe(data => {
      console.log(data);
    });
    // this.goodsService.createGoods(product)
    //   .then((product) => {
    //     console.log("New Product: " + product);
    //   })
    //   .catch((error) => {
    //     console.log("Error: " + error);
    //   });
    // this.productFormDirective.resetForm();
    // this.resetProductForm();
  }

  resetProductForm() {
    this.productForm.reset({
      name: '',
      description: '',
      image: '',
      price: 0,
      size: '',
      active: false,
      categoryId: 'Men'
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

}
