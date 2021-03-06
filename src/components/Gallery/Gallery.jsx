import React, { useState, useEffect, useRef } from 'react';
import { gradImages } from '../../constants/gradImages.js';
import { landscapeImages } from '../../constants/landscapeImages.js';
import { portraitImages } from '../../constants/portraitImages.js';

import './Gallery.css';


function Gallery({ photoCategory }) {
    const[category, setCategory] = useState([]);
    const timer = useRef(1000);

    // cache images for preloading -> performance improvements
    const cacheImages = async (srcArray) => {
        const promises = srcArray.map((src) => {
            return new Promise(function (resolve, reject) {
                const img = new Image();

                img.src = src;
                img.onload = resolve();
                img.onerror = reject();
            });
        });

        await Promise.all(promises);
    }

    useEffect(() => {
        if (photoCategory === 'graduation') {
            setCategory(gradImages);
            cacheImages(gradImages);
        } else if (photoCategory === 'landscapes') {
            setCategory(landscapeImages);
            cacheImages(landscapeImages);
        } else if (photoCategory === 'portraits') {
            setCategory(portraitImages);
            cacheImages(portraitImages);
        }

        return () => {

        }
    },[category])

    

  return (
    <>
        <h1 className='gallery-header'>{photoCategory.toUpperCase()}</h1>
        <div className='gallery-container' >
            {category.map((img, index) => {
                timer.current = timer.current + 200;
                return (
                    <div className='image-container' style={{animation: `image-slide-up ${timer.current}ms ease`}} key={index} >
                        <img src={img} alt='gallery-image' />
                    </div>
                )
            })}
        </div>
    </>
  )
}

export default Gallery