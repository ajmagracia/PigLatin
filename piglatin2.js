//TODO: add functionality for single non-word letters (e.g. I got a D)

function pigLatin() {
  var string = document.getElementById('input').value;
  //create array to store pig latin'd string, and variables to hold punctuation
  var newArray = [] //for pig latin'd string
  var keepStart //for punctuation at the beginning of the word
  var endStart //for punctuation at the end of the word
  //split string into individual words
  let splitString = string.split(" ")

  function pigLatined(string) {
    //run the following on each member of the supplied string (now an individual word), and save in newArray
    newArray = string.map(function (string) {

      var noPunc = checkPunctuation(string) //check for punctuation and remove it if there (at the beginning or end of the word)

      var latined = transform(noPunc) //pig latin the word

      var capsFixed = fixCaps(noPunc, latined) //fix the caps

      var punctFixed = fixPunct(capsFixed) //put the punctuation back

      return punctFixed //return the final product
    })
    return newArray.join(" ") //join newArray into a string and return
  }

  //This function checks if a string begins or ends with punctuation, removes said punctuation (if any), and stores said punctuation (if any) to put it back after transformation
  function checkPunctuation(string) {

    let letterStart = /\w/ //this regex looks for the first alphanumeric (basically non symbol)

    let endPunct = /\W*$/ //this looks for any amount of symbols at the end of a word

    let testLetter = string.search(letterStart) //index of first letter

    let noStartPunct = string.slice(testLetter) //no start-of-word symbols

    keepStart = string.slice(0, testLetter) //start-of-word symbols

    let testEndPunct = noStartPunct.search(endPunct) //index of the first end symbol

    keepEnd = noStartPunct.slice(testEndPunct) //End-of-word symbols

    return noStartPunct.slice(0, testEndPunct) //no symbols
  }

  //this function checks which pig latin rule to apply and applies it
  function transform(string) {

    let vowels = /[aeiouyAEIOUY]/ //this regex looks for all vowels, capitalized or not

    let firstVowel = string.search(vowels) //gives the index of the first vowel


                  //NOTE: The following two rules apply to words that start with vowels
                  //if the first vowel is a y and it is followed by a vowel or an apostrophe, slice after the y, swap positions, and add 'ay'
    if (/^[yY][aeiou']+/.test(string)) {
      var transformed = string.slice(firstVowel + 1).concat(string.slice(0, firstVowel + 1)).concat('ay')

                  //if the first vowel is the first letter (including y followed by a consonant, e.g. 'Yvette'), just add 'way'
    } else if (firstVowel === 0) {
      var transformed = string.concat('way')

                  //NOTE: The following rules apply to words that start with consonants as well as the general exception
                  //if the first vowel is a u and the preceeding letter is a q (both not case-sensitive), slice after the u, swap positions, and add 'ay'
    } else if (/[uU]/.test(string[firstVowel]) && /[qQ]/.test(string[firstVowel - 1])) {
      var transformed = string.slice(firstVowel + 1).concat(string.slice(0, firstVowel + 1)).concat('ay')

                  //NOTE: General exception rule:
                  //if there is no letter in the string or if the string contains a number, do nothing
                  //personal preference because I think applying Pig Latin to '11am' or 'C3PO' looks ridiculous
    } else if (!/[a-zA-z]/.test(string) || /\d/.test(string)) {
      var transformed = string

                  //otherwise just slice until the vowel, swap positions, and add 'ay'
    } else {
      var transformed = string.slice(firstVowel).concat(string.slice(0, firstVowel)).concat('ay')

    }
    return transformed //return the result of the transformation
  }

  //this function checks the original capitalization of the word and applies a fix
  function fixCaps(checkString, editString) {

    //if the word originally had no lowercase letters, and is more than one letter long (to account for capital A, I, and O), it completely capitalizes the transformed word
    //this is so the concatenated 'ay' is also capitalized
    if (!/[a-z]/.test(checkString) && checkString.length > 1) {
      var fixedCaps = editString.toUpperCase()

      //if the word was originally a normal capitalized word, the first letter of the word is now the capitalized letter
    } else if (/[A-Z]/.test(checkString[0])) {
      let lower = editString.toLowerCase()
      let splitLower = [...lower]
      splitLower[0] = splitLower[0].toUpperCase()
      var fixedCaps = splitLower.join("")
      //otherwise nothing is changed
    } else {
      var fixedCaps = editString
    }
    return fixedCaps
  }

  //this function simply returns the punctuation that was removed earlier
  function fixPunct(string) {
    return keepStart.concat(string).concat(keepEnd)
  }

  //This is the "real" function call per se
  var result = pigLatined(splitString)
  // console.log(result)
  //NOTE: Method 1
  // window.alert(result)
  //NOTE: Method 2, see html
  document.getElementById('output').value = result; //displays the result in the text box on the webpage
}
