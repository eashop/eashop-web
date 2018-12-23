import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GoodsService} from "../api/services/goodsService";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from "../api/models/category";
import {CategoryService} from "../api/services/categoryService";
import {FileService} from "../api/services/fileService";
import {API_URL} from "../api/apiConstants";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {
  @ViewChild('productFormDirective') productFormDirective;
  @ViewChild('catName') elCategoryName:ElementRef;
  categories: Category[];
  productForm: FormGroup;
  isSuccess: boolean = false;
  isError: boolean = false;
  fileUrl;
  categoryName;
  product;
  imgPreview;
  isUpdatingProduct: boolean = false;
  isAddingProduct: boolean = false;
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
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.createForm();

    if(this.router.url == '/add-product') {
      this.isAddingProduct = true;
    } else {
      this.isUpdatingProduct = true;
    }
  }

  ngOnInit() {
    this.getCategories();
    if(this.router.url !== '/add-product') {
      this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
        const productId = +params.get('id');
        return this.goodsService.getSingleGoods(productId)
          .then((product) => {
            this.product = product;
            this.categoryName = this.getCategoryName(this.product.categoryId);
            this.setForm();
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  }

  createForm() {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', Validators.required],
      imageFile:  [],
      price: [0, [Validators.required, Validators.min(0)]],
      size: ['', [Validators.required, Validators.maxLength(10)]],
      categoryName: ['Men', [Validators.min(1), Validators.max(6)]]
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
    if(this.router.url == '/add-product') {
      this.uploadDataPOST();
    } else {
      this.uploadDataPUT();
    }
  }

  setForm() {
    this.productForm.reset({
      name: `${this.product.name}`,
      description: `${this.product.description}`,
      imageFile: '',
      price: this.product.price,
      size: `${this.product.size}`,
      active: true,
      categoryName: `${this.categoryName}`
    });
    this.elCategoryName.nativeElement.value = this.categoryName;
  }

  resetProductForm() {
    this.productForm.reset({
      name: '',
      description: '',
      imageFile: '',
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

  getCategoryName(id) {
    for (let category of this.categories) {
      if (category.id == id) {
        return category.name;
      }
    }
  }

  getFileFromForm() {
    return (<HTMLInputElement>document.getElementById('productImageFile')).files[0];
  }

  getFileInFormDataFormat(img) {
    let formData:FormData = new FormData();
    formData.append('file', img);
    return formData;
  }

  uploadDataPOST() {
    this.fileService.uploadFile(this.getFileInFormDataFormat(this.getFileFromForm())).subscribe(data => {
        this.fileUrl = `${API_URL}/File/${data['fileName']}`;
      },
      error => console.log(error.status),
      () => this.sendFormPOST());
  }

  uploadDataPUT() {
    console.log(this.productForm.value.imageFile);
    if(this.productForm.value.imageFile) {
      let file = this.getFileInFormDataFormat(this.getFileFromForm());
      this.fileService.uploadFile(file).subscribe(data => {
          this.fileUrl = `${API_URL}/File/${data['fileName']}`;
        },
        error => console.log(error.status),
        () => this.sendFormPUT());

    } else {
      this.fileUrl = this.product.image;
      this.sendFormPUT();
    }
  }

  sendFormPUT() {
    this.goodsService.editGoods(this.loadGoodObjectPUT())
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

  sendFormPOST() {
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
      "name": `${this.productForm.value.name}`,
      "description": `${this.productForm.value.description}`,
      "image": this.fileUrl,
      "price": this.productForm.value.price,
      "size": `${this.productForm.value.size.toUpperCase()}`,
      "active": true,
      "categoryId":  this.getCategoryId(this.elCategoryName.nativeElement.value)
    }
  }

  loadGoodObjectPUT() {
    return {
      "id": this.product.id,
      "name": `${this.productForm.value.name}`,
      "description": `${this.productForm.value.description}`,
      "image": this.fileUrl,
      "price": this.productForm.value.price,
      "size": `${this.productForm.value.size.toUpperCase()}`,
      "active": true,
      "categoryId":  this.getCategoryId(this.elCategoryName.nativeElement.value)
    }
  }

  imageChange() {
    let tempimg = this.getFileInFormDataFormat(this.getFileFromForm());
    this.fileService.uploadFile(tempimg).subscribe(data => {
      this.imgPreview = `${API_URL}/File/${data['fileName']}`;
    })
  }


}
