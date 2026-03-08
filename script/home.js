const cardContaine = document.getElementById('card-container');
async function loadIssue (){
  
// const url= fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
// url.then((res)=> res.json())
// .then((data)=> console.log(data))
// .catch((e)=> console.log(e));

// asyn await
const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");

const result = await res.json();
loadDispaly(result.data);


}
async function loadDispaly (issues){
  cardContaine.innerHTML=""
  issues.forEach(data => {
  console.log(data);

// bug----
  let labelsHTML = ''; 
  data.labels.forEach(label => {
  labelsHTML+= `<div  class="badge  ${label === 'bug' ? ' bg-red-100    text-red-500 ' : label === 'enhancement' ? 'bg-green-100    text-green-500':' bg-yellow-100 text-yellow-600'} gap-1 px-3 py-3">
    <i class="fa-solid ${label === 'bug' ? 'fa-bug' : label === 'enhancement' ? 'fa-star':'fa-life-ring'} "></i>
    <span class="text-[9px] font-bold  uppercase">${label}</span>
  </div>`;

});

// --- date formate ---
  const dateObj = new Date(data.createdAt); 
  const formattedDate = dateObj.toLocaleDateString();

  const card = document.createElement('div')
card.className ="card  bg-base-100 shadow-sm border-t-4 border-gray-100  border-t-green-400"


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
          <div class="badge  gap-1 px-2 py-3" text-[14px]>${labelsHTML}
          </div>
          </div>
        </div>

        <div class="border-t border-gray-100 p-5 pt-4">
          <p class="text-slate-400 text-sm">${data.assignee}</p>
          <p class="text-slate-400 text-sm mt-1">${formattedDate}</p>
        </div>`
cardContaine.appendChild(card)
});

}

loadIssue ();