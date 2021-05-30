import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Room } from 'src/app/models/room';
import { SharedClaim } from 'src/app/models/sharedClaim';
import { User } from 'src/app/models/user';
import { ClaimService } from 'src/app/services/claim.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-arrange-claims-for-user-form-modal',
  templateUrl: './arrange-claims-for-user-form-modal.component.html',
  styleUrls: ['./arrange-claims-for-user-form-modal.component.css'],
})
export class ArrangeClaimsForUserFormModalComponent implements OnInit {
  @Input() currentRoom: Room;
  currentClaim: any;
  currentUser:User;
  clicked = false;
  claimForm: FormGroup;
  claims:any[]=[]
  dataLoaded=false;

  constructor(
    private claimService: ClaimService,
    private toastrService: ToastrService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private userService:UserService
  ) {}

  async ngOnInit() {
    this.createClaimForm()
    await this.getUserClaims();
    this.getCurrentUser();
    this.getClaims();
  }
  createClaimForm() {
    this.claimForm = this.formBuilder.group({
      claimId: ["", Validators.required],
    });
  }
  addClaim() {
    if (this.claimForm.valid) {
      this.clicked=true;
      var claim = Object.assign({},this.claimForm.value,{
        userId:this.currentUser.id,
        roomId:this.currentRoom.id
      })
      this.claimService.addClaimToUser(claim).subscribe(response=>{
        this.toastrService.success(response.message)
        this.currentClaim=claim;
      })
    } else {
      this.toastrService.error('Hatalı yada eksik bilgi girdiniz!');
      this.clicked=false;
    }
  }
  updateClaim(){
    if(this.claimForm.valid){
      this.clicked=true;
      var claim = Object.assign({},this.claimForm.value,{
        id:this.currentClaim.id,
        userId:this.currentUser.id,
        roomId:this.currentRoom.id
      })
      this.claimService.updateClaimToUser(claim).subscribe(response=>{
        this.toastrService.success(response.message)
        this.activeModal.dismiss()
      },errorResponse=>{
        this.toastrService.error(errorResponse)
        this.clicked=false;
      })
    }else{
      this.toastrService.error("Eksik yada hatalı bilgi girdiniz!")
    }
  }
  deleteClaim(){
    this.clicked=true;
    var claim = Object.assign({},this.claimForm.value,{
      claimId:this.currentClaim.id,
      userId:this.currentUser.id,
      roomId:this.currentRoom.id
    })
    this.claimService.deleteClaimFromUser(claim).subscribe(response=>{
      this.toastrService.info(response.message)
      this.activeModal.dismiss()
    },errorResponse=>{
      this,this.toastrService.error(errorResponse)
      this.clicked=false;
    })
  }
  getCurrentUser(){
    this.userService.getCurrentUser().subscribe(response=>{
      this.currentUser=response.data
    })
  }
  getClaims(){
    this.claimService.getClaims(this.currentRoom.id).subscribe(response=>{
      response.data.forEach(c=>this.claims.push(c))
    });
    this.claimService.getSharedClaims().subscribe(response=>{
      response.data.forEach(c=>this.claims.push(c))
    })
  }
  async getUserClaims() {
    let claims = await this.claimService
      .getUserClaims(this.currentRoom.id)
      .toPromise();
    let sharedClaims = await this.claimService
      .getUserSharedClaims(this.currentRoom.id)
      .toPromise();
    if (claims.data.length > 0) {
      this.currentClaim = claims.data[0];
      this.dataLoaded=true;
    } else if (sharedClaims.data.length > 0) {
      this.currentClaim = sharedClaims.data[0];
      this.dataLoaded=true;
    }
  }
}
