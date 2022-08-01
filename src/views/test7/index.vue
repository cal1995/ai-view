<template>
	<div style="height: 2000px">
		<div style="width: 520px; margin: 0 auto">
			<Input
			type="textarea"
			ref="textarea"
			id="textarea-box"
			class="filter-row-item"
			v-model="text"
			:autosize="{ minRows: 4, maxRows: 6 }"
			@on-change="onChange($event, text)"
			@click.native="onClick($event)"
			@on-keydown="onKeydown($event)"
			@on-keyup="onKeyup($event)"
			@on-focus="onFocus"
			@on-blur="onBlur"
			@on-clear="clear"
			clearable
			></Input>
			<div
			id="dorpdown-wrapper"
			class="select-dropdown innerbox"
			v-show="showSelectDropdown"
			>
				<ul>
					<li
					v-for="(row, i) in dropdownList"
					:key="row.id"
					:class="['select-item', i === selectIndex ? 'active' : '']"
					@click.stop="replaceText(row)"
					>
						<span
						v-for="(item, index) in row.wordMap"
						:class="['keyword', row.keywordMap.indexOf(`${index}`) > -1 ? 'active-keyWord' : '']"
						:key="index"
						>{{ item.word }}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {

  data() {
    return {
      text: '',
      keyWord: '',
      pointerIndex: 0,
      showSelectDropdown: false,
      list: [
        {
          name: 'New York',
          id: 'New York'
        },
        {
          name: 'London',
          id: 'London'
        },
        {
          name: 'Sydney',
          id: 'Sydney'
        },
        {
          name: 'Ottawa',
          id: 'Ottawa'
        },
        {
          name: 'Paris',
          id: 'Paris'
        },
        {
          name: 'Canberra',
          id: 'Canberra'
        },
        {
          name: 'Canada',
          id: 'Canada'
        },
        {
          name: 'America',
          id: 'America'
        },
        {
          name: 'England',
          id: 'England'
        },
        {
          name: 'Beijing',
          id: 'Beijing'
        }
      ],
      dropdownList: [],
      dropdownPosition: {
        x: '',
        y: ''
      },
      selectIndex: 0
    };
  },
  methods: {
    resetTootips() {
      this.keyWord = '';
      this.selectIndex = 0;
      this.showSelectDropdown = false;
    },
    matchSymbol(str) {
      const pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、\s\r\n]/im;
      if (pattern.test(str)) { // 如果包含特殊字符返回true
        return true;
      }
      return false;
    },
    onClick(event) {
      const e = window.event || event;
      this.pointerIndex = this.getCursorPos(e.target);
      this.resetTootips();
    },
    onKeydown(event) {
      const e = window.event || event;
      const { keyCode } = e;
      // enter
      if (keyCode === 13 && this.showSelectDropdown) {
        e.preventDefault();
        const i = this.selectIndex;
        const item = this.dropdownList[i];
        this.replaceText(item);
      }
      // ↑ ↓
      if ((keyCode === 38 || keyCode === 40) && this.showSelectDropdown) {
        e.preventDefault();
        const { length } = this.dropdownList;
        const dom = document.getElementById('dorpdown-wrapper');
        if (keyCode === 40 && this.selectIndex < length - 1) {
          this.selectIndex += 1;
          if (this.selectIndex >= 3) {
            dom.scrollTop += 32;
          }
        }
        if (keyCode === 38 && this.selectIndex > 0) {
          this.selectIndex -= 1;
          dom.scrollTop -= 32;
        }
      }
      // backspace
      if (keyCode === 8) {
        const { length } = this.keyWord;
        this.keyWord = this.keyWord.substring(0, length - 1);
        if (this.keyWord === '') {
          this.resetTootips();
        } else {
          this.filterText('');
        }
      }
      // space
      if (keyCode === 32) {
        this.resetTootips();
      }
    },
    onKeyup(event) {
      const e = window.event || event;
      this.pointerIndex = this.getCursorPos(e.target);
      // console.log('pointerIndex', this.pointerIndex);
    },
    onChange(event, value) {
      const e = event || window.event;
      const key = e.data || '';
      if (!value) {
        this.keyWord = '';
      }
      if (this.matchSymbol(key) || key === '') {
        // this.resetTootips()
        return;
      }
      this.filterText(key);
    },
    filterText(key) {
      let matchStr = '';
      if (this.keyWord === '') {
        matchStr = `${key}`;
      } else {
        matchStr = `${this.keyWord}${key}`;
      }
      let regStr = '';
      matchStr.split('').forEach((word) => {
        regStr = `${regStr}(${word})\\w*`;
      });
      const reg = new RegExp(regStr, 'i');
      const list = Object.assign([], this.list).map((row) => {
        const { name, id } = row;
        const wordMap = name.split('').map(word => ({
          word,
          keyWord: false
        }));
        return {
          name,
          id,
          wordMap
        };
      });
      this.dropdownList = list.filter(row => reg.test(row.name)).map((row) => {
        const { name } = row;
        const arr = reg.exec(name);
        let startIndex = arr.index;
        const keywordMap = [];
        arr.forEach((item, i) => {
          if (i > 0) {
            const index = name.indexOf(item, startIndex);
            keywordMap.push(`${index}`);
            startIndex = index + 1;
          }
        });
        return Object.assign(row, { keywordMap });
      });
      if (this.dropdownList.length === 0) {
        this.resetTootips();
      } else {
        this.keyWord = matchStr;
        this.showSelectDropdown = true;
      }
    },
    getCursorPos(ctrl) {
      let pos = 0;
      if (document.selection) {
        // IE
        const range = document.selection.createRange();
        range.moveStart('character', -ctrl.value.length);
        pos = range.text.length;
      } else if (ctrl.selectionStart || ctrl.selectionStart === '0') {
        // firefox
        pos = ctrl.selectionStart;
      }
      return pos;
    },
    setCaretPosition(ctrl, pos) {
      // 设置光标位置函数
      if (ctrl.setSelectionRange) {
        ctrl.focus(); // 获取焦点
        ctrl.setSelectionRange(pos, pos); // 设置选定区的开始和结束点
      } else if (ctrl.createTextRange) {
        const range = ctrl.createTextRange(); // 创建选定区
        range.collapse(true); // 设置为折叠,即光标起点和结束点重叠在一起
        range.moveEnd('character', pos); // 移动结束点
        range.moveStart('character', pos); // 移动开始点
        range.select(); // 选定当前区域
      }
    },
    replaceText(row) {
      const { keyWord, text, pointerIndex } = this;
      const conut = pointerIndex - keyWord.length;
      const matchedStr = text.substring(0, conut);
      const matchingStr = text.substr(conut);
      this.text = `${matchedStr}${matchingStr.replace(keyWord, row.name)}`;
      this.resetTootips();
      this.$nextTick(() => {
        const dom = document.getElementById('textarea-box').querySelector('textarea');
        this.setCaretPosition(dom, `${matchedStr}${row.name}`.length);
      });

      // this.setCaretPosition(dom, 0);
      // this.$refs.textarea.focus();
      // this.pointerIndex = `${matchedStr}${row.name}`.length;
    },
    clear() {
      this.keyWord = '';
    },
    onFocus() {
      this.watchDodument();
    },
    onBlur() {
      setTimeout(() => {
        this.resetTootips();
      }, 300);
    },
    watchDodument() {
      const context = this;
      const fn = function (e) {
        // let showSelectDropdown = false;
        let parent = e.target.parentNode;
        while (parent.className) {
          if (parent.className.indexOf('filter-row-item') > -1) {
            // showSelectDropdown = true;
            context.dropdownPosition = {
              x: e.clientX,
              y: e.clientY
            };
            break;
          }
          parent = parent.parentNode;
        }
        // context.showSelectDropdown = context.showSelectDropdown
        //   ? showSelectDropdown
        //   : context.showSelectDropdown;
        // if (!context.showSelectDropdown) {
        //   context.keyWord = "";
        // }
      };
      document.addEventListener('click', fn, { once: true });
    }
  }
};
</script>

<style lang="scss" scoped>

.select-dropdown {
  // min-width: 203px;
  width: 220px;
  // position: fixed;
  will-change: top, left;
  transform-origin: center bottom;
  height: 120px;
  z-index: 100;
  background: white;
  max-height: 150px;
  overflow: auto;
  margin: 5px 0;
  padding: 5px 0;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
}
.select-item {
  margin: 0;
  line-height: normal;
  padding: 7px 16px;
  clear: both;
  color: #515a6e;
  font-size: 14px !important;
  white-space: nowrap;
  list-style: none;
  cursor: pointer;
  &.active,
  &:hover {
    background: #f3f3f3;
  }
  .active-keyWord {
    font-weight: bold;
    color: blue
  }
}
</style>
