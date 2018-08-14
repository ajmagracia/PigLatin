piglatin.js, piglatin.html, and piglatin.css compose the version Sarah, Sophia, and I did in class, and remain unchanged in this repository (besides switching the background source from a file to a url). piglatin2.js, piglatin2.html, and piglatin2.css are the most current versions of the code, and were updated solely by me.

These are the rules I have applied to the translator:

1. If the word starts with a vowel, add "way" to the end of the word. If the word starts with "y", the following letter must be a consonant for this to apply (e.g. "Yvette").
2. If the word does not start with a vowel, all letters before the first vowel are shifted to the end of the word (in the same order), and "ay" is added to the end of the resulting word. If the word starts with "y", the following letter must be a vowel for this to apply.
3. If the word does not start with a vowel, if the first vowel is part of a "qu" combination, the "u" is included in the shift mentioned in the previous rule.
4. If the word contains no letters, or simply contains a number, nothing happens. This is personal preference because I think applying Pig Latin to something like '11am' or 'C3PO' looks ridiculous.

In addition, there is code in place to keep punctuation and capitalization the same as far as their locations relative to the words. I.e. if you copy and paste a paragraph found on the web into the translator, the only real change should be the words themselves (though mid-word punctuation moves with the letters). Try it out and you'll see.
