import JustValidate from "just-validate";

const formEl = document.getElementById("courier-request-form");

const localStorageKey = "courierData";

const validateForm = new JustValidate(formEl, {
  validateBeforeSubmitting: true,
});

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
  "#mobile",
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
  const formData = new FormData(formEl);

  const formValueObj = Object.fromEntries(formData.entries());

  const newCourierData = [];

  const existingCourierData = localStorage.getItem("courierData");

  const existingCourierArray = JSON.parse(existingCourierData);

  if (existingCourierData) {
    existingCourierArray.push(formValueObj);

    localStorage.setItem(localStorageKey, JSON.stringify(existingCourierArray));
  } else {
    newCourierData.push(formValueObj);

    localStorage.setItem(localStorageKey, JSON.stringify(newCourierData));
  }

  alert("Courier Request submitted successfully");
  formEl.reset();
});

function getAllCourierDatas() {
  const courierData = localStorage.getItem(localStorageKey);

  const courierDataArr = JSON.parse(courierData);

  if (courierDataArr) {

  const tableEl = document.querySelector("#courierDataTable");

   const finalData = courierDataArr.map((courierData) => {
    return `
        <tr>
            <td class="px-2 py-1 border">${courierData.name}</td>
            <td class="px-2 py-1 border">${courierData.mobile}</td>
            <td class="px-2 py-1 border">${courierData['pickup-date']}</td>
            <td class="px-2 py-1 border">${courierData['pickup-area']}</td>
            <td class="px-2 py-1 border">
                <button
                    type="button"
                    class="px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm"
                >
                    Delete
                </button>
                </td>
        </tr>
        `;

  }).join(" ");

  tableEl.innerHTML += finalData

  }
  console.log("No value available on LocalStorage")
}
getAllCourierDatas();
