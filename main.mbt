fn fizzbuzz(n: Int) -> Unit {
  for i = 0; i < n; i = i + 1 {
      if i % 3 == 0 && i % 5 == 0 {
          println("FizzBuzz");
      } else if i % 3 == 0 {
          println("Fizz");
      } else if i % 5 == 0 {
          println("Buzz");
      } else {
          println(i);
      }
  }
}

fn main {
  fizzbuzz(100);
}
