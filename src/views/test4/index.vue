<template>
	<div style="width: 720px; margin:0 auto; border: 1px solid;height: 520px;">
		<Table
		border
		:columns="columns1"
		:data="data1"
		@on-row-dblclick="rowDblClick"
		@on-cell-click="cellClick"
		>
		</Table>
	</div>
</template>

<script>
import handler from './handler';

const deepClone = t => JSON.parse(JSON.stringify(t));

export default {
  data () {
    return {
      columns1: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address',
          className: 'edit-cell'
        }
      ],
      data1: [
        {
          id: '1',
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          id: '2',
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          id: '3',
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          id: '4',
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ],
      clickCell: {},
      modifying: false,
      originCell: {},
      clickEvt: null
    };
  },
  methods: {
    handlerDom(event) {
      let el = event.target;
      let name;
      while (name !== 'TD') {
        el = el.parentNode;
        name = el.nodeName;
      }
      return el;
    },
    rowDblClick() {
      const { row, column, event } = this.clickCell;
      const dom = this.handlerDom(event);
      this.cellInfoHandler(row, column, dom);
    },
    cellClick(row, column, data, event) {
      this.clickCell = {
        row, column, data, event
      };
    },
    cellInfoHandler(row, column, dom) {
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
      ocell.index = this.data1.findIndex(item => item.id === row.id);
      ocell.copyRow = deepClone(row);
      ocell.originContent = deepClone(div.innerHTML);
      console.log(ocell.originContent);
      ocell.oldVal = oldVal;
      ocell.el = div;
      ocell.property = property;
      div.innerHTML = '';
      console.log(div);
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
      const { data1 } = this;
      const ocell = this.originCell;
      const { oldVal, copyRow, property, el, originContent, index } = ocell;
      console.log(originContent);
      const newVal = copyRow[property];
      if (oldVal === newVal || newVal === '') {
        el.innerHTML = originContent;
      } else {
        // const reg = new RegExp(`${oldVal}(?=\\s<i)`);
        // el.innerHTML = originContent.replace(reg, newVal);
        data1[index][property] = newVal;
        const reg = new RegExp(`${oldVal}(?=<\\/span>)`);
        console.log(reg);
        el.innerHTML = originContent.replace(reg, newVal);
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
