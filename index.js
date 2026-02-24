import { jobs } from "./data.js";

let currentTab = "all";

// Render all jobs
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
          <div class="flex gap-2">
            <p>.${job.location}</p>
            <p>.${job.type}</p>
            <p>.${job.salary}</p>
          </div>
          <p class="text-sm text-gray-500">${job.description}</p>

          <!-- Status Button: Only show if status exists -->
          ${job.status
        ? `<button id="status-${job.id}" class="mt-2 px-3 py-1 rounded border text-white ${job.status === "Applied"
          ? "bg-green-500"
          : job.status === "Rejected"
            ? "bg-red-500"
            : "bg-gray-500"
        }">${job.status}</button>`
        : `<button class="mt-2 px-3 py-1 rounded border text-white bg-gray-500">Not Applied</button>`
      }

          <div class="flex gap-2 mt-3">
            <button class="btn border-2 border-green-600 btn-sm"
              onclick="updateStatus(${job.id}, 'Applied')">
              Interview
            </button>

            <button class="btn border-2 border-red-600 btn-sm"
              onclick="updateStatus(${job.id}, 'Rejected')">
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
};

// Filter jobs by tab
window.filterJobs = function (tab) {
  currentTab = tab;

  let filtered;
  if (tab === "all") filtered = jobs;
  else if (tab === "interview") filtered = jobs.filter(j => j.status === "Applied");
  else if (tab === "rejected") filtered = jobs.filter(j => j.status === "Rejected");

  renderJobs(filtered);

  document.querySelectorAll(".btn").forEach(btn => btn.classList.remove("btn-primary"));
  const tabButton = document.querySelector(`[onclick="filterJobs('${tab}')"]`);
  if (tabButton) tabButton.classList.add("btn-primary");
};

// Delete job
window.deleteJob = function (id) {
  const index = jobs.findIndex(job => job.id === id);
  jobs.splice(index, 1);
  filterJobs(currentTab);
};

// Update status when Interview or Rejected button clicked
window.updateStatus = function (id, status) {
  const job = jobs.find(j => j.id === id);
  job.status = status; // Save status

  const statusBtn = document.getElementById(`status-${id}`);
  if (statusBtn) {
    // Update existing button
    statusBtn.innerText = status;
    statusBtn.className = `mt-2 px-3 py-1 rounded border text-white ${status === "Applied" ? "bg-green-500" : "bg-red-500"
      }`;
  }

  // Re-render to remove Not Applied button
  filterJobs(currentTab);
};

// Update counts
function updateCounts() {
  document.getElementById("all-count").innerText = jobs.length;
  document.getElementById("interview-count").innerText = jobs.filter(j => j.status === "Applied").length;
  document.getElementById("rejected-count").innerText = jobs.filter(j => j.status === "Rejected").length;
}

// Initialize
filterJobs("all");