const arr = [
  [0.88, 0.11],
  [0.22, 0.66, 0.05, 0.05],
  [0.50, 0.22, 0.16, 0.11],
  [0.27, 0.27, 0.11, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05],
  [0.05, 0.22, 0.16, 0.33, 0.11, 0.11],
];

const { total } = analyze(arr)[0];

console.log(convert(arr, {
  total,
}));

function analyze(arr) {
  return unique(max([].concat(...arr.map(ele => calculate(ele)))));
}

function convert(arr, {
  total = 0,
} = {}) {
  return arr.map(row => {
    return row.map(col => Math.round(col * total));
  });
}

function max(arr) {
  return arr.filter(ele => {
    return ele.divisible === Math.max(...arr.map(ele => ele.divisible));
  });
}

function unique(arr) {
  return arr.filter((ele, i) => {
    return i === arr.findIndex(obj => {
      return JSON.stringify(obj) === JSON.stringify(ele);
    });
  });
}

function range(min, max) {
  return Array.from(
    {
      length: max - min + 1,
    },
    (_, i) => min + i,
  );
}

function calculate(arr, {
  min = 11,
  max = 30,
} = {}) {
  return this.range(min, max).map((i) => {
    const total = arr.reduce((acc, ele) => {
      const value = Math.round(ele * i);
      return acc + value;
    }, 0);
    const divisible = arr.reduce((acc, ele) => {
      const value = Math.round(ele * i % 1 * 10) / 10 % 1 === 0 ? 1 : 0;
      return acc + value;
    }, 0);
    const exceed = total > max;
    return {
      total: exceed ? 0 : total,
      divisible: exceed ? 0 : divisible,
    };
  });
}
