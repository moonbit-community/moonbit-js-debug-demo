fn fizzbuzz(n: Int) -> Unit {
  for i = 0; i < n; i = i + 1 {
      if i % 3 == 0 && i % 5 == 0 {
          trace("FizzBuzz");
      } else if i % 3 == 0 {
          trace("Fizz");
      } else if i % 5 == 0 {
          trace("Buzz");
      } else {
          trace_int(i);
      }
  }
}

fn main {
  fizzbuzz(100);
}

fn trace(x: String) -> Unit = "%trace"
fn trace_int(x: Int) -> Unit = "%trace"
