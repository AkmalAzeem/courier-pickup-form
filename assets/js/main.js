import JustValidate from "just-validate";

const formEl = document.getElementById("courier-request-form");

const validateForm = new JustValidate(formEl, {
    validateBeforeSubmitting: true,
})

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
      rule: "minLength",
      value: 10,
    },
    {
      rule: "maxLength",
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


validateForm.onSuccess((e) => {

  const formData = new FormData(formEl)

  const formValueObj = Object.fromEntries(formData.entries())

  const newCourierData = []

  const existingCourierData = localStorage.getItem("courierData")

  const existingCourierArray = JSON.parse(existingCourierData)

  if (existingCourierData) { 
    existingCourierArray.push(formValueObj)

    localStorage.setItem("courierData", JSON.stringify(existingCourierArray))
  
  } 
  else {
    newCourierData.push(formValueObj)

    localStorage.setItem("courierData", JSON.stringify(newCourierData))

  }

  alert("Courier Request submitted successfully")
  formEl.reset() 


})