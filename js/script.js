'use strict';

const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
  
    /* [DONE] remove class 'active' from all article links  */
  
    const activeLinks = document.querySelectorAll('.titles a.active');
  
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
  
    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
  
    console.log('clickedElement:', clickedElement);
    console.log('clickedElement (with plus): ' + clickedElement);
  
    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
  
    /* [DONE] get 'href' attribute from the clicked link */
    const linkHref = clickedElement.getAttribute('href');
  
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const activeArticle = document.querySelector('article'+ linkHref);
  
    /* [DONE] add class 'active' to the correct article */
    activeArticle.classList.add('active');
  }

  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

  titleList.textContent = '';

  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){
    /* [DONE] get the article id */
    const id = article.getAttribute('id');
    console.log(id);
    /* [DONE] find the title element */
    const title = article.querySelector(optTitleSelector);
    console.log(title);
    /* [DONE] get the title from the title element */
    const titleContent = title.textContent;
    console.log(titleContent);
    /* [DONE] create HTML of the link */
    const entry = document.createElement('li');
    const a = document.createElement('a');
      var linkText = document.createElement('span');
      linkText.textContent = titleContent;
      a.appendChild(linkText);
      a.title = titleContent;
      a.href = `#${id}`;
    entry.appendChild(a);
    /* [DONE] insert link into titleList */
    titleList.appendChild(entry);
  }

}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');
  
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

function printMessage(msg){
	let div = document.createElement('div');
	div.innerHTML = msg;
	document.getElementById('messages').appendChild(div);
}

function clearMessages(){
	document.getElementById('messages').innerHTML = '';
}
