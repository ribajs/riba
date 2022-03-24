import { Component, TemplateFunction } from "@ribajs/core";

import type { MemberSignaturesComponentScope } from "../../types/index.js";

export class MemberSignaturesComponent extends Component {
  public static tagName = "tsd-member-signatures";

  static get observedAttributes() {
    return [];
  }

  public scope: MemberSignaturesComponentScope = {
    signatureEls: [],
    descriptionEls: [],
    showDescByIndex: this.showDescByIndex,
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(MemberSignaturesComponent.observedAttributes);
  }

  protected async afterBind() {
    await super.afterBind();
    this.initMemberSignatures();
  }

  public showDescByIndex(index: number) {
    for (const [i, signatureEl] of this.scope.signatureEls.entries()) {
      if (i === index) {
        signatureEl.classList.add("current");
      } else {
        signatureEl.classList.remove("current");
      }
    }

    for (const [i, descriptionEl] of this.scope.descriptionEls.entries()) {
      if (i === index) {
        descriptionEl.classList.add("current");
      } else {
        descriptionEl.classList.remove("current");
      }
    }
  }

  initMemberSignatures() {
    this.scope.signaturesEl?.classList.add("active");
    this.scope.descriptionsEl?.classList.add("active");

    this.scope.signatureEls = Array.from(
      this.querySelectorAll<HTMLLIElement>(
        "tsd-member-signatures > .tsd-signatures > .tsd-signature"
      ) || []
    );
    this.scope.descriptionEls = Array.from(
      this.querySelectorAll<HTMLLIElement>(
        "tsd-member-signatures > .tsd-descriptions > .tsd-description"
      ) || []
    );

    this.showDescByIndex(0);
  }

  protected template(): ReturnType<TemplateFunction> {
    return null;
  }
}
