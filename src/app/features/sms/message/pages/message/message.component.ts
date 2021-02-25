import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
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
  constructor(
    private fb: FormBuilder,
    public datepipe: DatePipe,
    public dialogRef: MatDialogRef<CustomerFormComponent>,
    @Inject(MAT_DIALOG_DATA) private modalData: any
  ) {}

  ngOnInit(): void {
    this.modalData.clientList;
    this.buildMessageForm();
  }

  buildMessageForm() {
    this.messageForm = this.fb.group({
      message: ["", Validators.required],
      clientList: [this.modalData.clientList],
    });
  }
  onSave() {
    console.log("msg " + JSON.stringify(this.messageForm.value));
    this.messageForm.valid
      ? this.dialogRef.close(this.messageForm.value)
      : this.dialogRef.close("Message not selected.");
  }
  onCancel() {
    this.dialogRef.close("cancel");
  }

  toggleMessageType(messageType) {
    /* toggle garne bitikai field lai rest gardiney */
    this.messageType = messageType === "default" ? "mannual" : "default";
  }
}
