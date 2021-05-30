import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Claim } from 'src/app/models/claim';
import { Room } from 'src/app/models/room';
import { ClaimService } from 'src/app/services/claim.service';
import { AddClaimFormModalComponent } from '../add-claim-form-modal/add-claim-form-modal.component';
import { UpdateClaimFormModalComponent } from '../update-claim-form-modal/update-claim-form-modal.component';

@Component({
  selector: 'app-arrange-claims-form-modal',
  templateUrl: './arrange-claims-form-modal.component.html',
  styleUrls: ['./arrange-claims-form-modal.component.css'],
})
export class ArrangeClaimsFormModalComponent implements OnInit {
  claims:Claim[]=[];
  currentClaim:Claim;
  @Input() currentRoom:Room;
  clicked=false;
  constructor(
    private claimService: ClaimService,
    private toastrService: ToastrService,
    public activeModal: NgbActiveModal,
    private modalService:NgbModal
  ) {}

  ngOnInit(): void {
    this.getClaims()
  }

  getClaims(){
    this.claimService.getClaims(this.currentRoom.id).subscribe(response=>{
      this.claims = response.data;
    })
  }
  getCurrentClaimClass(claim: Claim) {
    if (claim == this.currentClaim) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  setCurrentClaim(claim:Claim){
    this.currentClaim=claim;
  }
  openAddClaimFormModal(){
    const modalRef = this.modalService.open(AddClaimFormModalComponent)
    modalRef.componentInstance.currentRoom = this.currentRoom
  }
  openUpdateClaimFormModal(){
    if(this.currentClaim!=null){
      const modalRef= this.modalService.open(UpdateClaimFormModalComponent);
      modalRef.componentInstance.currentClaim = this.currentClaim;
    }else{
      this.toastrService.error("Önce bir yetki seçin!")
    }
  }
  deleteClaim(){
    if(this.currentClaim!=null){
      this.clicked=true;
      this.claimService.delete(this.currentClaim).subscribe(response=>{
        this.toastrService.info(response.message)
        this.activeModal.dismiss()
      })
    }else{
      this.clicked=false;
      this.toastrService.error("Önce bir yetki seçin!")
    }
  }

}
