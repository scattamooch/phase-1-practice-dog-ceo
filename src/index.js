console.log('%c HI', 'color: firebrick')
//fetch the data and load a picture of each dog 
//fetch the second link and add the dogs to the ul
//change the color of the font for a link in the li when clicked
//filter the breeds by letter in the dropdown menu and add the rest of the alphabet

//event listener makes sure the functions wait for the page to load
document.addEventListener("DOMContentLoaded", () => { 
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const dogsOneContainer = document.getElementById("dog-image-container");
    const dogsUL = document.getElementById("dog-breeds");

    function init() {
        dropdownAlphabet();
        sortBreedsByLetter();
    }

//fetch the data and load a picture of each dog 
    fetch(imgUrl)
        .then(response => response.json())
        .then(dogObject => {
        const dogArray = Object.values(dogObject.message);
            renderDogArray(dogArray);
        });
//makes the dog immages appear and ultimately gets called on in the first fetch
    function renderDogArray(dogArray) {
        dogArray.forEach (dog => {
            const img = document.createElement("img");
            img.setAttribute("src", dog);
            dogsOneContainer.append(img);  
        });
    }  
//fetch the second link and add the dog breeds to the UL  
    fetch(breedUrl)
        .then(response => response.json())
        .then(breedsObject => {
            const breedArray = Object.entries(breedsObject.message);     //instead of storing just the values like the previous fetch, this preserves the keys AND the values
            renderBreedList(breedArray);                                    //invokes the below render function to add the breeds to the UL
            document.querySelectorAll("li").forEach( (li) => {          //makes the breeds/subbreeds turn purple when clicked. needed to be placed here because outside the fetch was causing load errors --> synch vs asynch
            li.addEventListener("click", () => {
                li.style.color = "purple";
                });
            }); 
        });
    function renderBreedList(breedArray) {
        breedArray.forEach(([key, values]) => {                          
            const breedList = document.createElement("li");           
            breedList.setAttribute("id",`${key}`);
            breedList.textContent = key;                                     

            if (values.length > 0) {                                     
                const subBreedParentElement = document.createElement("ul");           
                subBreedParentElement.setAttribute("id","empty-parent");
                values.forEach(value => {
                    const subBreeds = document.createElement("li");
                    subBreeds.setAttribute("id",`${value}`);       
                    subBreeds.textContent = value;                               
                    subBreedParentElement.append(subBreeds);                       
                });
                breedList.append(subBreedParentElement);                          
            }
            dogsUL.append(breedList);
        });
    }
//little convoluted workaround, but there are 4 lists nested "downward": dogsUL --> breedsLI --> subBreedParentElement --> subBreedsLI
//dogsUL has no text, it serves as the parent to breedsLI. It's the top-parent element
//breedsLI is where the main breed is (non-indented bullet)
//subBreedParentElement has no text, it serves as the parent to subBreedsLI
//subBreedsLI is where the sub breed is actually listed (indented bullet)

    function dropdownAlphabet() {
        const alphabetObject = {
            1:"a", 2:"b", 3:"c", 4:"d", 5:"e", 6:"f", 7:"g", 8:"h", 9:"i", 10:"j", 11:"k", 12:"l", 13:"m", 14:"n", 15:"o", 16:"p", 17:"q", 18:"r", 19:"s", 20:"t", 21:"u", 22:"v", 23:"w", 24:"x", 25:"y", 26:"z",};
        for (const num in alphabetObject) {
            const letter = alphabetObject[num];
            const dropdownElement = document.getElementById("breed-dropdown");
            const createdropdownOption = document.createElement("option");
            createdropdownOption.setAttribute("value", `${letter}`);
            createdropdownOption.textContent = `${letter}`;
            dropdownElement.appendChild(createdropdownOption);
        };   
    }
    function sortBreedsByLetter() {
        const dropdownSelectElement = document.querySelectorAll("option");
        dropdownSelectElement.forEach( (option) => {
            option.addEventListener("click", () => {
                option.preventDefault();
                console.log("bing bong")
            });
        });
    };
    init();
});