import { jobs } from "./data.js";

let currentTab = "all";


function renderJobs(list) {
  const container = document.getElementById("job-container");
  container.innerHTML = "";

  document.getElementById("job-count").innerText = list.length;


  if (list.length === 0) {
    container.innerHTML = `
      <div class="text-center py-10 col-span-full">
    <img class="mx-auto" src="/assats/jobs.png" alt="Jobs">
        
        <h2 class="font-bold text-lg">No jobs Available</h2>
        <h4 class="font-bold text-lg">Check back soon for new job opportunities</h4>
        
      </div>
    `;
    return;
  }

  list.forEach(job => {
    const div = document.createElement("div");

    div.innerHTML = `
      <div class="bg-white p-4 rounded shadow flex justify-between items-center">

        <div>
          <h2 class="font-bold">${job.companyName}</h2>
          <p>${job.position}</p>
          <div class="flex gap-2"><p>.${job.location}</p>
          <p>.${job.type}</p>
          <p>.${job.salary}</p> </div>
          <p class="text-sm text-gray-500">${job.description}</p>

          <div class="flex gap-2 mt-3">
            <button class="btn border-2 border-green-600 btn-sm"
              onclick="updateStatus(${job.id},'interview')">
              Interview
            </button>

            <button class="btn border-2 border-red-600 btn-sm"
              onclick="updateStatus(${job.id},'rejected')">
              Rejected
            </button>
          </div>
        </div>

        <i class="fa-solid fa-trash text-red-500 cursor-pointer"
           onclick="deleteJob(${job.id})"></i>

      </div>
    `;

    container.appendChild(div);
  });

  updateCounts();
}


window.filterJobs = function (tab) {
  currentTab = tab;

  const filtered =
    tab === "all" ? jobs : jobs.filter(job => job.status === tab);

  renderJobs(filtered);


  document.querySelectorAll(".btn").forEach(btn => {
    btn.classList.remove("btn-primary");
  });

  document
    .querySelector(`[onclick="filterJobs('${tab}')"]`)
    .classList.add("btn-primary");
};


window.deleteJob = function (id) {
  const index = jobs.findIndex(job => job.id === id);
  jobs.splice(index, 1);
  filterJobs(currentTab);
};


window.updateStatus = function (id, status) {
  const job = jobs.find(job => job.id === id);
  job.status = status;
  filterJobs(currentTab);
};


function updateCounts() {
  document.getElementById("all-count").innerText = jobs.length;

  document.getElementById("interview-count").innerText =
    jobs.filter(job => job.status === "interview").length;

  document.getElementById("rejected-count").innerText =
    jobs.filter(job => job.status === "rejected").length;
}


filterJobs("all");