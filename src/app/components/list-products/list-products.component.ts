import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  producta: any[] = [];

  constructor(private _productsService: ProductService,
              private toastr: ToastrService){

              }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this._productsService.getProd().subscribe(data => {
      this.producta = [];
      data.forEach((element: any) => {
        this.producta.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.producta);
    })
  }

  eliminarproducto(id: string) {
    this._productsService.eliminarproducto(id).then(() => {
      console.log('Eliminadotest');
      this.toastr.error('El producto ha sido eliminado con exito')
    }).catch(error => {
      console.log(error);
      this.toastr.error('El producto ha sido eliminado con exito');
    })
  }





}
