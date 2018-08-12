//TODO: Get it to work

function pigLatin() {
  var string = document.getElementById('input').value;
  //create array to store pig latin'd string, and variables to hold punctuation
  var newArray = [] //for pig latin'd string
  var keepStart //for beginning punctuation
  var endStart //for end punctuation
  //split string into individual words
  let splitString = string.split(" ")

  function pigLatined(string) {
    //run the following on each member of the supplied string (now an individual word),
    string.forEach(function (string) {
      //check for punctuation and remove it if there (at the beginning or end of the word)
      var noPunc = checkPunctuation(string)
      //check if the word was originally capitalized and store the result (true/false) for later
      var rememberCaps = /[A-Z]/.test(noPunc[0])
      //pig latin the word
      var latined = transform(noPunc)
      //fix the caps
      var capsFixed = fixCaps(latined, rememberCaps)
      //return the punctuation
      var punctFixed = fixPunct(capsFixed)
      //add the word to newArray
      newArray.push(punctFixed)
    })
    //join newArray into a string
    let joined = newArray.join(" ")
    //return the string for use outside function
    return joined
  }
  //This function checks if a string begins or ends with punctuation, removes said punctuation (if any), and stores said punctuation (if any) to put it back after transformation
  function checkPunctuation(string) {
    let letterStart = /\w/
    let endPunct = /\W*$/
    let testLetter = string.search(letterStart)
    let noStartPunct = string.slice(testLetter)
    keepStart = string.slice(0, testLetter)
    let testEndPunct = noStartPunct.search(endPunct)
    let noPunct = noStartPunct.slice(0, testEndPunct)
    keepEnd = noStartPunct.slice(testEndPunct)
    return noPunct
  }

  function transform(string) {
    let vowels = /[aeiouyAEIOUY]/
    let firstVowel = string.search(vowels)
    if (/^[yY][aeiou]+/.test(string)) {
      var transformed = string.slice(firstVowel + 1).concat(string.slice(0, firstVowel + 1)).concat('ay')
    } else if (firstVowel === 0) {
      var transformed = string.concat('way')
    } else if (/[uU]/.test(string[firstVowel]) && /[qQ]/.test(string[firstVowel - 1])) {
      var transformed = string.slice(firstVowel + 1).concat(string.slice(0, firstVowel + 1)).concat('ay')
    } else if (!/[a-zA-z]/.test(string) || /\d/.test(string)) {
      var transformed = string
    } else {
      var transformed = string.slice(firstVowel).concat(string.slice(0, firstVowel)).concat('ay')
    }
    return transformed
  }

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

  function fixPunct(string) {
    return keepStart.concat(string).concat(keepEnd)
  }
  //NOTE: THIS IS THE FUNCTION CALL
  var result = pigLatined(splitString)
  // console.log(result)
  //NOTE: Method 1
  // window.alert(result)
  //NOTE: Method 2, see html
  document.getElementById('output').value = result;

}