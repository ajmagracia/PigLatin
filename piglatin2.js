//TODO: functionality for words in all capitals to retain the capitalization

function pigLatin() {
  var string = document.getElementById('input').value;
  //create array to store pig latin'd string, and variables to hold punctuation
  var newArray = [] //for pig latin'd string
  var keepStart //for beginning punctuation
  var endStart //for end punctuation
  //split string into individual words
  let splitString = string.split(" ")

  function pigLatined(string) {
    //run the following on each member of the supplied string (now an individual word), and save in newArray
    newArray = string.map(function (string) {
      //check for punctuation and remove it if there (at the beginning or end of the word)
      var noPunc = checkPunctuation(string)
      //check if the word was originally capitalized and store the result (true/false) for later
      var rememberCaps = /[A-Z]/.test(noPunc[0])
      //pig latin the word
      var latined = transform(noPunc)
      //fix the caps
      var capsFixed = fixCaps(latined, rememberCaps)
      //put the punctuation back
      var punctFixed = fixPunct(capsFixed)
      //return the final product
      return punctFixed
    })
    //join newArray into a string
    let joined = newArray.join(" ")
    //return the string for use outside function
    return joined
  }

  //This function checks if a string begins or ends with punctuation, removes said punctuation (if any), and stores said punctuation (if any) to put it back after transformation
  function checkPunctuation(string) {
    //this regex looks for the first alphanumeric (basically non symbol)
    let letterStart = /\w/
    //this looks for any amount of symbols at the end of a word
    let endPunct = /\W*$/
    //gives the index of the first letter (if any)
    let testLetter = string.search(letterStart)
    //slices from the index to the end (removing all beginning non-alphanumerics)
    let noStartPunct = string.slice(testLetter)
    //slices from the beginning to the index (keeping only beginning non-alphanumerics)
    keepStart = string.slice(0, testLetter)
    //test for end symbols on the string with its beginning symbols removed and returns index of the first end symbol
    let testEndPunct = noStartPunct.search(endPunct)
    //slices from the beginning to the index (all that is left now is alphanumerics)
    let noPunct = noStartPunct.slice(0, testEndPunct)
    //slices from the index to the end (keeping the end symbols)
    keepEnd = noStartPunct.slice(testEndPunct)
    //returns the remaining letters-only string
    return noPunct
  }

  //this function checks which pig latin rule to apply and applies it
  function transform(string) {
    //this regex looks for all vowels, capitalized or not
    let vowels = /[aeiouyAEIOUY]/
    //gives the index of the first vowel
    let firstVowel = string.search(vowels)
    //if the first vowel is a y and it is followed by a vowel, slice after the y, swap positions, and add 'ay'
    if (/^[yY][aeiou]+/.test(string)) {
      var transformed = string.slice(firstVowel + 1).concat(string.slice(0, firstVowel + 1)).concat('ay')
      //if the first vowel is the first letter (including y followed by a consonant, e.g. 'Yvette'), just add 'way'
    } else if (firstVowel === 0) {
      var transformed = string.concat('way')
      //if the first vowel is a u and the preceeding letter is a q (both not case-sensitive), slice after the u, swap positions, and add 'ay'
    } else if (/[uU]/.test(string[firstVowel]) && /[qQ]/.test(string[firstVowel - 1])) {
      var transformed = string.slice(firstVowel + 1).concat(string.slice(0, firstVowel + 1)).concat('ay')
      //if there is no letter in the string or if the string contains a number, do nothing
      //personal preference because I think applying Pig Latin to '11am' or 'C3PO' looks ridiculous
    } else if (!/[a-zA-z]/.test(string) || /\d/.test(string)) {
      var transformed = string
      //otherwise just slice until the vowel, swap positions, and add 'ay'
    } else {
      var transformed = string.slice(firstVowel).concat(string.slice(0, firstVowel)).concat('ay')
    }
    //return the result of the transformation
    return transformed
  }

  //this function takes a string and a boolean set previously (which noted whether the word was originally capitalized or not), and recapitalizes
  //the code should be self-explanitory
  function fixCaps(string, wasCap) {
    if (wasCap) {
      let lower = string.toLowerCase()
      let splitLower = [...lower]
      splitLower[0] = splitLower[0].toUpperCase()
      var fixedCaps = splitLower.join("")
    } else {
      var fixedCaps = string
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
  //displays the result in the text box on the webpage
  document.getElementById('output').value = result;

}