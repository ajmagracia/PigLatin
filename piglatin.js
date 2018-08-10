//TODO: Math.min, check punctuation before?, higher order-ify, spread operator?

function pigLatin() {
  var string = document.getElementById('input').value;
  var pigLatined = function(string) {
    //create array to store pig latin'd string
    let newArray = []
    //turn string into all lowercase letters for indexOf
    let lowerString = string.toLowerCase()
    // console.log('lowerString: ' + lowerString)
    //split string into individual words
    let splitString = lowerString.split(" ")
    // console.log('splitString: ' + splitString)
    //run the following on each member of lowerString
    splitString.forEach(function(string) {
      // console.log('The word the function is working on now is string: ' + string)
      //create variables for each vowel with the value of that vowel's indexOf
      let a = string.indexOf('a')
      let e = string.indexOf('e')
      let i = string.indexOf('i')
      let o = string.indexOf('o')
      let u = string.indexOf('u')
      //if the first letter is not a y, but the first vowel is a y, include its indexOf
      if (string.indexOf('y') != 0) {
        var y = string.indexOf('y')
        //otherwise assign a -1 to keep it from actualVowels
      } else {
        var y = -1
      }
      //store indexes in array
      let vowels = [a, e, i, o, u, y]
      // console.log('vowels: ' + vowels)
      //remove vowels (index) that don't exist
      let actualVowels = vowels.filter(vowel => {
        return vowel >= 0
      })
      // console.log('actualVowels: ' + actualVowels)
      //sort actual vowels (index)
      let sortedVowels = actualVowels.sort()
      // console.log('sortedVowels: ' + sortedVowels)
      //assign the first vowel's index and the previous index for ease of use in writing logic
      let sliceVowel = actualVowels[0]
      // console.log('sliceVowel: ' + sliceVowel)
      let qCheck = actualVowels[0] - 1
      // console.log('qCheck: ' + qCheck)
      //create rules
      //if the first vowel is the first letter of the word, just add "way" to the end
      if (sliceVowel === 0) {
        var transformed = string.concat('way')
        //if the first vowel is a u and the preceding letter is a q, move all letters until and including "u" to the end and add "ay"
      } else if (string.charAt(sliceVowel) === 'u' && string.charAt(qCheck) === 'q') {
        var transformed = string.slice(sliceVowel + 1).concat(string.slice(0, sliceVowel + 1)).concat('ay')
        //otherwise move all letters until the first vowel to the end and add "ay"
      } else {
        var transformed = string.slice(sliceVowel).concat(string.slice(0, sliceVowel)).concat('ay')
      }
      // console.log('transformed: ' + transformed)
      //make sure punctuation remain at end of words
      if (transformed.includes(".")) {
        //get index of period for splicing
        let period = transformed.indexOf(".")
        // console.log('period: ' + period)
        //split the word into an array of letters
        let splitWord = transformed.split("")
        // console.log('splitWord: ' + splitWord)
        //use the splice array method to remove period
        splitWord.splice(period, 1)
        //add a period to the end of the array
        let fixedPeriod = splitWord.concat(".")
        // console.log('fixedPeriod' + fixedPeriod)
        //join the array
        let joinedFix = fixedPeriod.join("")
        // console.log('joinedFix: ' + joinedFix)
        //push to new array
        newArray.push(joinedFix)
        //repeat for commas
      } else if (transformed.includes(",")) {
        let comma = transformed.indexOf(",")
        let splitWord = transformed.split("")
        splitWord.splice(comma, 1)
        let fixedComma = splitWord.concat(",")
        let joinedFix = fixedComma.join("")
        newArray.push(joinedFix)
      } else if (transformed.includes("?")) {
        let question = transformed.indexOf("?")
        let splitWord = transformed.split("")
        splitWord.splice(question, 1)
        let fixedQuestion = splitWord.concat("?")
        let joinedFix = fixedQuestion.join("")
        newArray.push(joinedFix)
        //otherwise just push the word
      } else if (transformed.includes("!")) {
        let exclaim = transformed.indexOf("!")
        let splitWord = transformed.split("")
        splitWord.splice(exclaim, 1)
        let fixedExclaim = splitWord.concat("!")
        let joinedFix = fixedExclaim.join("")
        newArray.push(joinedFix)
        //otherwise just push the word
      } else {
        newArray.push(transformed)
      }
    })
    //Capitalize the first letter of the supplied string
    //split the first word into an array of individual letters
    let firstWordSplit = newArray[0].split("")
    // console.log('newArray: ' + newArray)
    // console.log('newArray[0]: ' + newArray[0])
    // console.log('firstWordSplit: ' + firstWordSplit)
    //replace the first letter with its capital
    firstWordSplit[0] = firstWordSplit[0].toUpperCase()
    // console.log('firstWordSplit: ' + firstWordSplit)
    //replace the first word of newArray with its capitalized vesion
    newArray[0] = firstWordSplit.join("")
    // console.log('newArray[0]: ' + newArray[0])

    //Check for words that finish with a period and capitalize the next word (see above code)
    for (i = 0; i < newArray.length - 1; i++) {
      if (newArray[i].includes(".") || newArray[i].includes("?") || newArray[i].includes("!")) {
        let letters = newArray[i + 1].split("")
        letters[0] = letters[0].toUpperCase()
        newArray[i + 1] = letters.join("")
      }
    }
    //join newArray into a string
    // console.log('newArray: ' + newArray)
    let joined = newArray.join(" ")
    // console.log('joined: ' + joined)
    //return the string for use outside function
    return joined
  }
  var result = pigLatined(string)
  //NOTE: Method 1
  window.alert(result)
  //NOTE: Method 2, see html
  // document.getElementById('output').value = result;
}