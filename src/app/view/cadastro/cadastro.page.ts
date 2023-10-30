import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Itens } from 'src/app/model/entities/itens/Itens';
import { ItensService } from 'src/app/model/service/itens.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public nome! : string;
  public ano! : number;
  public montadora! : string;
  public tipocarro! : number;
  public tracao! : number;
  public firebase: any;
  public imagem: any;
  
  constructor(private alertController: AlertController,
    private router : Router, private ItensService : ItensService){
      
    }
  
  ngOnInit() {

  }

  uploadFile(imagem: any){
    this.imagem = imagem.files;
  }

  cadastro(){
    if (this.nome && this.ano) {
      let create: Itens = new Itens(this.nome, this.ano);
      create.montadora = this.montadora;
      create.tipocarro = this.tipocarro;
      create.tracao = this.tracao;
      if(this.imagem){
        this.firebase.uploadImage(this.imagem, create)
        ?.then(()=>{
          this.router.navigate(["/home"]);
        })
      }else {
        this.firebase.cadastrar(create).then(() => this.router.navigate(["/home"])).catch((error) =>{
        console.log(error);
        this.presentAlert("Erro", "Erro ao salvar contato!");
        })
      }   
      this.firebase.cadastrar(create);
      this.router.navigate(['/home']);
    } else {
      this.presentAlert('ERRO!', 'Nome e ano são obrigatórios!');
    }
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Lista de Carros',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
