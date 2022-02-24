import { MemberSignaturesComponent } from "../components/member-signatures/member-signatures.component";

export interface MemberSignaturesComponentScope {
  signaturesEl?: HTMLUListElement;
  descriptionsEl?: HTMLUListElement;
  signatureEls: HTMLLIElement[];
  descriptionEls: HTMLLIElement[];
  showDescByIndex: MemberSignaturesComponent["showDescByIndex"];
}
