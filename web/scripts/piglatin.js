angular
.module('app', [])
.controller('PigLatin', function PigLatinController($scope) {
	const vowels = ["a", "A", "e", "E", "i", "I", "o", "O", "u", "U"];
	const punctuation = ['?', '!', '.', ','];
	const vowelSuffix = "way";
	const consonantSuffix = "ay";

	$scope.previousWords = [];
	$scope.convertedInput = '';

	$scope.convertToPigLatin = () => {
		let text = $scope.textToConvert.replace(/[^A-Za-z ,.!?]/g, ''); //strips out potentially harmful characters
		let words = text.split(" ");
		words = words.filter((el) => {return el != "";}); //prevents multiple spaces being added

		if (text.length != 0) {
			let sentence = compileSentence(words);
			$scope.previousWords.unshift($scope.convertedInput);
			$scope.convertedInput = sentence;
			$scope.textToConvert = '';
		}
	};

	$scope.clearLists = () => {
		$scope.previousWords = [];
		$scope.convertedInput = undefined;
	};

	function startsWithVowel(word) {
		return vowels.includes(word.charAt(0));
	}

	function convertVowel(word) {
		let punc = getPunctuation(word);
		if (punc !== '') {
			word = word.substring(0, word.length - 1);
		}
		return word + vowelSuffix + punc;
	}

	function convertConsonant(word) {
		let punc = getPunctuation(word);
		if (punc !== '') {
			word = word.substring(0, word.length - 1);
		}

		let i = indexFirstVowel(word);
		if (i !== undefined) {
			return (word.substring(i, word.length) + word.substring(0, i) + consonantSuffix).toLowerCase() + punc;
		} else {
			return (word + consonantSuffix).toLowerCase() + punc;
		}
	}

	function getPunctuation(word) {
		let punc = '';
		if (punctuation.includes(word.charAt(word.length - 1))) {
			punc = word.charAt(word.length - 1);
		}
		return punc;
	}

	function indexFirstVowel(word) {
		for (let i = 0; i < word.length; i++) {
			if (vowels.includes(word.charAt(i))) {
				return i;
			}
		}
	}

	function compileSentence(words) {
		let sentence = "";
		words.forEach((word) => {
			if (startsWithVowel(word)) {
				sentence += convertVowel(word);
			} else {
				sentence += convertConsonant(word);
			}
			sentence += " ";
		});
		sentence = sentence.replace(/^[ ]+|[ ]+$/g,'')
		return sentence;
	}
});