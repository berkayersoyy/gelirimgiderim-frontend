import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Room } from 'src/app/models/room';
import { ClaimService } from 'src/app/services/claim.service';

@Component({
  selector: 'app-add-claim-form-modal',
  templateUrl: './add-claim-form-modal.component.html',
  styleUrls: ['./add-claim-form-modal.component.css'],
})
export class AddClaimFormModalComponent implements OnInit {
  @Input() currentRoom: Room;
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
    this.createClaimForm()
  }

  addClaim(){
    if(this.claimForm.valid){
      if(this.roomClaim){
        this.claimProperties.push("room")
      }
      if(this.transactionClaim){
        this.claimProperties.push("transaction")
      }
      if(this.categoryClaim){
        this.claimProperties.push("category")
      }
      if(this.claimClaim){
        this.claimProperties.push("claim")
      }
      var claim = Object.assign({},this.claimForm.value,{
        roomId:this.currentRoom.id,
        claimProperties:this.claimProperties
      })
      this.claimService.add(claim).subscribe(response=>{
        this.toastrService.success(response.message)
        this.activeModal.dismiss()
      },errorResponse=>{
        this.toastrService.error(errorResponse)
      })
    }else{
      this.toastrService.error("Eksik yada hatalı bilgi girdiniz!")
    }
  }
  createClaimForm(){
    this.claimForm = this.formBuilder.group({
      name:["",[Validators.required,Validators.maxLength(15)]]
    })
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
