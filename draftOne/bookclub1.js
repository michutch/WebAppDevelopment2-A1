const chalk         = require('chalk');
const readlineSync  = require('readline-sync');

let reviews = [
    {id: 100001, title: 'The Affair', author: 'Lee Child', markOutOfTen: 4, upvotes: 1},
    {id: 100002, title: 'Never Go Back', author: 'Lee Child', markOutOfTen: 9, upvotes: 4},
    {id: 100003, title: 'The Enemy', author: 'Lee Child', markOutOfTen: 2, upvotes: 2}
];

function remainOnSiteYN() {
    if (readlineSync.keyInYN('Do you want to Remain on Site?'))
        showMenu();
    else
        processExit(0)
}

function getByValue(array, id) {
    var result  = array.filter(function(obj){return obj.id == id;} );
    return result ? result[0] : null; // or undefined
}

function addReview() {

    //Randomly generate an id
    let id = Math.floor((Math.random() * 10000000) + 1);

    let currentSize = reviews.length;
    let review = {};

    review.id=id;
    review.upvotes=1;

    review.title=readlineSync.question('Enter Book Title=>>');
    review.author=readlineSync.question('Enter Author Name=>>');
    review.markOutOfTen=readlineSync.question('Enter Your Mark Out Of Ten=>>');

    reviews.push(review);

    if((currentSize + 1) == reviews.length)
        console.log('Review Added!!!!');
    else
        console.log('Review NOT Added!!!!!');

}

function findReview() {
    let id = readlineSync.question('Enter Review ID=>>');

    let review = getByValue(reviews,id);

    if(review != null)
        console.log(review);
    else
        console.log('Review NOT Discovered');

}

function eliminate(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
        array.splice(index, 1);
    }
}

function deleteReview() {

    console.log(reviews);
    let id = readlineSync.question('Enter Review ID to Delete=>>');

    let review = getByValue(reviews,id);

    if (review != null){
        eliminate(reviews,review);
        console.log(reviews);
    }
    else
        console.log('REVIEW NOT ELIMINATED');

}

function showMenu() {

    let choice;

    let options = ['Create A Review', 'Show All Reviews', 'Discover A Review', 'Cancel A Review'];

    console.log('\x1Bc'); // Clear the Screen
    console.log(chalk.bold('----- THE COTTAGE CLUB BOOK REVIEW -----'));
    console.log('');
    choice = readlineSync.keyInSelect(options, chalk.yellow.bold('Select your Preference?'));

    if(choice+1 == 1)
        addReview();
    else if(choice+1 == 2)
        console.log(reviews);
    else if(choice+1 == 3)
        findReview();
    else if(choice+1 == 4)
        deleteReview();
    else
        return process.exit(0);

    remainOnSiteYN();


}

showMenu();