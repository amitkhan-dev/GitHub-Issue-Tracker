const cardContaine = document.getElementById('card-container');
const loadingSpinner = document.getElementById('loadingSpinner');
const issueCountElement = document.getElementById('issue-count');
const searchInput = document.getElementById('search-input');

let allIssuses = [];


async function loadIssue (){
  loadingSpinner.classList.remove("hidden");
  loadingSpinner.classList.add("flex");


// const url= fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
// url.then((res)=> res.json())
// .then((data)=> console.log(data))
// .catch((e)=> console.log(e));


// asyn await

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");

const result = await res.json();
allIssuses = result.data;

loadingSpinner.classList.add("hidden");
loadingSpinner.classList.remove("flex");
updateCount(allIssuses.length);
loadDispaly(result.data);

loadingSpinner.classList.add("hidden");


}

function updateCount (number){
  const issueCount = document.getElementById('issue-count');
  issueCount.innerText = `${number} Issues`;
  
}



function loadDispaly (issues){
  cardContaine.innerHTML=""

  issues.forEach(data => {
  // console.log(data);

// bug ,enhancement filtering----
  let labelsHTML = ''; 
  data.labels.forEach(label => {
  labelsHTML+= `
          <div  class="badge   ${label === 'bug' ? ' bg-red-100      text-red-500 ' : label === 'enhancement' ? 'bg-green-100    text-green-500':' bg-yellow-100 text-yellow-600'} gap-1 px-3 py-3">
          <i class="fa-solid ${label === 'bug' ? 'fa-bug' : label === 'enhancement' ? 'fa-star':'fa-life-ring'} "></i>
          <span class="text-[8px] font-bold  uppercase">${label}</span>
          </div>`;

});

// --- date formate ---
  const dateObj = new Date(data.createdAt); 
  const formattedDate = dateObj.toLocaleDateString();

  const borderColor = data.status === 'open' ? 'border-t-green-400' : 'border-t-purple-500';

  const card = document.createElement('div');
  card.className =`card  bg-base-100 shadow-sm border-t-4 border-gray-100  ${borderColor}`

  // ----------card layout by dynamic---------------------------

card.innerHTML=`
        <div class="p-5">
          <div class="flex justify-between  mb-3">
            <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <img src="${data.status === 'open' ?'./assets/Open-Status.png' : './assets/Closed- Status .png'}" alt="">
            </div>
            <span class="badge ${data.priority === 'high' ? 'bg-red-50 text-red-500': data.priority === 'medium'? 'bg-[#fff6d1] text-[#f59e0b]': 'bg-[#eeeff2] text-[#9ca3af]'}  font-bold text-xs px-3 py-3 uppercase">
            ${data.priority}</span>
          </div>
          <h2 class="text-slate-800 font-bold text-lg leading-tight mb-2">${data.title}</h2>
          <p class="text-slate-500 text-sm mb-4 line-clamp-2  ">${data.description}</p>
          <div class="flex gap-1 mb-4">
          <div class=" flex  gap-1 px-2 py-3" text-[9px]>${labelsHTML}
          </div>
          </div>
        </div>

        <div class="border-t border-gray-100 p-5 pt-4">
          <p class="text-slate-400 text-sm">${data.assignee}</p>
          <p class="text-slate-400 text-sm mt-1">${formattedDate}</p>
        </div>`

// ------------modal same as card format -----------
card.onclick = () => {
    const modalContent = document.getElementById('modal-content');
    const modal = document.getElementById('issue_details_modal');

    modalContent.className =` bg-base-100 shadow-sm border-t-4 rounded-md border-gray-100  ${borderColor}`

    modalContent.innerHTML = `
      <div class="flex items-center gap-4 mb-6">
        <div class="w-12 h-12 rounded-full ${data.status === 'open' ? 'bg-green-100' : 'bg-purple-100'} flex items-center justify-center">
          <img src="${data.status === 'open' ?'./assets/Open-Status.png' : './assets/Closed- Status .png'}" alt="">
        </div>
        <div>
          <h3 class="font-bold text-2xl text-slate-800">${data.title}</h3>
          
        </div>
      </div>

      <div class="space-y-4 border-t border-gray-100 pt-4">
        <p class="text-lg"><span class="font-bold text-slate-700">Description:</span> <br>
        <span class="text-slate-600 text-base">${data.description}</span>
        </p>
        
        <div class="grid grid-cols-2 gap-4">
            <p class="font-bold"> Status:
              <span class="badge ${data.status === 'open' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'} border-none px-4 py-3 uppercase font-bold text-xs">${data.status}</span>
            </p>
            <p class="font-bold" >Priority: 
              <span class="badge ${data.priority === 'high' ? 'bg-red-50 text-red-500': data.priority === 'medium'? 'bg-[#fff6d1] text-[#f59e0b]': 'bg-[#eeeff2] text-[#9ca3af]'}  font-bold text-xs px-3 py-3 uppercase">
            ${data.priority}</span>
            </p>
            <p class= "font-bold">Author: <span class="text-slate-700 font-semibold">${data.assignee}</span></p>
            <p >Created Date: <span class="text-slate-500">${formattedDate}</span></p>
        </div>

        <div class="mt-4 font-bold">
            Labels:
            <div class="flex gap-2 mt-2">
                ${labelsHTML}
            </div>
        </div>
      </div>
    `;

    modal.showModal();
};

cardContaine.appendChild(card)
});
}

// filtering btn

const filterBtn = document.querySelectorAll('.filter-btn');
filterBtn.forEach(btn => {
  btn.addEventListener('click', (e) => {
    filterBtn.forEach(singleBtn => {
        singleBtn.classList.add('btn-soft'); 
    });
    e.target.classList.remove('btn-soft');
    const status = e.target.innerText.toLowerCase();
    if( status === 'all'){
      loadDispaly(allIssuses);
      updateCount(allIssuses.length);
    }else{
      

      const filtered = allIssuses.filter(item=> item.status === status);
      loadDispaly(filtered);
      updateCount(filtered.length);
    }
  })
})


searchInput.addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();

    if (searchText === "") {
        loadDispaly(allIssuses);
        updateCount(allIssuses.length);
        return; 
    }

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`)
    .then(res => res.json())
    .then(result => {
    const searchedData = result.data; 
    loadDispaly(searchedData);
    updateCount(searchedData.length);
  })
        
});

loadIssue ();