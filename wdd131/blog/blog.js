const articles = [
	{
		id: 1,
		title: 'Septimus Heap Book One: Magyk',
		date: 'July 5, 2022',
		description:
			'If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.',
		imgSrc: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg',
		imgAlt: 'Book cover for Septimus Heap 1',
		ages: '10-14',
		genre: 'Fantasy',
		stars: '⭐⭐⭐⭐'
	},
	{
		id: 2,
		title: 'Magnus Chase Book One: Sword of Summer',
		date: 'December 12, 2021',
		description:
			'The anticipated new novel by Rick Riordan. After Greek mythology (Percy Jackson), Greek/Roman (Heroes of Olympus), and Egyptian (Kane Chronicles), Rick decides to try his hand with Norse Mythology, and the end result is good.',
		imgSrc:
			'https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300',
		imgAlt: 'Book cover for Magnus Chase 1',
		ages: '12-16',
		genre: 'Fantasy',
		stars: '⭐⭐⭐⭐'
	},
	{
		id: 3,
		title: "Belgariad Book One: Pawn of Prophecy",
		date: "Feb 12, 2022",
		description:
		"A fierce dispute among the Gods and the theft of a powerful Orb leaves the World divided into five kingdoms. Young Garion, with his 'Aunt Pol' and an elderly man calling himself Wolf --a father and daughter granted near-immortality by one of the Gods -- set out on a complex mission.",
		imgSrc:
		"https://images-na.ssl-images-amazon.com/images/I/41ZxXA+nInL.jpg",
		imgAlt: "Book cover for Pawn of Prophecy",
		ages: "12-16",
		genre: "Fantasy",
		stars: "⭐⭐⭐⭐⭐"
	}
];

function toDatetime(dateText) {
	const d = new Date(dateText);
	const month = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	return `${d.getFullYear()}-${month}-${day}`;
}

const articlesContainer = document.querySelector('#articles');

articles.forEach(article => {
	const starCount = [...article.stars].length;

	const articleHTML = `
		<article class="book">
			<aside class="book-details" aria-label="Book details">
				<p class="date"><time datetime="${toDatetime(article.date)}">${article.date}</time></p>
				<p><span class="visually-hidden">Ages </span>${article.ages}</p>
				<p><span class="visually-hidden">Genre: </span>${article.genre}</p>
				<p class="rating" role="img" aria-label="Rating: ${starCount} out of 5 stars">${article.stars}</p>
			</aside>

			<div class="book-content">
				<h2>${article.title}</h2>
				<img src="${article.imgSrc}" alt="${article.imgAlt}" width="150" height="200" loading="lazy">
				<p>${article.description}</p>
			</div>
		</article>
	`;

	articlesContainer.innerHTML += articleHTML;
});
