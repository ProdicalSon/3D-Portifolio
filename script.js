const pageTurnBtn = document.querySelectorAll('.nextprev-btn');
pageTurnBtn.forEach((el, index) => {
el.onclick = () => {
const pageTurnId = el.getAttribute('data-page');
const pageTurn = document.getElementById(pageTurnId);
if (pageTurn.classList.contains('turn')) { pageTurn.classList.remove('turn');
setTimeout(() => {
pageTurn.style.zIndex = 20 - index; }, 500);
}
else {
pageTurn.classList.add('turn');
setTimeout(() => {
pageTurn.style.zIndex = 20 + index;
}, 500);
}
}
})

//contact me button when clicked
const pages = document.querySelectorAll('.book-page.page-right');
const contactMeBtn = document.querySelector('.btn.contact-me');

contactMeBtn.onclick = () => {

pages.forEach((page, index) => {
setTimeout(() => {

page.classList.add('turn');

setTimeout(() => {

page.style.zIndex = 20 + index;
}, 500)

}, (index + 1) * 200 + 100) 
})
}

//crate a reverse inde function
let totalPages = pages.length;
let pageNumber = 0;

function reverseIndex() {
pageNumber--;

if (pageNumber < 0) {
pageNumber = totalPages - 1;
}
}


// back profile when clicked
const backProfileBtn = document.querySelector('.back-profile');

backProfileBtn.onclick = () => {
pages.forEach((_, index) => {

setTimeout(() => {
reverseIndex();
pages [pageNumber].classList.remove('turn');

setTimeout(() => {
reverseIndex();
pages [pageNumber].style.zIndex = 10 + index;
}, 500)
}, (index + 1) * 200 + 100)
})
}

//opening animation
 const coverRight = document.querySelector('.cover.cover-right');
 const pageLeft = document.querySelector('.book-page.page-left');

 //opening animation (cover right animation)
 setTimeout(() =>{
    coverRight.classList.add('turn');
 }, 2100)

 setTimeout(() =>{
    coverRight.style.zIndex = -1;
 }, 2800)

 //opening animation (page left or profile page animation)
 setTimeout(() =>{
    pageLeft.style.zIndex = 20;
 }, 3200)

  //opening animation (all page right animation)
  pages.forEach((_, index) => {

    setTimeout(() => {
    reverseIndex();
    pages [pageNumber].classList.remove('turn');
    
    setTimeout(() => {
    reverseIndex();
    pages [pageNumber].style.zIndex = 10 + index;
    }, 500)
    }, (index + 1) * 200 + 2100)
    })


    const scriptURL = 'https://script.google.com/macros/s/AKfycby2HVUscnx70QKa6sy77PYTYnYXsVYr4UtyOQhej99jZl_DzK3z3U0_N73s_g_czIKp-g/exec'
    const form = document.forms['submit-to-google-sheet']
    const msg = document.getElementById("msg")
  
    form.addEventListener('submit', e => {
      e.preventDefault()
      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            msg.innerHTML = "Message Sent Succesfuly"
            setTimeout(function(){
              msg.innerHTML = ""  
            }, 1000)
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
    })