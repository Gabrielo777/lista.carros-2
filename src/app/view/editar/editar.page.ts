import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Itens } from 'src/app/model/entities/itens/Itens';
import { ItensService } from 'src/app/model/service/itens.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  ItemService: any;
excluir() {
throw new Error('Method not implemented.');
}
editar() {
throw new Error('Method not implemented.');
}
uploadFile(arg0: EventTarget|null) {
throw new Error('Method not implemented.');
}
  indice! : number;
  nome! : string;
  ano! : number;
  montadora! : string;
  tipocarro! : number;
  imagem! : any;
  tracao! : number;
  item! : Itens;
  edicao: boolean = true;
  firebase: any;
  carro!: Itens;

  constructor(private actRoute: ActivatedRoute, 
    private firebase : ItensService, 
    private router : Router, 
    private alertController: AlertController) {

  }

  ngOnInit() {
    this.item = this.ItemService.obterPorIndice(this.indice);
    this.nome = this.item?.nome;
    this.ano = this.item.ano;
    this.montadora = this.item.montadora;
    this.tipocarro = this.item.tipocarro;
    this.tracao = this.item.tracao;
  }

  habilitar(){
    if (this.edicao){
      this.edicao = false;
    }else {
      this.edicao = true;
  }

  this.uploadFile(Imagem: any){
    this.imagem = this.imagem.files;
  }

  editar(){
    if (this.nome && this.ano){
      let create: Itens = new Itens(this.nome, this.ano);
      create.montadora = this.montadora;
      create.tipocarro = this.tipocarro;
      create.tracao = this.tracao;
      create.id = this.carro.id;

      if(this.imagem){
        this.firebase.uploadImage(this.imagem, create)
        ?.then(()=>{this.router.navigate(["/home"]);})
      }else{
        create.downloadURL = this.carro.downloadURL;
        this.firebase
          .editar(create, this.carro.id)
          .then(() => {
            this.router.navigate(['/home']);
          })
          .catch((error) => {
            console.log(error);
            this.presentAlert('ERRO', 'Erro ao editar o carro!');
          })
      }
    } else {
      this.presentAlert('ERRO', 'Nome e ano são  obrigatórios!');
    }
  }

  excluir(){
    this.presentConfirmAlert("ATENÇÃO", "Deseja realmente excluir o carro?");
  }

  excluirJogo(){
    this.firebase
      .excluir(this.carro.id)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.log(error);
        this.presentAlert('ERRO', 'Erro ao excluir carro!');
      });
  }

  async presentAlert(subHeader: string, onmessage: string) {
    const alert = await this.alertController.create({
      header: 'Lista de Carros',
      subHeader: subHeader,
      message: onmessage,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentConfirmAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Lista de Carros',
      subHeader: subHeader,
      message: message,
      buttons: [
        {text: 'Cancelar', role: 'cancelar', handler: ()=>{console.log("cancelou")}},
        {text: 'Confirmar', role: 'confirmar', handler: (acao)=>{this.excluirCarro()}},
      ],
    });
    await alert.present();
  }

}
  presentConfirmAlert(arg0: string, arg1: string) {
    throw new Error('Method not implemented.');
  }
  presentAlert(arg0: string, arg1: string) {
    throw new Error('Method not implemented.');
  }


  function excluirJogo() {
    throw new Error('Function not implemented.');
  }
   