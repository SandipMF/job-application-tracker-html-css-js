let applicationsDataArr = [];

function loadApplicationData() {
//   const data = [
//     {
//       id: crypto.randomUUID(),
//       company: "testCompany",
//       role: "testRole",
//       jobType: "Onsite",
//       location: "testLoc",
//       date: new Date().toISOString().split("T")[0],
//       status: "Applied",
//       note: "TestNote",
//     },
//   ];
//   localStorage.setItem("job_applications", JSON.stringify(data));
  const storedData = localStorage.getItem("job_applications");
  console.log("storedData: ", JSON.parse(storedData));
  return storedData ? JSON.parse(storedData) : [];
}

function renderApplicationListData() {
  const tbody = document.querySelector("#applicationList tbody");
  tbody.innerHTML = "";

  applicationsDataArr.forEach((data, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `<td>${data.company}</td>
    <td>${data.role}</td>
    <td>${data.jobType}</td>
    <td>${data.status}</td>
    <td>
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
    </td>
    `;

    tbody.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const createForm = document.getElementById("");
  const editForm = document.getElementById("");
  const applicationList = document.getElementById("");

  applicationsDataArr = loadApplicationData();
  console.log("applicationList ", applicationsDataArr);
  renderApplicationListData();

  createForm.addEventListener("submit",(event)=>{
    event.preventDefault()

    const company = document.getElementById("company")
    const role = document.getElementById("role")
    const jobType = document.getElementById("jobType")
    const location = document.getElementById("location")
    const date = document.getElementById("date")
    const status = document.getElementById("status")
    const note = document.getElementById("note")

    
  })
});
