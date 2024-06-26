class $PanicError extends Error {}
function $panic() {
  throw new $PanicError();
}
function $unsafe_bytes_blit(dst, dst_offset, src, src_offset, src_length) {
  if (src === dst && src_offset < dst_offset) {
    for (let i = src_length - 1; i >= 0; i--) {
      dst[dst_offset + i] = src[src_offset + i];
    }
  } else {
    for (let i = 0; i < src_length; i++) {
      dst[dst_offset + i] = src[src_offset + i];
    }
  }
}
function $makebytes(a, b) {
  const arr = new Uint8Array(a);
  for (let i = 0; i < a; i++) {
    arr[i] = b;
  }
  return arr;
}
let $output_buffer = '';
function $flush_output() {
  if ($output_buffer.length > 0) {
    console.log($output_buffer);
  }
}
function $print_string(a) {
  $output_buffer += a;
  const last_nl_index = $output_buffer.lastIndexOf('\n');
  if (last_nl_index >= 0) {
    console.log($output_buffer.slice(0, last_nl_index));
    $output_buffer = $output_buffer.slice(last_nl_index + 1);
  }
}
function $unsafe_bytes_sub_string(bytes, byte_offset, byte_length) {
  return new TextDecoder("utf-16").decode(bytes.slice(byte_offset, byte_offset + byte_length));
}
function moonbitlang$core$builtin$$abort$0$(msg) {
  $panic();
}
function moonbitlang$core$builtin$$abort$1$(msg) {
  return $panic();
}
function moonbitlang$core$builtin$$abort$2$(msg) {
  return $panic();
}
function moonbitlang$core$int$$Int$to_byte(self) {
  return self & 255;
}
function moonbitlang$core$bytes$$Bytes$unsafe_blit(_tmp$0, _tmp$1, _tmp$2, _tmp$3, _tmp$4) {
  $unsafe_bytes_blit(_tmp$0, _tmp$1, _tmp$2, _tmp$3, _tmp$4);
}
function moonbitlang$core$bytes$$Bytes$blit(self, dst_offset, src, src_offset, length) {
  const e1 = (dst_offset + length | 0) - 1 | 0;
  const e2 = (src_offset + length | 0) - 1 | 0;
  const len1 = self.length;
  const len2 = src.length;
  if (length < 0 || (dst_offset < 0 || (e1 >= len1 || (src_offset < 0 || e2 >= len2)))) {
    moonbitlang$core$builtin$$abort$0$("blit out of bounds");
    return;
  } else {
    moonbitlang$core$bytes$$Bytes$unsafe_blit(self, dst_offset, src, src_offset, length);
    return;
  }
}
function moonbitlang$core$bytes$$Bytes$make(len, init) {
  return $makebytes(len, init);
}
function moonbitlang$core$bytes$$Bytes$make$46$init$46$default() {
  return 0;
}
function moonbitlang$core$builtin$$Buffer$grow_if_necessary(self, required) {
  let enough_space = self.bytes.length;
  if (enough_space <= 0) {
    enough_space = 1;
  }
  while (true) {
    if (enough_space < required) {
      enough_space = Math.imul(enough_space, 2) | 0;
      continue;
    } else {
      break;
    }
  }
  if (enough_space !== self.bytes.length) {
    const new_bytes = moonbitlang$core$bytes$$Bytes$make(enough_space, moonbitlang$core$bytes$$Bytes$make$46$init$46$default());
    moonbitlang$core$bytes$$Bytes$blit(new_bytes, 0, self.bytes, 0, self.len);
    self.bytes = new_bytes;
    return;
  } else {
    return;
  }
}
function moonbitlang$core$builtin$$println$1$(input) {
  $print_string(moonbitlang$core$int$$Int$to_string(input));
  $print_string("\n");
}
function moonbitlang$core$builtin$$println$2$(input) {
  $print_string(input);
  $print_string("\n");
}
function moonbitlang$core$bytes$$Bytes$unsafe_sub_string(_tmp$5, _tmp$6, _tmp$7) {
  return $unsafe_bytes_sub_string(_tmp$5, _tmp$6, _tmp$7);
}
function moonbitlang$core$bytes$$Bytes$sub_string(self, byte_offset, byte_length) {
  return byte_length < 0 || (byte_offset < 0 || (byte_offset + byte_length | 0) > self.length) ? moonbitlang$core$builtin$$abort$2$("sub_string out of bound") : moonbitlang$core$bytes$$Bytes$unsafe_sub_string(self, byte_offset, byte_length);
}
function moonbitlang$core$builtin$$Buffer$to_string(self) {
  return moonbitlang$core$bytes$$Bytes$sub_string(self.bytes, 0, self.len);
}
function moonbitlang$core$bytes$$Bytes$set_utf16_char(self, offset, value) {
  const code = value;
  if (code < 65536) {
    self[offset] = moonbitlang$core$int$$Int$to_byte(code & 255);
    self[offset + 1 | 0] = moonbitlang$core$int$$Int$to_byte(code >>> 8 | 0);
    return 2;
  } else {
    if (code < 1114112) {
      const hi = code - 65536 | 0;
      const lo = hi >>> 10 | 0 | 55296;
      const hi$2 = hi & 1023 | 56320;
      self[offset] = moonbitlang$core$int$$Int$to_byte(lo & 255);
      self[offset + 1 | 0] = moonbitlang$core$int$$Int$to_byte(lo >>> 8 | 0);
      self[offset + 2 | 0] = moonbitlang$core$int$$Int$to_byte(hi$2 & 255);
      self[offset + 3 | 0] = moonbitlang$core$int$$Int$to_byte(hi$2 >>> 8 | 0);
      return 4;
    } else {
      return moonbitlang$core$builtin$$abort$1$("Char out of range");
    }
  }
}
function moonbitlang$core$builtin$$Buffer$write_char(self, value) {
  moonbitlang$core$builtin$$Buffer$grow_if_necessary(self, self.len + 4 | 0);
  const inc = moonbitlang$core$bytes$$Bytes$set_utf16_char(self.bytes, self.len, value);
  self.len = self.len + inc | 0;
}
function moonbitlang$core$builtin$$Buffer$new(size_hint) {
  const initial = size_hint < 1 ? 1 : size_hint;
  const bytes = moonbitlang$core$bytes$$Bytes$make(initial, moonbitlang$core$bytes$$Bytes$make$46$init$46$default());
  return { bytes: bytes, len: 0, initial_bytes: bytes };
}
function moonbitlang$core$builtin$$Buffer$new$46$size_hint$46$default() {
  return 0;
}
function moonbitlang$core$builtin$$to_string$46$write_digits$3$(buf, num) {
  const num2 = num / 10 | 0;
  if (num2 !== 0) {
    moonbitlang$core$builtin$$to_string$46$write_digits$3$(buf, num2);
  }
  const n = num % 10 | 0;
  moonbitlang$core$builtin$$Buffer$write_char(buf, (n < 0 ? 0 - n | 0 : n) + 48 | 0);
}
function moonbitlang$core$int$$Int$to_string(self) {
  const buf = moonbitlang$core$builtin$$Buffer$new(moonbitlang$core$builtin$$Buffer$new$46$size_hint$46$default());
  if (self < 0) {
    moonbitlang$core$builtin$$Buffer$write_char(buf, 45);
  }
  moonbitlang$core$builtin$$to_string$46$write_digits$3$(buf, self);
  return moonbitlang$core$builtin$$Buffer$to_string(buf);
}
function debugdemo$$fizzbuzz(n) {
  let _tmp$8 = 0;
  while (true) {
    const i = _tmp$8;
    if (i < n) {
      if ((i % 3 | 0) === 0 && (i % 5 | 0) === 0) {
        moonbitlang$core$builtin$$println$2$("FizzBuzz");
      } else {
        if ((i % 3 | 0) === 0) {
          moonbitlang$core$builtin$$println$2$("Fizz");
        } else {
          if ((i % 5 | 0) === 0) {
            moonbitlang$core$builtin$$println$2$("Buzz");
          } else {
            moonbitlang$core$builtin$$println$1$(i);
          }
        }
      }
      _tmp$8 = i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
(() => {
  debugdemo$$fizzbuzz(100);
})();
$flush_output();
//# sourceMappingURL=debugdemo.js.map
