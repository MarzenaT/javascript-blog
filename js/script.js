'use strict';

const opts = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  tagsListSelector : '.tags.list',
  authorsListSelector : '.authors.list',
  cloudClassCount: 5,
  cloudClassPrefix: 'tag-size-',
  articleAuthorSelector: '.post-author',
};

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
};
  

function generateTitleLinks(customSelector = ''){

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(opts.titleListSelector);

  titleList.textContent = '';

  /* [DONE] for each article */
  const articles = document.querySelectorAll(opts.articleSelector + customSelector);

  for(let article of articles){
    /* [DONE] get the article id */
    const id = article.getAttribute('id');
    console.log(id);
    /* [DONE] find the title element */
    const title = article.querySelector(opts.titleSelector);
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
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateParams(tags) {
  const result = {max: 0, min: 9999999};
  for(let tag in tags) {
    if(tags[tag] > result.max) {
      result.max = tags[tag];
    }
    if(tags[tag] < result.min) {
      result.min = tags[tag];
    }
  }
  return result;
}

function calculateClass(count, params) {
  const {min, max} = params;
  const firstClassMaxValue = ( max - min ) * 0.2 + min;
  const secondClassMaxValue = ( max - min ) * 0.4 + min;
  const thirdClassMaxValue = ( max - min ) * 0.6 + min;
  const fourthClassMaxValue = ( max - min ) * 0.8 + min;
  const fifthClassMaxValue = max;
  let classValue;
  if(count <= firstClassMaxValue) {
    classValue = 1;
  } else if(count <= secondClassMaxValue) {
    classValue = 2;
  } else if(count <= thirdClassMaxValue) {
    classValue = 3;
  } else if(count <= fourthClassMaxValue) {
    classValue = 4;
  } else if(count <= fifthClassMaxValue) {
    classValue = opts.cloudClassCount;
  }
  return `${opts.cloudClassPrefix}${classValue}`;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);

  /* START LOOP: for every article: */
  for(const article of articles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(opts.articleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const tags = article.getAttribute('data-tags');
    /* split tags into array */
    const tagsArray = tags.split(' ');
    /* START LOOP: for each tag */
    for(const tag of tagsArray) {
    /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
      /* add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
      /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      }  else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = tagsWrapper.innerHTML + html;
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(opts.tagsListSelector);

  const tagsParams = calculateParams(allTags);
  console.log('tagsParams:', tagsParams);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
  /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += ` <a class="${calculateClass(allTags[tag], tagsParams)}" href="#">${tag}</a> `;
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.hash;
  /* make a new constant "tag" and extract tag from the "href" constant */
  const [,tag] = href.split(`#tag-`);
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll(opts.articleTagsSelector+ ' a.active');
  /* START LOOP: for each active tag link */
  for(let activeLink of activeTagLinks){
    /* remove class active */
    activeLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll(`a[href^="${href}"]`);
  /* START LOOP: for each found tag link */
  for(let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const links = document.querySelectorAll(opts.articleTagsSelector+ ' a');
  /* START LOOP: for each link */
  for(let link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){
  /* [NEW] create a new variable allTags with an empty object */
  let allAuthors = {};
  /* find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);

  /* START LOOP: for every article: */
  for(const article of articles) {
    /* find author wrapper */
    const authorWrapper = article.querySelector(opts.articleAuthorSelector);
    /* make html variable with empty string */
    let html = '';
    /* get author from data-author attribute */
    const author = article.getAttribute('data-author');
    /* generate HTML of the link */
    const linkHTML = '<a href="#author-' + author + '">' + author + '</a>';
    /* add generated code to html variable */
    html = html + linkHTML;
    /* insert HTML of all the links into the author wrapper */
    authorWrapper.innerHTML = authorWrapper.innerHTML + html;
    /* END LOOP: for every article: */
    /* [NEW] check if this link is NOT already in allauthors */
    if(!allAuthors[author]) {
      /* [NEW] add author to allAuthors object */
      allAuthors[author] = 1;
    }  else {
      allAuthors[author]++;
    }
  }
  /* [NEW] find list of Authors in right column */
  const authorList = document.querySelector(opts.authorsListSelector);

  const authorsParams = calculateParams(allAuthors);
  console.log('AuthorsParams:', authorsParams);

  /* [NEW] create variable for all links HTML code */
  let allAuthorsHTML = '';

  /* [NEW] START LOOP: for each author in allAuthors: */
  for(let author in allAuthors){
  /* [NEW] generate code of a link and add it to allAuthorsHTML */
    allAuthorsHTML += ` <a class="${calculateClass(allAuthors[author], authorsParams)}" href="#">${author}</a> `;
  }
  /* [NEW] END LOOP: for each author in allAuthors: */

  /*[NEW] add HTML from allAuthorsHTML to authorList */
  authorList.innerHTML = allAuthorsHTML;
}

generateAuthors();


function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "author" and extract author from the "href" constant */
  const [,author] = href.split(`#author-`);
  /* find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll(opts.articleAuthorSelector+ ' a.active');
  /* START LOOP: for each active author link */
  for(let activeLink of activeAuthorLinks){
    /* remove class active */
    activeLink.classList.remove('active');
  /* END LOOP: for each active author link */
  }
  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll(`a[href^="${href}"]`);
  /* START LOOP: for each found author link */
  for(let authorLink of authorLinks) {
    /* add class active */
    authorLink.classList.add('active');
  /* END LOOP: for each found author link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  /* find all links to authors */
  const authors = document.querySelectorAll(opts.articleAuthorSelector + ' a');
  /* START LOOP: for each author */
  for(let author of authors){
    /* add authorClickHandler as event listener for that author */
    author.addEventListener('click', authorClickHandler);
  /* END LOOP: for each author */
  }
}

addClickListenersToAuthors();