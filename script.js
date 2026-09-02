function openPrivacyModal(){
  const modal = document.getElementById('privacy-modal');
  if(modal) modal.classList.add('open');
}
function closePrivacyModal(){
  const modal = document.getElementById('privacy-modal');
  if(modal) modal.classList.remove('open');
}

document.addEventListener('DOMContentLoaded', function(){

  // Privacy modal
  const privacyModal = document.getElementById('privacy-modal');
  if(privacyModal){
    privacyModal.addEventListener('click', function(e){
      if(e.target === this) closePrivacyModal();
    });
  }
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closePrivacyModal();
  });

  // Contact / inquiry form (only present on the homepage)
  const form = document.getElementById('inquiry-form');
  const sentMsg = document.getElementById('sent-msg');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('name');
      const phone = document.getElementById('phone');
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value.trim();

      let valid = true;
      document.getElementById('err-name').style.display = 'none';
      document.getElementById('err-phone').style.display = 'none';

      if(!name.value.trim()){
        document.getElementById('err-name').style.display = 'block';
        valid = false;
      }
      if(!phone.value.trim()){
        document.getElementById('err-phone').style.display = 'block';
        valid = false;
      }
      if(!valid){
        if(sentMsg) sentMsg.style.display = 'none';
        return;
      }

      const summary = 'New inquiry from ' + name.value.trim() +
        '\nPhone: ' + phone.value.trim() +
        '\nInterested in: ' + service +
        (message ? ('\nMessage: ' + message) : '');

      const waText = encodeURIComponent(summary);
      window.open('https://wa.me/923269861611?text=' + waText, '_blank');

      if(sentMsg) sentMsg.style.display = 'block';
      form.reset();
    });
  }

  // Mobile menu toggle (present on every page)
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if(menuToggle && mobileMenu){
    menuToggle.addEventListener('click', function(){
      const isOpen = mobileMenu.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    mobileMenu.querySelectorAll('a').forEach(link=>{
      link.addEventListener('click', function(){
        mobileMenu.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Star rating widget (only present on the homepage)
  const starContainer = document.getElementById('star-rating');
  const ratingThanks = document.getElementById('rating-thanks');
  const starButtons = starContainer ? Array.from(starContainer.querySelectorAll('.star-btn')) : [];
  let selectedRating = 0;

  function paintStars(upTo){
    starButtons.forEach(btn=>{
      const val = parseInt(btn.getAttribute('data-value'), 10);
      const svg = btn.querySelector('svg');
      if(val <= upTo){
        svg.setAttribute('fill', '#A97C34');
      } else {
        svg.setAttribute('fill', 'none');
      }
    });
  }

  starButtons.forEach(btn=>{
    const val = parseInt(btn.getAttribute('data-value'), 10);
    btn.addEventListener('mouseenter', function(){
      paintStars(val);
    });
    btn.addEventListener('click', function(){
      selectedRating = val;
      starButtons.forEach(b=>b.setAttribute('aria-checked', b === btn ? 'true' : 'false'));
      paintStars(val);
      if(ratingThanks) ratingThanks.classList.add('show');
    });
  });

  if(starContainer){
    starContainer.addEventListener('mouseleave', function(){
      paintStars(selectedRating);
    });
  }

  // Scroll-reveal animation (present on every page)
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:0.15});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

});
