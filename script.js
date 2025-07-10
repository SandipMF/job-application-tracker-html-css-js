let applicationsDataArr = [];

function toggleLocationDiv() {
  const locationDiv = document.getElementById("locationDiv");
  const selectedJobType = document.getElementById("jobType").value;
  const locationField = document.getElementById("location");

  if (selectedJobType === "Onsite") {
    locationDiv.style.display = "flex";
    locationField.required = true;
  } else {
    locationDiv.style.display = "none";
    locationField.required = false;
    document.getElementById("location").value = "";
  }
}

function toggleEditLocationDiv() {
  const locationDiv = document.getElementById("edit_locationDiv");
  const selectedJobType = document.getElementById("edit_jobType").value;
  const locationField = document.getElementById("edit_location");

  if (selectedJobType === "Onsite") {
    locationDiv.style.display = "flex";
    locationField.required = true;
  } else {
    locationDiv.style.display = "none";
    locationField.required = false;
    locationField.value = "";
  }
}

function loadApplicationData() {
  const storedData = localStorage.getItem("job_applications");
  console.log("storedData: ", JSON.parse(storedData));
  return storedData ? JSON.parse(storedData) : [];
}

function storeApplicationData() {
  localStorage.setItem("job_applications", JSON.stringify(applicationsDataArr));
}

function onClickDeleteBtn(index) {
  if (confirm("Are you sure, you want to delete this job application?")) {
    applicationsDataArr.splice(index, 1);

    renderApplicationListData();
    storeApplicationData();
  }
}

function onClickEditBtn(index) {
  const application = applicationsDataArr[index];
  const editFornDiv = document.getElementById("editFormDiv");
  editFornDiv.style.display = "flex";

  renderEditFormData(application, index);
}

function renderEditFormData(application, index) {
  const editForm = document.getElementById("editApplicationForm");

  document.getElementById("edit_company").value = application.company;
  document.getElementById("edit_role").value = application.role;
  document.getElementById("edit_jobType").value = application.jobType;
  if (application.jobType === "Onsite") {
    document.getElementById("edit_location").value = application.location;
  }
  toggleEditLocationDiv();

  document.getElementById("edit_date").value = application.date;
  document.getElementById("edit_status").value = application.status;
  document.getElementById("edit_note").value = application.note;

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const updatedApplication = {
      ...application,
      company: document.getElementById("edit_company").value.trim(),
      role: document.getElementById("edit_role").value.trim(),
      jobType: document.getElementById("edit_jobType").value,
      location:
        document.getElementById("edit_jobType").value !== "Onsite"
          ? ""
          : document.getElementById("edit_location").value.trim(),
      date: document.getElementById("edit_date").value,
      status: document.getElementById("edit_status").value,
      note: document.getElementById("edit_note").value.trim(),
    };

    applicationsDataArr[index] = updatedApplication;
    renderApplicationListData();
    storeApplicationData();

    editForm.reset();
    closeEditForm();
  });
}

function closeEditForm() {
  const editFormDiv = document.getElementById("editFormDiv");
  const editForm = document.getElementById("editApplicationForm");

  editFormDiv.style.display = "none";
  editForm.reset();
}

function renderApplicationListData() {
  const tbody = document.querySelector("#applicationListTable tbody");
  tbody.innerHTML = "";

  applicationsDataArr.forEach((data, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `<td>${data.company}</td>
    <td>${data.role}</td>
    <td>${data.jobType}</td>
    <td>${data.status}</td>
    <td>
        <button class="editBtn" onClick="onClickEditBtn(${index})">Edit</button>
        <button class="deleteBtn" onClick="onClickDeleteBtn(${index})">Delete</button>
    </td>
    `;

    tbody.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const createForm = document.getElementById("createApplicationForm");
  const editForm = document.getElementById("editApplicationForm");
  const applicationListTable = document.getElementById("applicationListTable");

  applicationsDataArr = loadApplicationData();
  console.log("applicationList ", applicationsDataArr);
  renderApplicationListData();

  toggleLocationDiv();
  document
    .getElementById("jobType")
    .addEventListener("change", toggleLocationDiv);

  document
    .getElementById("edit_jobType")
    .addEventListener("change", toggleEditLocationDiv);

  const dateInput = document.getElementById("date");
  if (!dateInput.value) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.value = today;
  }

  createForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newApplication = {
      id: crypto.randomUUID(),
      company: document.getElementById("company").value.trim(),
      role: document.getElementById("role").value.trim(),
      jobType: document.getElementById("jobType").value,
      location:
        document.getElementById("jobType").value !== "Onsite"
          ? ""
          : document.getElementById("location").value.trim(),
      date: document.getElementById("date").value,
      status: document.getElementById("status").value,
      note: document.getElementById("note").value.trim(),
    };

    applicationsDataArr.push(newApplication);
    renderApplicationListData();
    storeApplicationData();

    createForm.reset();
  });
});
