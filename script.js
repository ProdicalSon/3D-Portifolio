
// Must match the stacked-layout media query in style.css.
// Below this size the flip-book is replaced by a normal scrolling page.
const STACKED_QUERY = '(max-width: 1000px), (max-height: 520px)';
const isStacked = () => window.matchMedia(STACKED_QUERY).matches;
 
 
const pages = document.querySelectorAll('.book-page.page-right');
const pageList = Array.from(pages);
 
// Stacking order: pages turned to the left pile up with the newest on top,
// pages still on the right keep the first page on top.
const turnPage = (page) => {
    page.classList.add('turn');
    setTimeout(() => { page.style.zIndex = 20 + pageList.indexOf(page); }, 500);
};
const unturnPage = (page) => {
    page.classList.remove('turn');
    setTimeout(() => { page.style.zIndex = 20 - pageList.indexOf(page); }, 500);
};
 
// next / previous buttons
document.querySelectorAll('.nextprev-btn').forEach((el) => {
    el.onclick = () => {
        const page = document.getElementById(el.getAttribute('data-page'));
        if (page.classList.contains('turn')) {
            unturnPage(page);
        } else {
            turnPage(page);
        }
    };
});
 
// "Contact Me" button: flip to the contact page (or scroll to it in the stacked layout)
const contactMeBtn = document.querySelector('.btn.contact-me');
 
contactMeBtn.onclick = (e) => {
    e.preventDefault();
    if (isStacked()) {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
    }
    // turn every page up to and including the contact spread (turn-3)
    pageList.forEach((page, index) => {
        if (index > 2) return;
        setTimeout(() => turnPage(page), index * 200 + 100);
    });
};
 
// "Profile" button: flip everything back (or scroll to the top in the stacked layout)
const backProfileBtn = document.querySelector('.back-profile');
 
backProfileBtn.onclick = (e) => {
    e.preventDefault();
    if (isStacked()) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    pageList
        .map((page, index) => ({ page, index }))
        .filter(({ page }) => page.classList.contains('turn'))
        .reverse()
        .forEach(({ page }, order) => {
            setTimeout(() => unturnPage(page), order * 200 + 100);
        });
};
 
// opening animation
const coverRight = document.querySelector('.cover.cover-right');
const pageLeft = document.querySelector('.book-page.page-left');
 
// cover opens
setTimeout(() => coverRight.classList.add('turn'), 2100);
setTimeout(() => { coverRight.style.zIndex = -1; }, 2800);
 
// profile page comes forward
setTimeout(() => { pageLeft.style.zIndex = 20; }, 3200);
 
// pages unfold one by one, last page first
pageList.slice().reverse().forEach((page, order) => {
    setTimeout(() => unturnPage(page), (order + 1) * 200 + 2100);
});
 
// Contact form submission
const scriptURL = 'https://script.google.com/macros/s/AKfycby2HVUscnx70QKa6sy77PYTYnYXsVYr4UtyOQhej99jZl_DzK3z3U0_N73s_g_czIKp-g/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")
 
form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Message Sent Successfully"
            setTimeout(function() {
                msg.innerHTML = ""
            }, 1000)
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
})
 
// Swipe to turn pages (book layout only, e.g. tablets in landscape)
let xDown = null;
let yDown = null;
 
document.addEventListener('touchstart', (evt) => {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
}, { passive: true });
 
document.addEventListener('touchend', (evt) => {
    if (xDown === null || yDown === null || isStacked()) {
        xDown = yDown = null;
        return;
    }
 
    const xDiff = xDown - evt.changedTouches[0].clientX;
    const yDiff = yDown - evt.changedTouches[0].clientY;
    xDown = yDown = null;
 
    // ignore short swipes and mostly-vertical scrolls
    if (Math.abs(xDiff) < 50 || Math.abs(xDiff) < Math.abs(yDiff)) return;
 
    const rightPages = Array.from(pages);
    if (xDiff > 0) {
        // swipe left: turn the next page that is still on the right
        const next = rightPages.find(page => !page.classList.contains('turn'));
        const btn = next && next.querySelector('.nextprev-btn:not(.back)');
        if (btn) btn.click();
    } else {
        // swipe right: turn back the last page that is on the left
        const turned = rightPages.filter(page => page.classList.contains('turn'));
        const prev = turned[turned.length - 1];
        const btn = prev && prev.querySelector('.nextprev-btn.back');
        if (btn) btn.click();
    }
}, { passive: true });

    
