import { Customer } from "./../../../../../core/models/customer";
import { SmsService } from "./../../../service/sms.service";
import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { CustomerFormComponent } from "src/app/features/customer/shared/customer-form/customer-form.component";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.scss"],
})
export class MessageComponent implements OnInit {
  /* props */
  messageForm: FormGroup;
  loading = false;

  messageType: string = "default";
  clientList: Customer[] = [];
  constructor(
    private fb: FormBuilder,
    private smsService: SmsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    public datepipe: DatePipe,
    public dialogRef: MatDialogRef<CustomerFormComponent>,
    @Inject(MAT_DIALOG_DATA) private modalData: any
  ) {}

  ngOnInit(): void {
    this.modalData.clientList
    this.buildMessageForm();
  }

  buildMessageForm() {
    this.messageForm = this.fb.group({
      message: [],
      clientList: [this.modalData.clientList],
    });
  }
  onSave() {
    this.dialogRef.close(this.messageForm.value);
  }
  onCancel() {
    this.dialogRef.close("cancel");
  }

  toggleMessageType(messageType) {
    /* toggle garne bitikai field lai rest gardiney */
    this.messageType = messageType === "default" ? "mannual" : "default";
  }
}
