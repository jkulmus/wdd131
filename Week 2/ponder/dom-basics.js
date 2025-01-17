const newParagraph = document.createElement('p');
newParagraph.innerText = "Added with Javascript!";
document.body.appendChild(newParagraph);

const newImage = document.createElement("img");
newImage.setAttribute("src", "https://picsum.photos200");
newImage.setAttribute("alt", "Random image from picsum.");
document.body.appendChild(newImage);