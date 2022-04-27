
//variable***********************
let form = document.querySelector('#hidenForm'); // all popup form
let items = document.querySelector('#items'); //parent all blocks which will create






//event listeners**********************
    document.querySelector('#hiden-save-btn').addEventListener('click' , addNewNote); // when save btn clicked it will save and show data

    document.querySelector('.addBtn').addEventListener('click' , showPopUpFrom); // when button which there is bottom of document clicked it will show popup form

    document.querySelector('.cancle').addEventListener('click' , hidenPopUpForm); //when X above form clicked it will hiden the popup form

    document.querySelector('#items').addEventListener('click' , selectItem); // we have parent all items here. we can do many thing with this

    document.addEventListener( 'DOMContentLoaded' , showDataAfterLoad ); //when page loaded this function will get data from localstorage and showes in items

    document.querySelector('#const-item').addEventListener('click' , showPopUpFrom); // the coanst item when clicked showes the popup form

    document.querySelector('#cancel-in-see-note').addEventListener('click' , cancelSeeNoteBox); // this function will cancel the see note box
    


//functions*******************************************


// this function will hiden the pop up form when it's cancel btn click
    function hidenPopUpForm(par){
        par.preventDefault();
        form.style.display = 'none';
        form.reset(); //clear values after cancel
    }

// this function will show the pop up form

    function showPopUpFrom(par){
        par.preventDefault();
        form.style.display = 'flex';
    }




    // this function creates a new item element and puts data in that and also save title and content in local storage
    function addNewNote(par){

        par.preventDefault();

        let titleNote = document.querySelector('#hiden-title').value; // title input from popup form
        let contentNote = document.querySelector('#note-content').value; // content input from popup form


        if(titleNote === null || titleNote === '' || contentNote === null || contentNote === ''){
            alert('please enter title and note');
            return;
        }

        // make an item to push notes in
        let item = document.createElement('div'); 
        item.classList = 'item';


        //make title section to show title
        let title = document.createElement('section');
        title.classList = 'item-title';
        title.textContent = titleNote;


        //make seeNote botton to show content at another sheet
        let seeNote = document.createElement('a');
        seeNote.href = '#';
        seeNote.classList = 'see-note';
        seeNote.textContent = 'See Note';



        //make content section to show contents
        let content = document.createElement('section');
        content.classList = 'content';
        content.appendChild(document.createTextNode(contentNote));



        // make cancel button to cancel popup form 
        let cancelBtn = document.createElement('a');
        cancelBtn.classList = 'cancel-btn';
        cancelBtn.href = '#';
        cancelBtn.innerHTML  = '<i class="bi bi-trash3"></i>';



        item.appendChild(title); //give title section to item block
        item.appendChild(seeNote);
        item.appendChild(content); //give content section to item block
        item.appendChild(cancelBtn);
        items.appendChild(item);



        form.style.display = 'none'; // hiden popup form
        form.reset(); //clear values in popup forms inputs  


        addNewNoteToLocalStorage( titleNote  , contentNote); //this function saves data to localstorage

    }





    // this function has permission to all items
    function selectItem(par){
        par.preventDefault();


        //remove item
        if(par.target.classList.contains('cancel-btn')){
            par.target.parentElement.remove(); 
            removeItemFromLocalStorage(par);
        }
        if( par.target.parentElement.classList.contains('cancel-btn')  ){
            par.target.parentElement.parentElement.remove();
            removeItemFromLocalStorage(par); 
        }
        //remove item



        //show box
        if(par.target.classList.contains('see-note')){
            let box = document.querySelector('#see-note');
            box.style.display = 'block';

            box.children[1].textContent = par.target.nextElementSibling.textContent;
        }
        //show box

    }





// this function gets title and content from local storage and return them as array  
    function getDataFromLocalStorage(){

        let = getDataFromLs = localStorage.getItem('NoteBookData');

        if( getDataFromLs === null){
            return [[] , []]; // first parameter is title and second title is content
        }else{
            let parsed = JSON.parse( getDataFromLs );
            return [ parsed[0] , parsed[1] ]; // first parameter is title and second title is content
        }

    }


// this fuction will add data to local storage
    function addNewNoteToLocalStorage( titleNote , contentNote ){


        let getFromLs = getDataFromLocalStorage();

        getFromLs[0].push(titleNote);
        getFromLs[1].push(contentNote);


        localStorage.setItem('NoteBookData' , JSON.stringify(getFromLs) );

    }




    // this function showes data in items after every refersh
    function showDataAfterLoad(){
        let getDataFromLs = getDataFromLocalStorage();

            let titleArray;
            let contentArray;

            titleArray = getDataFromLs[0];
            contentArray = getDataFromLs[1];

            for(let Key in titleArray){
              
              
              
                // make an item to push notes in
                let item = document.createElement('div'); 
                item.classList = 'item';


                //make title section to show title
                let title = document.createElement('section');
                title.classList = 'item-title';
                title.textContent = titleArray[Key];


                //make seeNote botton to show content at another sheet
                let seeNote = document.createElement('a');
                seeNote.href = '#';
                seeNote.classList = 'see-note';
                seeNote.textContent = 'See Note';



                //make content section to show contents
                let content = document.createElement('section');
                content.classList = 'content';
                content.appendChild(document.createTextNode(contentArray[Key]));



                // make cancel button to cancel popup form 
                let cancelBtn = document.createElement('a');
                cancelBtn.classList = 'cancel-btn';
                cancelBtn.href = '#';
                cancelBtn.innerHTML  = '<i class="bi bi-trash3"></i>';



                item.appendChild(title); //give title section to item block
                item.appendChild(seeNote);
                item.appendChild(content); //give content section to item block
                item.appendChild(cancelBtn);
                items.appendChild(item);

            }

 
    }



// this function removes data from local storage

    function removeItemFromLocalStorage(par){
        let getDataFromLs = getDataFromLocalStorage();



        if(par.target.classList.contains('cancel-btn')){

            let title = par.target.parentElement.children[0].textContent;
            let content = par.target.parentElement.children[2].textContent;

            let titleIndex = getDataFromLs[0].indexOf(title);
            let contentIndex = getDataFromLs[1].indexOf(content);

            getDataFromLs[0].splice(titleIndex , 1);
            getDataFromLs[1].splice(contentIndex , 1);

            localStorage.setItem('NoteBookData' , JSON.stringify(getDataFromLs))

        }


        if( par.target.parentElement.classList.contains('cancel-btn')  ){

            let title = par.target.parentElement.parentElement.children[0].textContent;
            let content = par.target.parentElement.parentElement.children[2].textContent;

            let titleIndex = getDataFromLs[0].indexOf(title);
            let contentIndex = getDataFromLs[1].indexOf(content);
            
            getDataFromLs[0].splice(titleIndex , 1);
            getDataFromLs[1].splice(contentIndex , 1);

            localStorage.setItem('NoteBookData' , JSON.stringify(getDataFromLs));

        }
        
    }



    // this function cancels see note box
    function cancelSeeNoteBox(par){
        par.target.parentElement.style.display = 'none';

        par.target.nextElementSibling.textContent = ''; // clear texts in the hiden box
    }

