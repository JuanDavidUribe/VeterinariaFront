import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  titulo = 'Add New Product';

  product : Product = {
    id : null,
    tittle : '',
    description : '',
    img : '',
    price : 0
  }


  constructor(private productService : ProductService, private router : Router) { }

  ngOnInit(): void {
  }

  saveProduct () {
    this.productService.Addproduct(this.product).subscribe(dato => {
      this.goHome();
    })
  }

  goHome () {
    this.router.navigate(['../products']);
  }

  onSubmit() {
    this.saveProduct();
  }
}
