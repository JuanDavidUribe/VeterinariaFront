import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditModalComponent } from './edit-modal/edit-modal.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  titulo = 'Administrador de productos'
  items: Array<Product> = [];

  constructor(private productService : ProductService, private modalService : NgbModal) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts () {
    this.productService.getProductList().subscribe(dato => {
      this.items = dato;
    });
  }

  delete(item: Product) {
    this.productService.deleteProduct(item).subscribe(dato =>{
      window.location.reload();
    });
  }
  edit(item: Product) {
    this.modalService.open(EditModalComponent);
  }
}
