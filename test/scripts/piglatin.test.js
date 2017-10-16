describe('Testing Piglatin app Test Suite', function () {
	var $controller;

	beforeEach(function() {
		module('app');
		inject(function(_$controller_) {
			$controller = _$controller_;
		});
	  });

	it('should convert a test sentence to pig latin', function () {
		var $scope = {};
		$scope.textToConvert = "test sentence";

		var controller = $controller('PigLatin', {
			$scope: $scope
		});
		$scope.convertToPigLatin();

		expect($scope.convertedInput).toBe("esttay entencesay");
	});

	it('should convert a word sentence to pig latin', function () {
		var $scope = {};
		$scope.textToConvert = "testWord";

		var controller = $controller('PigLatin', {
			$scope: $scope
		});
		$scope.convertToPigLatin();

		expect($scope.convertedInput).toBe("estwordtay");
	});

	it('should store multiple words in the previous words array', function () {
		var $scope = {};
		$scope.textToConvert = "first sentence";

		var controller = $controller('PigLatin', {
			$scope: $scope
		});
		$scope.convertToPigLatin();

		$scope.textToConvert = "second sentence";
		$scope.convertToPigLatin();

		expect($scope.convertedInput).toBe("econdsay entencesay");
		expect($scope.previousWords[0]).toBe("irstfay entencesay");
	});
});