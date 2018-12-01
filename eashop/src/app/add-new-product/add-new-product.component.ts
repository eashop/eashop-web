import {Component, OnInit, ViewChild} from '@angular/core';
import {GoodsService} from "../api/services/goodsService";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {

  productForm: FormGroup;
  @ViewChild('productFormDirective') productFormDirective;
  productFormErrors = {
    'name': '',
    'description': '',
    'size': ''
  };
  validationMessages = {
    'name': {
      'required': 'Product Name is required.',
      'minlength': 'Product Name must be at least 2 characters long.'
    },
    'description': {
      'required': 'Description of product is required.'
    },
    'size': {
      'required': 'Size of product is required.'
    }
  };

  constructor(
    private goodsService: GoodsService,
    private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {

  }

  createForm() {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', Validators.required],
      image: ['', Validators.required],
      price: 0,
      size: ['', Validators.required],
      active: false,
      categoryId: 1
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
    this.goodsService.createGoods(this.productForm.value)
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
      categoryId: 1
    });
  }

}
