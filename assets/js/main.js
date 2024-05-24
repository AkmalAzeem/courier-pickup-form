import JustValidate from "just-validate";

const formEl = document.getElementById("courier-request-form");

const validateForm = new JustValidate(formEl);

validateForm.addField(
  "#name",
  [
    {
      rule: "required",
    },
    {
      rule: "minLength",
      value: 3,
    },
    {
      rule: "maxLength",
      value: 20,
    },
  ],
  { 
    errorLabelCssClass: ["form-error"], 
}
);

validateForm.addField(
  "#mobile-no",
  [    
    {
      rule: "required",
    },
    {
      rule: "number",
    },
    {
      rule: "minNumber",
      value: 10,
    },
    {
      rule: "maxNumber",
      value: 10,
    },
  ],
  {
    errorLabelCssClass: ["form-error"],
  }
);


validateForm.addField(
  "#pickup-date",
  [    
    {
      rule: "required",
    },
    
  ],
  {
    errorLabelCssClass: ["form-error"],
  }
);

validateForm.addField(
  "#pickup-area",
  [    
    {
      rule: "required",
    },
    
  ],
  {
    errorLabelCssClass: ["form-error"],
  }
);
