import React, { useEffect } from 'react';
import Carousel from '../Carousel/Carousel';

import './SneakPeek.css';

const carouselOptions = {
  root: null,
  threshold: 0.3,
  rootMargin: "0px 0px -80px 0px"
};
const carouselObserver = new IntersectionObserver(function(entries, carouselObserver) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      console.log('test');
      return;
    } else {
      entry.target.classList.add("carousel-appear");
      console.log(entry);
      carouselObserver.unobserve(entry.target);
    }
  })
}, carouselOptions);

function SneakPeek() {
  
useEffect(() => {
  const carouselFaders = document.querySelectorAll(".carousel-fade");
  console.log(carouselFaders);
  carouselFaders.forEach(fader => {
    carouselObserver.observe(fader);
  })

  return () => {
    carouselObserver.disconnect();
  }
},[]);

  return (
    <section className='sneak-peek'>
      <div className='carousel-fade' >
        <Carousel text='Test: Take your grad pics!' position='left' category='Graduation' />
      </div>
      <div className='carousel-fade'>
        <Carousel text='Test: Take your portrait pics!' position='right' category='Portraits' />
      </div>

    </section>
  )
}

export default SneakPeek