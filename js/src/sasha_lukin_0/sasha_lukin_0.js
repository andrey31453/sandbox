import './sasha_lukin_0.sass'

const init_array_1 = [7, 2, -5, 1, 1, -1, 5, -5]
const init_array_2 = [4, 2, 2, 1, 2, -3, 5, -8]

const get_arrays_has_summ = (init_array, k) => {
  const hash = []
  const k_arrays = []
  let arrays_has_summ = 0

  init_array.forEach((elem, array_index) => {
    hash[array_index] = 0

    hash.forEach((_, hash_index) => {
      hash[hash_index] += elem

      if (hash[hash_index] === k) {
        arrays_has_summ++
        k_arrays.push(init_array.slice(hash_index, array_index + 1))
      }
    })
  })

  return {
    arrays_has_summ,
    k_arrays,
  }
}

console.log(get_arrays_has_summ(init_array_1, 5))
console.log(get_arrays_has_summ(init_array_2, 5))
