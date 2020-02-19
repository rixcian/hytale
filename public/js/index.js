async function supportsWebp() {
    if (!self.createImageBitmap) return false;
    
    const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
    const blob = await fetch(webpData).then(r => r.blob());
    return createImageBitmap(blob).then(
        () => document.querySelector('html').classList.add('webp'), 
        () => document.querySelector('html').classList.add('no-webp')
    );
}
  
supportsWebp();

document.getElementById('menu-icon').addEventListener('click', e => {
    var mm = document.querySelector('.mobile-menu');
    mm.style.display = 'block';
});

document.getElementById('menu-icon-exit').addEventListener('click', e => {
    var mm = document.querySelector('.mobile-menu');
    mm.style.display = 'none';    
});