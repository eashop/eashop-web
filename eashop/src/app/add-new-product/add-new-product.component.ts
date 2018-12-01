import {Component, OnInit, ViewChild} from '@angular/core';
import {GoodsService} from "../api/services/goodsService";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from "../api/models/category";
import {CategoryService} from "../api/services/categoryService";

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
    'image': '',
    'price': '',
    'size': ''
  };
  validationMessages = {
    'name': {
      'required': 'Product Name is required.',
      'minlength': 'Product Name must be at least 2 characters long.',
      'maxlength': 'Product name cannot be more than 50 characters long.'
    },
    'description': {
      'required': 'Description of product is required.'
    },
    'image': {
      'required': 'Image of product is required.',
      'maxlength': 'Image url cannot be more than 255 characters long.'
    },
    'price': {
      'required': 'Price of product is required.',
      'min': 'Price cannot be less than zero'
    },
    'size': {
      'required': 'Size of product is required.',
      'maxlength': 'Size cannot be more than 10 characters long.'
    }
  };

  constructor(
    private  categoryService: CategoryService,
    private goodsService: GoodsService,
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
      image: ['', [Validators.required, Validators.maxLength(255)]],
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
    let product = this.productForm.value;
    product.categoryId = this.getCategoryId(this.productForm.value.categoryId);
    product.size = product.size.toUpperCase();
    this.goodsService.createGoods(product)
      .then((product) => {
        console.log("New Product: " + product);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
    this.productFormDirective.resetForm();
    this.resetProductForm();
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
