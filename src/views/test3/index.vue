<template>
	<div style="width: 720px; margin:0 auto; border: 1px solid;height: 520px;">
		<Tabs value="name1">
			<TabPane
			:label="label"
			name="name1"
			>
				标签一的内容
			</TabPane>
			<TabPane
			label="标签二"
			name="name2"
			>
				标签二的内容
			</TabPane>
			<TabPane
			label="标签三"
			name="name3"
			>
				标签三的内容
			</TabPane>
		</Tabs>
	</div>
</template>

<script>
import handler from './handler';
const deepClone = t => JSON.parse(JSON.stringify(t));
export default {
  data () {
    const _this = this;
    return {
      label: h => h('div', [
        h('div', {
          on: {
            dblclick(e) {
              _this.dblClickEvt(e);
            }
          }
        }, '标签一')
        // h('Badge', {
        //   props: {
        //     count: 3
        //   }
        // })
      ]),
      modifying: false,
      originCell: {},
      clickEvt: null
    };
  },
  methods: {
    dblClickEvt(e) {
      console.log(e.target);
      const targetEle = e.target;
      if (targetEle.innerHTML.indexOf('modifying') > -1 ||
          this.modifying) {
        return;
      }
      this.modifying = true;
      const property = 'label';
      const ocell = this.originCell;
      ocell.originContent = deepClone(targetEle.innerHTML);
      ocell.oldVal = deepClone(targetEle.innerText);
      ocell.copyRow = {
        [property]: targetEle.innerText
      };
      ocell.el = targetEle;
      ocell.property = property;
      //
      targetEle.innerHTML = '';
      this.clickEvt = this.bindOutSideEvt();
      const vm = handler.input({
        el: targetEle,
        copyRow: ocell.copyRow,
        property,
        value: ocell.copyRow[property]
      });
      ocell.widget = vm;
    },
    cellInfoHandler(tableData, row, column, dom) {
      const div = dom.querySelector('div');
      if (dom.className.indexOf('edit-cell') < 0 ||
          div.innerHTML.indexOf('modifying') > -1 ||
          this.modifying) {
        return;
      }
      //
      this.modifying = true;
      const property = column.key;
      const oldVal = row[property];
      const ocell = this.originCell;
      ocell.index = tableData.findIndex(item => item.id === row.id);
      ocell.copyRow = deepClone(row);
      ocell.originContent = deepClone(div.innerHTML);
      ocell.oldVal = oldVal;
      ocell.el = div;
      ocell.property = property;
      div.innerHTML = '';
      this.clickEvt = this.bindOutSideEvt();
      const vm = handler.input({
        el: div,
        copyRow: ocell.copyRow,
        property,
        value: ocell.copyRow[property]
      });
      ocell.widget = vm;
    },
    outSideEvt(e) {
      let node = e.target;
      if (this.modifying && node) {
        let inWidget = false;
        while (node) {
          const tn = node.className;
          if (tn &&
              (
                tn.indexOf('modifying') > -1
                // tn.indexOf('modifying') > -1 ||
                // tn.indexOf('el-select-dropdown') > -1 ||
                // tn.indexOf('el-dialog') > -1 ||
                // tn.indexOf('el-picker-panel') > -1
              )
          ) {
            inWidget = true;
          }
          node = node.parentNode;
        }
        if (!inWidget) {
          this.undoCellDBClick();
          this.originCell = {};
        }
      }
    },
    undoCellDBClick() {
      this.modifying = false;
      this.clickEvt.off();
      const ocell = this.originCell;
      const { oldVal, copyRow, property, el, originContent } = ocell;
      const newVal = copyRow[property];
      if (oldVal === newVal || newVal === '') {
        el.innerHTML = originContent;
      } else {
        // const reg = new RegExp(`${oldVal}(?=\\s<i)`);
        // el.innerHTML = originContent.replace(reg, newVal);
        el.innerHTML = newVal;
      }
    },
    bindOutSideEvt() {
      document.addEventListener('click', this.outSideEvt, true);
      return {
        off() {
          document.removeEventListener('click', this.outSideEvt);
        }
      };
    }
  }
};
</script>

<style>

</style>
