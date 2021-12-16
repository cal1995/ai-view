import Vue from 'vue';

const handlerEl = (el) => {
  const inner = document.createElement('div');
  el.appendChild(inner);
  return inner;
};

const inputRender = (options) => {
  const { el, copyRow, property, value } = options;
  return new Vue({
    el: handlerEl(el),
    data() {
      return {
        value: value || ''
      };
    },
    mounted() {
      this.$refs.xInput.$el.querySelector('input').focus();
    },
    // methods: {
    //   onchange(val) {
    //     console.log(val);
    //   }
    // },
    // eslint-disable-next-line max-len
    // template: `<i-input style="width: 200px;" ref="xInput" class="modifying" v-model="value" @on-change="onChange"></i-input>`,
    render: h => h('div', [
      h('i-input', {
        ref: 'xInput',
        props: {
          value,
          clearable: true
        },
        class: 'modifying',
        style: {
          width: '72px'
        },
        on: {
          input (val) {
            copyRow[property] = val;
          }
        }
      })
    ])
  });
};

const handler = {
  input: inputRender
};

export default handler;
