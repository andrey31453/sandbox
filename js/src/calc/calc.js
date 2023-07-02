import './calc.sass'

{
  const init_calc = () => {
    const calc_node = document.getElementsByClassName('calc')[0]
    if (!calc_node) return

    const calc_button_nodes = [...calc_node.getElementsByClassName('button')]
    const display_node = calc_node.getElementsByClassName('display')[0]

    const button_functions = {
      get_display_value() {
        return display_node.getAttribute('value')
      },

      set_display_value(v) {
        display_node.setAttribute('value', v)
      },

      reset() {
        this.set_display_value('0')
      },

      addition(v) {
        const display_value = this.get_display_value()
        this.set_display_value(display_value + v)
      },

      calc(v) {
        const display_value = this.get_display_value()
        this.set_display_value(eval(display_value))
      },
    }

    const do_button_function = (button_node) => {
      const { function: button_function, value: button_value } =
        button_node.attributes
      button_functions[button_function.value](button_value.value)
    }

    const add_button_listeners = (button_node) => {
      button_node.addEventListener('click', () => {
        do_button_function(button_node)
      })
    }

    const make_calc_button_keys = () => {
      return calc_button_nodes.reduce((button_keys, button_node) => {
        const { key: button_key } = button_node.attributes
        console.log('button_node.attribute.: ', button_key.value)

        const button_function_wrapper = function () {
          return do_button_function(button_node)
        }
        button_keys[button_key.value] = button_function_wrapper

        return button_keys
      }, {})
    }

    calc_button_nodes.forEach(add_button_listeners)

    const calc_button_keys = make_calc_button_keys()

    window.addEventListener('keydown', (e) => {
      if (calc_button_keys[e.key]) calc_button_keys[e.key]()
      console.log('e.key: ', e.key)
    })
  }
  init_calc()
}
