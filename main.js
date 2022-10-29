//import statements
import  {getCompanies,getRoles} from './modules/salaryData.js';
import {getAverageSalaryByRole,getAverageSalaryByCompany,getSalaryAtCompany,getIndustryAverageSalary} from './modules/workAroundModule.js';
import {formatNumber} from './modules/utilities.js';

const companies = getCompanies();
const roles = getRoles();

//create buttons for each company and role in salaryData module
renderInputButtons(companies, 'company');
renderInputButtons(roles, 'role');

//new html section with radio buttons based on labels array
function renderInputButtons(labels, groupName) {
  const container = document.createElement('section');
  container.setAttribute('id', `${groupName}Inputs`);

  let header = document.createElement('h3');
  header.innerText = `Select a ${groupName}`;
  container.appendChild(header);

  labels.forEach(label => { //for each label we want a radio button attached
    let divElement = document.createElement('div');
    divElement.setAttribute('class', 'option');

    let inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'radio');
    inputElement.setAttribute('name', groupName);
    inputElement.setAttribute('value', label);
    divElement.appendChild(inputElement);

    let labelElement = document.createElement('label');
    labelElement.setAttribute('for', label);
    labelElement.innerText = label;
    divElement.appendChild(labelElement);

    inputElement.addEventListener('click', updateResults); //update results (right-most panel) when something is clicked

    container.appendChild(divElement);
  });

  document.querySelector('main').prepend(container);
}

function updateResults(){
  //get currently selected options
  const company = document.querySelector("input[name='company']:checked").value;
  const role = document.querySelector("input[name='role']:checked").value;

  if (!company || !role) { return; } //if one of the option categories is not selected, nothing will be returned in the results

  //functions from workaroundmodule, plus formatNumber from utilities to add commas and round to nearest dollar
  const averageSalaryByRole = formatNumber(getAverageSalaryByRole(role));
  const averageSalaryByCompany = formatNumber(getAverageSalaryByCompany(company));
  const salary = formatNumber(getSalaryAtCompany(role, company));
  const industryAverageSalary = formatNumber(getIndustryAverageSalary());

  //render to right-most panel ("Details:" column)
  document.getElementById('salarySelected').innerText = `The salary for ${role}s at ${company} is \$${salary}`;
  document.getElementById('salaryAverageByRole').innerText = `The industry average salary for ${role} positions is \$${averageSalaryByRole}`;
  document.getElementById('salaryAverageByCompany').innerText = `The average salary at ${company} is \$${averageSalaryByCompany}`;
  document.getElementById('salaryAverageIndustry').innerText = `The average salary in the Tech industry is \$${industryAverageSalary}`;
}



