// global variables
// adds all li elements with a class of .student-item to a variable
const $studentItem = $(".student-item");

// uses two arguments to determine which page and which students to show
function showPage(page, list) {
    // creates a variable to simplify the if statement in the for loop
    let pageDisplay = page * 10;

    // hides all li elements with a class of .student-item
    $($studentItem).hide();

    // loops through the students in the list argument
    for (let i = 0; i < list.length; i++) {
        // uses the pageNumber to determine a range of 10 students to display
        if (i >= pageDisplay - 10 && i <= pageDisplay - 1) {
            $(list[i]).show();
        }
    }
}

// creates pagination buttons based on the students in the list argument
function appendPageLinks(list) {
    // determine number of pages needed to display all students
    const numOfPages = Math.ceil(list.length / 10);
    // creates a div to contain pagination data
    const $pagination = $(`<div class="pagination"></div>`);
    // creates ul to be appended to a div w/ a class name of pagination
    const $ul = $(`<ul></ul>`);

    // adds the above div and ul to the DOM
    $(".page").append($pagination);
    $(".pagination").append($ul);

    // loops through numOfPages to create the pagination buttons
    for (let i = 1; i <= numOfPages; i++) {
        if (i === 1) {
            // creates a pagination button with a class of active and the number 1 and adds it to the DOM
            let $pageLink = $(`<li><a class="active" href="#">${i}</a></li>`);
            $($ul).append($pageLink);
        } else {
            // creates additional pagination buttons as needed and adds them to the DOM
            let $pageLink = $(`<li><a href="#">${i}</a></li>`);
            $($ul).append($pageLink);
        }
    }

    // creates click event for the pagination links
    $(".pagination a").click(function () {
        // equal to the number of the pagination link that was clicked
        let $pageNumber = $(this).text();

        // calls the showPage function using the number of the above variable as an argument along with the list argument
        showPage($pageNumber, list);

        // removes the class "active" from any other anchor element and adds it the click target
        $(".pagination a").removeClass("active");
        $(this).addClass("active");
    });

    // hides pagination links if there is only one page to display
    if (numOfPages === 1) {
        $(".pagination").hide();
    }
}

// allows users to search for specific students
function searchList() {
    // creates a div and an input field
    const $studentSearch = $(`
        <div class="student-search">
            <input id="input" placeholder="Search for students...">
        </div>
    `);

    // adds the above elements to the DOM
    $(".page-header").append($studentSearch);

    // creates a keyup listener on the input field
    $("#input").keyup(function () {
        // stores the user's search criteria in a variable
        let $searchValue = $("#input").val().toLowerCase();
        // will be used in the for loop if statement
        let $matched;
        // will be set to true if search term matches student list
        let match = false;

        // hides any existing student list or pagination
        $($studentItem).hide();
        $(".pagination").hide();
        // removes element with a class of message
        $(".message").remove();
        
        // loops through original student list
        for (let i = 0; i < $studentItem.length; i++) {
            // stores student names and email in variables
            let $name = $(".student-item h3").eq(i).text();
            let $email = $(".email").eq(i).text();

            // if either of the above variables contains the search term
            if ($name.includes($searchValue) || $email.includes($searchValue)) {
                // add it to the $matched object
                $matched = $($matched).add($($studentItem).eq(i));
                // changed match variable to true
                match = true;
            }
        }

        // if there are no matches to the search term
        if (match === false) {
            // creates a message and adds it to the DOM
            let $message = $(`
                <div class="message">
                    <img src="images/oops.png" alt="Post-it note with oops written on it">
                    <p>Sorry, no students were found with that name or email address.</p>
                </div>
            `);
            $(".page").append($message);
        } else {
            //otherwise
            // call the showPage and appendPageLinks functions using $matched as an argument
            showPage(1, $matched);
            appendPageLinks($matched);
        }

        // if the search term is an empty string
        if ($searchValue === "") {
            // hide any existing student list or pagination
            $($studentItem).hide();
            $(".pagination").hide();
            // call original showPage and appendPageLinks functions to reset page
            showPage(1, $studentItem);
            appendPageLinks($studentItem);
        }
    });
}

// calls the functions on page load
showPage(1, $studentItem);
appendPageLinks($studentItem);
searchList();
