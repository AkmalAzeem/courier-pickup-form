import JustValidate from "just-validate";
import { formatMyDate } from "./utils";
import { v4 as uuidv4 } from "uuid";

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
      errorMessage: "Name is required",
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


validateForm.addField(
  "#agreements",
  [
    {
      rule: "required",
      errorMessage: "You need to accept the terms and conditions"
    },
  ],
  {
    errorLabelCssClass: ["form-error"],
  }
);

validateForm.onSuccess((e) => {
  const formData = new FormData(formEl);

  formData.append("id", uuidv4());
  formData.append("createdAt", Date.now());

  const formValueObj = Object.fromEntries(formData.entries());

  const existingCourierData = localStorage.getItem("courierData");

  const existingCourierArray = JSON.parse(existingCourierData);

  const newCourierData = [];

  if (existingCourierData) {
    existingCourierArray.push(formValueObj);

    localStorage.setItem(localStorageKey, JSON.stringify(existingCourierArray));
  } else {
    newCourierData.push(formValueObj);

    localStorage.setItem(localStorageKey, JSON.stringify(newCourierData));
  }

  alert("Courier Request submitted successfully");
  getAllCourierDatas();
  formEl.reset();
});

function getAllCourierDatas() {
  const courierData = localStorage.getItem(localStorageKey);

  const courierDataArr = JSON.parse(courierData);

  const courierCardEl = document.querySelector("#courierCard");

  if (courierDataArr && courierDataArr.length > 0) {
    courierCardEl.classList.remove("hidden");
    const tableEl = document.querySelector("#courierDataTable");

    tableEl.innerHTML = "";

    const newFinalValue = [];

    courierDataArr.map((courierData, index) => {
      const trEl = document.createElement("tr");
      const tdCustomerNoEl = document.createElement("td");
      const tdEl = document.createElement("td");
      const td2El = document.createElement("td");
      const td3El = document.createElement("td");
      const td4El = document.createElement("td");
      const td5El = document.createElement("td");
      const deleteBtnEl = document.createElement("button");

      tdCustomerNoEl.classList.add("px-2", "py-1", "border");
      tdCustomerNoEl.textContent = index;

      tdEl.classList.add("px-2", "py-1", "border");
      tdEl.textContent = courierData.name;

      td2El.classList.add("px-2", "py-1", "border");
      td2El.textContent = courierData.mobile;

      td3El.classList.add("px-2", "py-1", "border");
      td3El.textContent = formatMyDate(courierData["pickup-date"]);

      td4El.classList.add("px-2", "py-1", "border");
      td4El.textContent = courierData["pickup-area"];

      deleteBtnEl.className =
        "px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-xs";
      deleteBtnEl.textContent = "Delete";

      deleteBtnEl.addEventListener("click", (e) => {
        deleteCourierRequest(courierData);
      });

      td5El.classList.add("px-2", "py-1", "border");
      td5El.append(deleteBtnEl);

      trEl.append(tdCustomerNoEl, tdEl, td2El, td3El, td4El, td5El);

      newFinalValue.push(trEl);
    });

    newFinalValue.forEach((el) => tableEl.append(el));

    const courierCountEl = document.querySelector("#courierCount");
    courierCountEl.textContent = newFinalValue.length;
  } else {
    courierCardEl.classList.add("hidden");

    console.log("No value available on LocalStorage");
  }
}

function deleteCourierRequest(courierRequest) {
  const confirmation = confirm(
    `Do you want to delete '${courierRequest["name"]}' record? `
  );

  if (confirmation) {
    const existingCourierData = localStorage.getItem(localStorageKey);
    const courierDataObj = JSON.parse(existingCourierData);

    const otherRecords = courierDataObj.filter(
      (courierReq) => courierReq.id != courierRequest["id"]
    );

    localStorage.setItem(localStorageKey, JSON.stringify(otherRecords));

    getAllCourierDatas();
  }
}

getAllCourierDatas();
