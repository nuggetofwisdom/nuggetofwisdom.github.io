const menuButton = document.querySelector('#menu-button');
const navigation = document.querySelector('#site-navigation');
const gallery = document.querySelector('.gallery');
const imageViewer = document.querySelector('#image-viewer');
const viewerImage = imageViewer.querySelector('img');
const closeViewerButton = imageViewer.querySelector('.close-viewer');

menuButton.addEventListener('click', () => {
	const isOpen = navigation.classList.toggle('menu-open');
	menuButton.setAttribute('aria-expanded', isOpen);
});

gallery.addEventListener('click', (event) => {
	if (!(event.target instanceof HTMLImageElement)) return;

	viewerImage.src = event.target.src;
	viewerImage.alt = event.target.alt;
	imageViewer.showModal();
});

closeViewerButton.addEventListener('click', () => {
	imageViewer.close();
});

imageViewer.addEventListener('click', (event) => {
	if (event.target === imageViewer) {
		imageViewer.close();
	}
});
