/*eslint-env es6*/

const fragment = document.createDocumentFragment();// ← uses a DocumentFragment
//Sections Global Variable
const sections = document.querySelectorAll('section');
//Navigation Global Variable
const MyUl = document.getElementById('navbar__list');
//My btn variable
const myBtn = document.getElementById("btnGoToTop");

//Activate Go to top btn
document.addEventListener('scroll',function btnAppearFun()
{
let Scrolling = window.scrollY;
//if User scroll My go to up btn will appear
  if (Scrolling > 0)
  {
    myBtn.style.display = "block";//showing my btn
  }
  else
  {
    clearMyActiveNav();
    myBtn.style.display = "none";//hide my btn
  }
});

myBtn.addEventListener('click',function GotoUp()//adding click event to go to window top
{
  window.scrollTo(0, 0);
});

//Using Funtion to build my Navbar
function buildMyNav()
{
	//Looping over all sections
	sections.forEach((section) =>
	{

		  let text = section.getAttribute('data-nav');
	    // create li
	    let newLi = document.createElement('li');
	    newLi.className =('menu__link');
	    let secId = section.getAttribute('id');
	    // create link
	    let liLink = document.createElement('a');
	    liLink.setAttribute('id',secId);
	     // create textNode
	    let textNode = document.createTextNode(text);

	    //Create function to let user scroll into view
		liLink.addEventListener('click',function()
	    {
	        section.scrollIntoView({behavior:"smooth"});

	    });

	    liLink.appendChild(textNode);
	    newLi.appendChild(liLink);
	    fragment.appendChild(newLi);
	});

//Append all elements to the navigation
MyUl.appendChild(fragment);
};
//Calling my navbar builder function
buildMyNav();

const links = document.querySelectorAll('a');
function clearMyActiveNav()
{
  for(link of links){
      link.parentElement.classList.remove('active-link');
  }
};
//Create a function to remove the active class from sections
function clearMyActiveClass()
{
  for(section of sections){
    section.classList.remove('your-active-class','active-class');
  };
};

//Adding an scroll event to highlight the active section
 window.addEventListener('scroll',function(){
  const options =
  {
    root: null,
    threshold:0.7,
    rootMargin:'0px'
  };
//Using the IntersectionObserver to get the active section
  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) =>
    {
      if(entry.isIntersecting)//If section is in viewport
      {
        //create a function to change navbar background while link is active
        function activateMyLink(){
          //grtting the active section id
          let sectionId = entry.target.id;
          // console.log(sectionId);
          //looping links to get linkID
          links.forEach((link) => {
          let linkId = link.getAttribute('id');
          // console.log(linkId);
          if (sectionId == linkId){
            //if condition is true add my class to change background
            link.parentElement.classList.add('active-link');
          }
          else {
            //if condition is false remove my class to change background
            link.parentElement.classList.remove('active-link');
          }
        });
    };
        let getnav = document.querySelectorAll('nav');
        //Callingmy function if section in view
        activateMyLink();
        //calling my function to clear all active classes
        clearMyActiveClass();
        //adding active classes to the section in view
        entry.target.classList.add('your-active-class','active-class');
      }
      else
      {
        // we are EXITING the "capturing frame" so we remove the active class
        entry.target.classList.remove('your-active-class','active-class');
        //if section is not visible we don't observe it anymore
        observer.unobserve(entry.target);
      }
    });
  }, options);
    //doing this to all sections
    sections.forEach((section) => {
      //activate observer to observe sections
    observer.observe(section);
  });
});