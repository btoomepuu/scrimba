let myLeads = [];
const tabs = [{ url: 'https://www.linkedin.com/in/per-harald-borgen/' }];

const inputEl = document.querySelector('#input-el');
const inputBtn = document.querySelector('#input-btn');
const tabBtn = document.querySelector('#tab-btn');
const deleteBtn = document.querySelector('#delete-btn');
const ulEl = document.querySelector('#ul-el');

const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myleads'));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

function render(leads) {
  ulEl.textContent = '';

  leads.forEach((lead) => {
    let li = document.createElement('li');
    let a = document.createElement('a');
    let liItem = document.createTextNode(lead);

    a.href = lead;
    a.appendChild(liItem);
    li.appendChild(a);
    ulEl.appendChild(li);
  });
}

inputBtn.addEventListener('click', (e) => {
  myLeads.push(inputEl.value);
  inputEl.value = '';

  localStorage.setItem('myleads', JSON.stringify(myLeads));
  render(myLeads);
});

tabBtn.addEventListener('click', (e) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs);
    myLeads.push(tabs[0].url);
    localStorage.setItem('myleads', JSON.stringify(myLeads));
    render(myLeads);
  });
});

deleteBtn.addEventListener('dblclick', (e) => {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});
