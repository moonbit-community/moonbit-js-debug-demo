function debugdemo$$fizzbuzz(n) {
  let _tmp$0 = 0;
  while (true) {
    const i = _tmp$0;
    if (i < n) {
      if ((i % 3 | 0) === 0 && (i % 5 | 0) === 0) {
        console.log("FizzBuzz");
      } else {
        if ((i % 3 | 0) === 0) {
          console.log("Fizz");
        } else {
          if ((i % 5 | 0) === 0) {
            console.log("Buzz");
          } else {
            console.log(i);
          }
        }
      }
      _tmp$0 = i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
(function () {
  debugdemo$$fizzbuzz(100);
}());
//# sourceMappingURL=debugdemo.js.map
