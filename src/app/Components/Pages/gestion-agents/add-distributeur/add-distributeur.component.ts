import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services-v2/admin-plateforme/admin.service';
import { DistributeurService } from 'src/app/services-v2/distributeur/distributeur.service';
import { AgentServiceService } from 'src/app/services/agent/agent-service.service';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';
import { SuperAgentService } from 'src/app/services/superAgent/super-agent.service';

@Component({
  selector: 'app-add-distributeur',
  templateUrl: './add-distributeur.component.html',
  styleUrls: ['./add-distributeur.component.css']
})
export class AddDistributeurComponent implements OnInit {
  merchants: any[] = [];
  myForm!: FormGroup;
  myForm1!: FormGroup;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;
  isCniSelected = true;
  file = "cni";

  cnirecto: any = null;
  cniverso: any = null;
  passport: any = null;
  photo: any = null;
  filetest: any = null;
  now: Date = new Date();

  // variable de requete
  request!: Subscription;

  // loader pour l'execution des requetes
  isProgressHidden = true;

  // variable pour griser le bouton de connexion
  isLoading = false;
  connexion_class = 'primary-light-button';

  // texte de retour ou d'annulation de requete
  textRetourConnexion = "Valider";

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _snackBar: MatSnackBar,
    public agentservice: AgentServiceService,
    private globalService: GloabalServiceService,
    private _userService: AdminService,
    private _distributeurService: DistributeurService
  ) { }

  onHangeFIle(event: any) {
    console.log(event);

  }

  formatDate(date: Date): string {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  /**
   * Annuler la requete d'ajout
   */
  cancel_request() {
    if (this.isLoading) {
      this.request.unsubscribe();
      this.isLoading = false;
      this.connexion_class = 'primary-light-button';

      // le texte retour devient "Valider"
      this.textRetourConnexion = "Valider";

      // on masque la barre de progression
      this.isProgressHidden = true;
    }
  }

  /**
   * recuperer la liste des distributeurs
   */
  getDistributeur() {
    try {
      this._distributeurService.getAll().subscribe(res => {
        this.merchants = res.data;
      }, (error) => {
        // log error
        console.log('--- ERREUR GET DISTRIBUTEURS ---');
        console.log(error);
      });

    } catch (error) {
      // log error
      console.log('--- ERREUR GET DISTRIBUTEURS ---');
      console.log(error);
    }
  }
  onPhotoSelected(file: any): void {
    console.log('--- photo changed ---');

    this.photo = file;
  }

  onCniSelected(file: any): void {
    console.log('--- cni recto changed ---');
    this.cnirecto = file;
  }

  onCniSelectedVerso(file: any): void {
    console.log('--- cni verso changed ---');
    this.cniverso = file;
  }

  onPassportSelected(file: any): void {
    console.log('--- passport changed ---');
    this.passport = file;
  }


  /**
   * Ajouter un distributeur
   */
  add_distributeur() {

    if (this.myForm.valid && this.myForm1.valid) {

      // on grise le bouton de connexion
      this.isLoading = true;
      this.connexion_class = '';

      // le texte retour devient "Annuler"
      this.textRetourConnexion = "Annuler";

      const formdata = new FormData();
      formdata.append("vMerchantName", this.myForm.value.nom + "");
      formdata.append("vEmail", this.myForm.value.email);
      formdata.append("vContactName", this.myForm1.value.contactName);
      formdata.append("vPhone", this.myForm.value.phone);
      formdata.append("vCNI", this.myForm.value.cni);
      formdata.append("vSegment", "2");
      formdata.append("vPaymentMethod", "CreditCard");
      formdata.append("vPaymentAc", "AccountXYZ");
      formdata.append("vMarketer", this._userService.getLocalUser().data.Company);
      formdata.append("vSuperMerchant", `${this.myForm1.value.superMerchant}`);
      formdata.append("vCreatedBy", this._userService.getLocalUser().data.UserName);
      formdata.append("vImei", this.myForm.value.imei);
      formdata.append("vCaution", "10");
      formdata.append("vContribuable", this.myForm1.value.contribuable);
      formdata.append("vEmergencyContact", this.myForm1.value.phoneContact);
      formdata.append("vEmergencyCni", this.myForm1.value.cniContact);
      formdata.append("vIsDistributor", "1");
      formdata.append("pass", this.myForm1.value.pass);
      formdata.append("isKyc", "true");
      formdata.append("p_identiteNo", this.myForm1.value.numeroidentite);
      formdata.append("p_NUI", this.myForm1.value.niu);
      formdata.append("p_Profession", this.myForm1.value.profession);
      formdata.append("p_cniNo", this.myForm.value.cni);
      formdata.append("p_RegistreCom", this.myForm.value.registrecommerce);
      formdata.append("p_Datenaissance", this.formatDate(this.myForm.value.datenaissance));
      formdata.append("p_CNIContact", this.myForm1.value.cniContact);
      formdata.append("p_phoneContact", this.myForm1.value.phoneContact);
      formdata.append("p_nomContact", this.myForm1.value.contactName);

      if (this.cnirecto != null && this.cniverso != null) {
        formdata.append("p_cniRecto", this.cnirecto.files[0], this.cnirecto.name);
        formdata.append("p_cniVerso", this.cniverso.files[0], this.cniverso.name);
      }

      if (this.passport != null) {
        formdata.append("p_passport", this.passport.files[0], this.passport.name);
      }

      if (this.photo != null) {
        formdata.append("p_photo", this.photo.files[0], this.photo.name);
      }

      // // on recupere les donnee du formulaire
      // Log pour vérifier les valeurs
      formdata.forEach((value, key) => {
        console.log(key + ':', value);
      });

      // on active la barre de progression
      this.isProgressHidden = false;

      try {
        // on envoi la requete
        this.request = this._distributeurService.create(formdata).subscribe(res => {

          // le texte retour devient "Valider"
          this.textRetourConnexion = "Valider";

          this.isLoading = false;
          this.connexion_class = 'primary-light-button';

          // on masque la barre de progression
          this.isProgressHidden = true;

          // on affiche la reponse
          console.log(res);

          // on affiche une notification
          let snackbar = this._snackBar.open("Opération effectuée avec succès.", "Ok");
          snackbar.onAction().subscribe(s => {
            snackbar.dismiss();
          })

          // et on retourne a la page de liste
          this._router.navigateByUrl("/home/gestion-agents/distributeurs/liste");

        }, ((err) => {
          this.isLoading = false;
          this.connexion_class = 'primary-light-button';

          // le texte retour devient "Valider"
          this.textRetourConnexion = "Valider";

          // on affiche les erreurs dans la console
          console.log(err.error.errors);

          // on masque la barre de progression
          this.isProgressHidden = true;

          // on annule la requete
          this.request.unsubscribe();

          // et on affiche un message d'alerte
          let snackbar = this._snackBar.open("Une erreur es survenue.", "Ok");
          snackbar.onAction().subscribe(s => {
            snackbar.dismiss();
          })

        }))

      } catch (error) {
        this.isLoading = false;
        this.connexion_class = 'primary-light-button';

        // stop loading
        this.isProgressHidden = true;

        // le texte retour devient "Valider"
        this.textRetourConnexion = "Valider";

        // si une erreur survient
        // on affiche un message d'alerte
        let snackbar = this._snackBar.open("Une erreur est survenue.", "Ok");
        snackbar.onAction().subscribe(s => {
          snackbar.dismiss();
        })
      }
    }
  }



  ngOnInit(): void {
    this.myForm = new FormGroup({
      nom: new FormControl('', Validators.required),


      phone: new FormControl('', Validators.required),
      cni: new FormControl('', Validators.required),
      datenaissance: new FormControl('', Validators.required),

      imei: new FormControl('', Validators.required),
      // region: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),

    });

    this.myForm1 = new FormGroup({

      contactName: new FormControl('', Validators.required),
      superMerchant: new FormControl('', Validators.required),
      contribuable: new FormControl('', Validators.required),
      registrecommerce: new FormControl('', Validators.required),
      profession: new FormControl('', Validators.required),
      niu: new FormControl('', Validators.required),
      numeroidentite: new FormControl('', Validators.required),
      // OperateurMarketing: new FormControl('', Validators.required),
      phoneContact: new FormControl('', Validators.required),
      cniContact: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),
      file: new FormControl('cni', [Validators.required])
    });

    this.getDistributeur();

    // this.agentservice.Agents("Merchants").subscribe(merchants => {
    //   this.merchants = merchants.data;
    //   console.log(this.merchants);
    // });
  }


}
