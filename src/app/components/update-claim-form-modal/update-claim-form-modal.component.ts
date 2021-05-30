import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Claim } from 'src/app/models/claim';
import { ClaimService } from 'src/app/services/claim.service';

@Component({
  selector: 'app-update-claim-form-modal',
  templateUrl: './update-claim-form-modal.component.html',
  styleUrls: ['./update-claim-form-modal.component.css']
})
export class UpdateClaimFormModalComponent implements OnInit {

  @Input() currentClaim: Claim;
  claimForm : FormGroup;
  clicked = false;
  roomClaim:boolean =false;
  transactionClaim:boolean = false;
  categoryClaim:boolean = false;
  claimClaim:boolean = false;
  claimProperties:string[] = [];

  constructor(
    private claimService: ClaimService,
    private toastrService: ToastrService,
    public activeModal: NgbActiveModal,
    private formBuilder:FormBuilder
  ) {}

  ngOnInit(): void {
    this.checkClaimProperties()
    this.createClaimForm()
    console.log(this.currentClaim)
  }

  updateClaim(){
    if(this.claimForm.valid){
      this.clicked=true;
      this.addClaimProperties();
      var claim = Object.assign({},this.claimForm.value,{
        id:this.currentClaim.id,
        roomId:this.currentClaim.roomId,
        claimProperties:this.claimProperties
      })
      this.claimService.update(claim).subscribe(response=>{
        this.toastrService.success(response.message)
        this.activeModal.dismiss()
      },errorResponse=>{
        this.clicked=false;
        this.toastrService.error(errorResponse)
      })
    }else{
      this.toastrService.error("Eksik yada hatalı bilgi girdiniz!")
    }
  }
  createClaimForm(){
    this.claimForm = this.formBuilder.group({
      name:[this.currentClaim.name,[Validators.required,Validators.maxLength(15)]]
    })
  }
  checkClaimProperties(){
    if(this.currentClaim.claimProperties.includes("room")){
      this.roomClaim=true;
    }
    if(this.currentClaim.claimProperties.includes("transaction")){
      this.transactionClaim=true;
    }
    if(this.currentClaim.claimProperties.includes("claim")){
      this.claimClaim=true;
    }
    if(this.currentClaim.claimProperties.includes("category")){
      this.categoryClaim=true;
    }
  }
  addClaimProperties(){
    if(this.roomClaim){
      this.claimProperties.push("room")
    }else{
      this.claimProperties.slice(this.claimProperties.indexOf("room"),1)
    }
    if(this.transactionClaim){
      this.claimProperties.push("transaction")
    }else{
      this.claimProperties.slice(this.claimProperties.indexOf("transaction"),1)
    }
    if(this.categoryClaim){
      this.claimProperties.push("category")
    }else{
      this.claimProperties.slice(this.claimProperties.indexOf("category"),1)
    }
    if(this.claimClaim){
      this.claimProperties.push("claim")
    }else{
      this.claimProperties.slice(this.claimProperties.indexOf("claim"),1)
    }
  }
  checkRoomClaim(event:any){
    this.roomClaim=event.target.checked;
  }
  checkTransactionClaim(event:any){
    this.transactionClaim=event.target.checked;
  }
  checkCategoryClaim(event:any){
    this.categoryClaim=event.target.checked;
  }
  checkClaimClaim(event:any){
    this.claimClaim=event.target.checked;
  }

}
