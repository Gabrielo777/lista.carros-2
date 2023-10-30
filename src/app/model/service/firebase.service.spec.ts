import { Injectable } from '@angular/core';
import { Itens } from '../entities/itens/Itens';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH: string = "carros";
  constructor(private firestore : AngularFirestore) { }

  obterTodos() {
    return this.firestore.collection(this.PATH).snapshotChanges();
  }

  register(itens : Itens) {
    return this.firestore.collection(this.PATH).add({
      nome: itens.nome,
      lancamento: itens.ano,
      distribuidora: itens.montadora,
      genero: itens.tipocarro,
      tipo: itens.tracao
    });
  }

  editar(itens: Itens, id: string) {
    return this.firestore.collection(this.PATH).doc(id).update({
      nome: itens.nome,
      lancamento: itens.ano,
      distribuidora: itens.montadora,
      genero: itens.tipocarro,
      tipo: itens.tracao
    });
  }

  excluir(id: string) {
    return this.firestore.collection(this.PATH).doc(id).delete();
  }
}