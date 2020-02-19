let allArticleImages = document.querySelectorAll('.article-image img');
let allArticleImagesSrc = [];
let imageIndex = 0;

let galleryWrapper = document.getElementById('gallery-wrapper');
let imgTag = galleryWrapper.querySelector('img');
let photoIndicator = galleryWrapper.querySelector('.gallery-photo-indicator');

let allArticleImagesLinks = document.querySelectorAll('.article-image');

allArticleImages.forEach(image => {
    allArticleImagesSrc.push(image.src);
});

const updateImgAndIndicator = () => {
    imgTag.src = allArticleImagesSrc[imageIndex];
    photoIndicator.innerText = `${imageIndex+1} / ${allArticleImagesSrc.length}`;
}

const prevImageHandler = () => {
    if (imageIndex !== 0) {
        imageIndex -= 1;
        updateImgAndIndicator();
        console.log('prev image');
        console.log(imageIndex+1);
    } else {
        imageIndex = allArticleImagesSrc.length-1;
        updateImgAndIndicator();
        console.log('last image');
        console.log(imageIndex+1);
    }
};

const nextImageHandler = () => {
    if (imageIndex !== allArticleImagesSrc.length-1) {
        imageIndex += 1;
        updateImgAndIndicator();
        console.log('next image');
        console.log(imageIndex+1);
    } else {
        imageIndex = 0;
        updateImgAndIndicator();
        console.log('first image');
        console.log(imageIndex+1);
    }
}

allArticleImagesLinks.forEach(imgLink => {
    imgLink.addEventListener('click', e => {

        imageIndex = allArticleImagesSrc.findIndex(imgSrc => imgSrc === e.target.src);
        
        let prevButton = galleryWrapper.querySelector('.gallery-btn-prev');
        let nextButton = galleryWrapper.querySelector('.gallery-btn-next');

        updateImgAndIndicator();

        galleryWrapper.style.display = 'flex';
        galleryWrapper.style.opacity = 1;


        galleryWrapper.addEventListener('click', e => {
            let etrgt = e.target;

            if (!imgTag.contains(etrgt) && !prevButton.contains(etrgt) && !nextButton.contains(etrgt) 
                && !photoIndicator.contains(etrgt)) {
                galleryWrapper.style.display = 'none';
                galleryWrapper.style.opacity = 0;

                prevButton.removeEventListener('mousedown', prevImageHandler);
                nextButton.removeEventListener('mousedown', nextImageHandler);
            } 
        });

        prevButton.addEventListener('mousedown', prevImageHandler);
        nextButton.addEventListener('mousedown', nextImageHandler);
    
    });
});