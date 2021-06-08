import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore : AngularFirestore) { }

  agregarprod(products : any): Promise<any>{

    return this.firestore.collection('products').add(products);
  }
  getProd(): Observable<any>{
    return this.firestore.collection('products',ref=>ref.orderBy('fechacreacion','asc')).stateChanges();
  }

  

eliminarproducto(id:string): Promise<any>{
  return this.firestore.collection('products').doc(id).delete();  
}


getproducto(id:string): Observable<any>{
  return this.firestore.collection('products').doc(id).snapshotChanges();
}

UpdateProd(id:string, data:any): Promise<any>{
  return this.firestore.collection('products').doc(id).update(data);

}

}
