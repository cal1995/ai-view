<template>
	<div class="chooser">
		<input
		type="text"
		v-model="value"
		:placeholder="placeholder"
		:maxlength="maxlength"
		:required="required"
		:disabled="disabled"
		:style="chooserStyle"
		autocomplete="off"
		:class="chooserClass"
		@input="handlerInput"
		@keydown="handlerKeydown"
		/>
		<div
		v-show="showPopper"
		class="chooser__popper"
		:style="styles"
		>
			<ul style="max-height:300px; overflow:auto">
				<li
				v-for="(item,index) in result"
				:key="item.ID"
				@click="chooseTarget(item)"
				:class="{'active': selected==index}"
				>
					<img
					:src="`https://dayu.oa.com/avatars/${item.Name.split('(')[0]}/profile.jpg`"
					class="chooser__popper__avatars"
					/>
					<!-- eslint-disable-next-line -->
					<span v-html="item.colorName"></span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
  name: 'SelectInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    maxlength: {
      type: [String, Number],
      default: 100
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    chooserStyle: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 5
    },
    showAvatars: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      realValue: this.value,
      form: {
        includeDimission: false,
        containsstatuslist: '',
        deptlevel: -1,
        depttypeid: -1,
        multiple: this.multiple,
        deptblacklist: '',
        deptwhitelist: '',
        userblacklist: '',
        userwhitelist: '',
        workplaceids: '',
        includeuserlist: '',
        expression: '',
        isfulllocation: 1,
        q: '',
        limit: this.limit,
        timestamp: '1547207436927'
        // callback: 'jQuery33108139155802603963_1547207430239',
      },
      result: [],
      showPopper: false,
      selected: null,
      isUsingChinese: false // 是否使用中文输入法
    };
  },
  computed: {
    styles() {
      const style = {};
      const { value } = this;
      if (!this.$el) {
        return;
      }
      const input = this.$el.children[0];
      const isInput = !this.multiple;
      style.top = `${input.style.top + Math.min((isInput ? (input.offsetHeight) : ((value.length * 7 / input.offsetWidth + 1) * 20)), input.offsetHeight)}px`;
      style.left = `${input.style.left + Math.min((isInput ? (value.length * 7) : ((value.length * 7) % input.offsetWidth)), input.offsetWidth)}px`;
      return style;
    },
    chooserClass() {
      const initClass = 'oc_common form-control form-control-trc wd-100p ';
      const chooserType = `oc_${this.type}chooser`;
      return initClass + chooserType;
    }
  },
  watch: {
    value(val) {
      this.$el.children[0].value = val;
    }
  },
  mounted() {
    this.$el.children[0].value = this.value;
  },
  methods: {
    handleCompositionstart() {
      this.isUsingChinese = true;
    },
    handleCompositionend(event) {
      this.isUsingChinese = false;
      this.coreInput(event);
    },
    coreInput(event, value) {
      const val = value || event.target.value;

      // // 兼容safari下，单个中文输入法的使用
      // if(!this.multiple && this.isUsingChinese && event.data && event.data.length>1){
      //     val = event.data;
      // }
      // console.log(event.target.value)
      // console.log(this.isUsingChinese, event, val);

      this.$emit('on-input', val);

      const currentValue = val.split(';');
      this.form.q = currentValue[currentValue.length - 1];

      if (!this.form.q) {
        this.showPopper = false;
        return;
      }
      // 请求防抖
      const timeout = setTimeout(() => {
        this.getUser().then((data) => {
          const reg = new RegExp(val, 'g');
          if (data.length) {
            this.result = data.map((x) => {
              x.colorName = x.Name.replace(reg, val => `<span style='font-weight: bold;'>${val}</span>`);
              return x;
            });
          } else {
            this.result = data;
          }

          this.showPopper = (this.result && this.result.length > 0);
        })
          .catch((e) => {
            console.warn('[HrcChooser] 拉取用户列表错误:', e || '');
          });
      }, 200);
      clearTimeout(timeout);
    },
    prev() {
      const len = this.result.length;
      if (this.selected == null) {
        this.selected = len - 1;
      } else if (this.selected <= 0) {
        this.selected = len - 1;
      } else {
        this.selected -= 1;
      }
    },
    next() {
      const len = this.result.length;
      if (this.selected == null) {
        this.selected = 0;
      } else if (this.selected >= len - 1) {
        this.selected = 0;
      } else {
        this.selected += 1;
      }
    },
    handlerKeydown(e) {
      const { target } = e;
      if (e.keyCode === 40) { // 向上选择
        this.next();
      } else if (e.keyCode === 38) { // 向下选择
        this.prev();
      } else if (e.keyCode === 13 || e.keyCode === 9) { // enter
        event.preventDefault();
        this.chooseTarget(this.result[this.selected]);
      } else if (e.keyCode === 8) { // BackSpace（退格）
        const preValueArr = this.value.split(';');
        const len = this.value.split(';').length;

        if (preValueArr[len - 1] !== '') {
          return;
        }
        let cursorIndex = this.getCursorPosition(target);
        let realIndex = 0;
        for (let index = 0; index < len; index++) {
          const item = preValueArr[index];
          const offset = (index > 0) ? preValueArr[index - 1].length : 0;
          cursorIndex = cursorIndex - offset - 1;
          if (cursorIndex <= item.length) {
            realIndex = index;
            preValueArr.splice(realIndex, 1);
            target.value = `${preValueArr.join(';')};`;
            return;
          }
        }

        if (!target.value) {
          this.showPopper = false;
        }
      }
    },
    // 获取光标位置
    getCursorPosition (obj) {
      let cursorIndex = 0;
      if (document.selection) {
        // IE Support
        obj.focus();
        const range = document.selection.createRange();
        range.moveStart('character', -obj.value.length);
        cursorIndex = range.text.length;
      } else if (obj.selectionStart || obj.selectionStart === 0) {
        // another support
        cursorIndex = obj.selectionStart;
      }
      return cursorIndex;
    },
    handlerInput(event, value) {
      if (this.isUsingChinese) {
        return;
      }
      this.coreInput(event, value);
    },
    getUser() {
      // eslint-disable-next-line
      const promise = new Promise((resolve, rejects) => {
        try {
          const params = this.objectToQuerystring(this.form);
          // eslint-disable-next-line
          jsonp(`https://hrc.oa.com/v1.1/pages/chooser/data/${this.type}.aspx?${params}`, { timeout: 5000 }, (err, data) => {
            if (err) {
              rejects(err.message);
            } else {
              resolve(data);
            }
          });
        } catch (error) {
          rejects(error.message);
        }
      });
      return promise;
    },
    // 对象转换成Querystring
    objectToQuerystring (obj) {
      return Object.keys(obj).reduce((str, key, i) => {
        let delimiter = '';
        let val = '';
        let copyKey = key;
        delimiter = (i === 0) ? '?' : '&';
        copyKey = encodeURIComponent(key);
        val = encodeURIComponent(obj[key]);
        return [str, delimiter, copyKey, '=', val].join('');
      }, '');
    },
    chooseTarget(item) {
      if (!item) {
        return;
      }
      const target = this.$el.children[0];

      if (this.type === 'dept' && !this.showFullDeptName) {
        const deptArr = item.Name.split('/');
        item.Name = deptArr[deptArr.length - 1];
      }

      if (this.multiple) {
        const currentValue = this.value || '';
        const preValueArr = currentValue.split(';');
        const len = currentValue.split(';').length;
        preValueArr[len - 1] = '';
        target.value = `${preValueArr.join(';') + item.Name};`;
      } else {
        target.value = item.Name;
      }
      this.$emit('on-input', target.value);
      this.selected = null;
      this.showPopper = false;
    }
  }
};
</script>

<style>

</style>
