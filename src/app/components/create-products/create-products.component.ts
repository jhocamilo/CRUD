import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.css']
})
export class CreateProductsComponent implements OnInit {

  createproducts: FormGroup;
  loading = false;
  submitted = false;
  id: string | null; //para el upgrade
  tittle= 'Agregar producto';

  constructor(private fb: FormBuilder ,
              private _productsService : ProductService,
              private router: Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) {

    this.createproducts = this.fb.group({
      cod:['', Validators.required],
      nombre:['', Validators.required],
      descripcion:['', Validators.required],
      precio:['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);

   }

  ngOnInit(): void {
    this.editarprod();
  }


  aggeditProducts(){

    this.submitted=true;

    if(this.createproducts.invalid){
      return;
    }
    if(this.id==null){
      this.aggProducts();
    }else{
      this.editarProducto(this.id);
    }
  }

  editarProducto(id:string){
    const producto : any ={
      cod : this.createproducts.value.cod,
      nombre : this.createproducts.value.nombre,
      descripcion : this.createproducts.value.descripcion,
      precio : this.createproducts.value.precio,
      fechaactualizacion: new Date()

    }
    this.loading = true;
    this._productsService.UpdateProd(id, producto).then(()=>{
      this.loading=false;
      this.toastr.info("El producto ha sido modificado exitosamente!")
      
    }
    )
    this.router.navigate(['/list-products']);
  }

  aggProducts(){
    

    const producto : any ={
      cod : this.createproducts.value.cod,
      nombre : this.createproducts.value.nombre,
      descripcion : this.createproducts.value.descripcion,
      precio : this.createproducts.value.precio,
      fechacreacion: new Date(),
      fechaactualizacion: new Date()

    }
    this.loading = true;
    this._productsService.agregarprod(producto).then(()=>{
      this.toastr.success('Registro exitoso!');
      console.log('Registro exitoso');
      this.router.navigate(['/list-products'])
    }).catch(error=>{
      console.log(error);
      this.loading=false;
      
    })
  }


  editarprod(){
    this.tittle='Editar producto'
    if(this.id !== null)
    this._productsService.getproducto(this.id).subscribe(data=>{
      console.log(data.payload.data()['']);
      this.createproducts.setValue({
        cod: data.payload.data()['cod'],
        nombre: data.payload.data()['nombre'],
        descripcion: data.payload.data()['descripcion'],
        precio: data.payload.data()['precio'],
      })
    })
  }
}
