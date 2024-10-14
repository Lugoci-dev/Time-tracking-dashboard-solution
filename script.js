
let dataJson;

const buttonDay = document.querySelector('.day');
const buttonWeek = document.querySelector('.week');
const buttonMouth = document.querySelector('.month');
buttonDay.addEventListener('click',()=>{
  renderize('daily');
})
buttonWeek.addEventListener('click',()=>{
  renderize('weekly');
})
buttonMouth.addEventListener('click',()=>{
  renderize('monthly');
})


const xhr = new XMLHttpRequest();

xhr.open('GET', './data.json', true);
xhr.send();
xhr.onload = () =>{
  if(xhr.status >= 200 && xhr.status <= 300){
    let jsonResponse = JSON.parse(xhr.responseText);
    dataJson = jsonResponse;
    renderize('daily'); 
  }else{
    alert('Error en la solicitud: '+ xhr.status);
  }
}
xhr.onerror = ()=>{
  alert('Error en la conexion')
}


function renderize(period){
  const currently =  document.querySelectorAll( 'div p span' );
  const previous =  document.querySelectorAll( 'footer p span' );
  const frequency = document.querySelectorAll('footer spa');

  const buttons = document.querySelectorAll('#avatar button');
  buttons.forEach(button => {
    button.style.color = 'var(--Pale-Blue)';
  });

  let counter = 0;
  currently.forEach(current => {
    current.innerText = dataJson[counter].timeframes[period].current;
    previous[counter].innerText = dataJson[counter].timeframes[period].previous;
    
    if(period === 'daily'){
      frequency[counter].innerText = 'day'
      buttonDay.style.color = 'white'
    }else if(period === 'weekly'){
      frequency[counter].innerText = 'week'
      buttonWeek.style.color = 'white'
    }else{
      frequency[counter].innerText = 'month'
      buttonMouth.style.color = 'white'
    }
    counter++;
  });
}