angular
.module('app', [])
.controller('PigLatin', function PigLatinController($scope) {
	$scope.previousWords = [];
	const vowels = ["a", "A", "e", "E", "i", "I", "o", "O", "u", "U"];
	const vowelSuffix = "way";
	const consonantSuffix = "ay";
	$scope.convertedInput;

	$scope.convertToPigLatin = function () {
		let text = $scope.textToConvert.replace(/[^A-Za-z ]/g, '');
		let words = text.split(" ");
		words = words.filter((el) => {return el != "";}); //prevents duplicate spaces being added

		if (text.length != 0) {
			let word;

			let sentence = compileSentence(words);
			if ($scope.convertedInput != undefined) {
				$scope.previousWords.unshift($scope.convertedInput);
			}
			$scope.convertedInput = sentence;
			$scope.textToConvert = '';
		}
	};

	function startsWithVowel(word) {
		return vowels.includes(word.charAt());
	}

	function convertVowel(word) {
		return word + vowelSuffix;
	}

	function convertConsonant(word) {
		let i = indexFirstVowel(word);
		if (i !== undefined) {
			return (word.substring(i, word.length) + word.substring(0, i) + consonantSuffix).toLowerCase();
		} else {
			return (word + consonantSuffix).toLowerCase();
		}
	}

	function indexFirstVowel(word) {
		for (let i = 0; i < word.length; i++) {
			if (vowels.includes(word.charAt(i))) {
				return i;
			}
		}
	}

	function compileSentence(words) {
		var sentence = "";
		words.forEach((word) => {
			if (startsWithVowel(word)) {
				sentence += convertVowel(word);
				sentence += " ";
			} else {
				sentence += convertConsonant(word);
				sentence += " ";
			}
		});
		sentence = sentence.replace(/^[ ]+|[ ]+$/g,'')
		return sentence;
	}
});