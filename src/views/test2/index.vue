<template>
	<div id="app">
		<div>
			<Table
			:columns="columns1"
			:data="data1"
			:loading="loading"
			border
			></Table>
			{{ list }}
		</div>
	</div>
</template>

<script>
// ivew table columns sort
let arr = [];
// eslint-disable-next-line
Array.prototype.indexOf = function(val) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === val) {
      return i;
    }
  }
  return -1;
};
// eslint-disable-next-line
Array.prototype.remove = function(val) {
  const index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
export default {
  name: 'App',
  data () {
    const _this = this;
    return {
      showTable: true,
      loading: false,
      list: [],
      columns1: [
        {
          title: 'Name',
          key: 'name',
          renderHeader: (h, params) => {
            // return h('div', params.column.title);
            const i = _this.list.indexOf('name') + 1;
            return h('div', [
              h('span', params.column.title),
              h('span', {
                class: 'ivu-table-sort'
              }, [
                h('i', {
                  class: 'ivu-icon ivu-icon-md-arrow-dropup',
                  on: {
                    click(e) {
                      _this.loading = true;
                      const { classList } = e.target;
                      const nextNode = e.target.nextSibling;
                      if ([...classList].indexOf('on') > -1) {
                        e.target.classList.remove('on');
                        console.log('');
                        arr.remove('name');
                      } else {
                        e.target.classList.add('on');
                        nextNode.classList.remove('on');
                        console.log('name: asc');
                        arr.push('name');
                        arr = arr.filter((val, i, arr) => arr.indexOf(val) === i);
                      }
                      _this.list = arr;
                      console.log('list', _this.list);
                      setTimeout(() => {
                        _this.loading = false;
                      }, 200);
                    }
                  }
                }),
                h('i', {
                  class: 'ivu-icon ivu-icon-md-arrow-dropdown',
                  on: {
                    click(e) {
                      _this.loading = true;
                      const { classList } = e.target;
                      const prevNode = e.target.previousSibling;
                      if ([...classList].indexOf('on') > -1) {
                        e.target.classList.remove('on');
                        console.log('');
                        arr.remove('name');
                      } else {
                        e.target.classList.add('on');
                        prevNode.classList.remove('on');
                        console.log('name: desc');
                        arr.push('name');
                        arr = arr.filter((val, i, arr) => arr.indexOf(val) === i);
                      }
                      _this.list = arr;
                      console.log('list', _this.list);
                      setTimeout(() => {
                        _this.loading = false;
                      }, 200);
                    }
                  }
                })
              ]),
              h('div', `${_this.sortIndex(i)}`)
            ]);
          }
        },
        {
          title: 'Age',
          key: 'age',
          renderHeader: (h, params) => {
            // return h('div', params.column.title);
            const i = _this.list.indexOf('age') + 1;
            return h('div', [
              h('span', params.column.title),
              h('span', {
                class: 'ivu-table-sort'
              }, [
                h('i', {
                  class: 'ivu-icon ivu-icon-md-arrow-dropup',
                  on: {
                    click(e) {
                      _this.loading = true;
                      const { classList } = e.target;
                      const nextNode = e.target.nextSibling;
                      if ([...classList].indexOf('on') > -1) {
                        e.target.classList.remove('on');
                        console.log('');
                        arr.remove('age');
                      } else {
                        e.target.classList.add('on');
                        nextNode.classList.remove('on');
                        console.log('age: asc');
                        arr.push('age');
                        arr = arr.filter((val, i, arr) => arr.indexOf(val) === i);
                      }
                      _this.list = arr;
                      console.log('list', _this.list);
                      setTimeout(() => {
                        _this.loading = false;
                      }, 200);
                    }
                  }
                }),
                h('i', {
                  class: 'ivu-icon ivu-icon-md-arrow-dropdown',
                  on: {
                    click(e) {
                      _this.loading = true;
                      const { classList } = e.target;
                      const prevNode = e.target.previousSibling;
                      if ([...classList].indexOf('on') > -1) {
                        e.target.classList.remove('on');
                        console.log('');
                        arr.remove('age');
                      } else {
                        e.target.classList.add('on');
                        prevNode.classList.remove('on');
                        console.log('age: desc');
                        arr.push('age');
                        arr = arr.filter((val, i, arr) => arr.indexOf(val) === i);
                      }
                      _this.list = arr;
                      console.log('list', _this.list);
                      setTimeout(() => {
                        _this.loading = false;
                      }, 200);
                    }
                  }
                })
              ]),
              h('div', `${_this.sortIndex(i)}`)
            ]);
          }
        },
        {
          title: 'Address',
          key: 'address',
          renderHeader: (h, params) => {
            // return h('div', params.column.title);
            const i = _this.list.indexOf('address') + 1;
            return h('div', [
              h('span', params.column.title),
              h('span', {
                class: 'ivu-table-sort'
              }, [
                h('i', {
                  class: 'ivu-icon ivu-icon-md-arrow-dropup',
                  on: {
                    click(e) {
                      _this.loading = true;
                      const { classList } = e.target;
                      const nextNode = e.target.nextSibling;
                      if ([...classList].indexOf('on') > -1) {
                        e.target.classList.remove('on');
                        console.log('');
                        arr.remove('address');
                      } else {
                        e.target.classList.add('on');
                        nextNode.classList.remove('on');
                        console.log('address: asc');
                        arr.push('address');
                        arr = arr.filter((val, i, arr) => arr.indexOf(val) === i);
                      }
                      _this.list = arr;
                      console.log('list', _this.list);
                      setTimeout(() => {
                        _this.loading = false;
                      }, 200);
                    }
                  }
                }),
                h('i', {
                  class: 'ivu-icon ivu-icon-md-arrow-dropdown',
                  on: {
                    click(e) {
                      _this.loading = true;
                      const { classList } = e.target;
                      const prevNode = e.target.previousSibling;
                      if ([...classList].indexOf('on') > -1) {
                        e.target.classList.remove('on');
                        console.log('');
                        arr.remove('address');
                      } else {
                        e.target.classList.add('on');
                        prevNode.classList.remove('on');
                        console.log('address: desc');
                        arr.push('address');
                        arr = arr.filter((val, i, arr) => arr.indexOf(val) === i);
                      }
                      _this.list = arr;
                      console.log('list', _this.list);
                      setTimeout(() => {
                        _this.loading = false;
                      }, 200);
                    }
                  }
                })
              ]),
              h('div', `${_this.sortIndex(i)}`)
            ]);
          }
        }
      ],
      data1: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ]
    };
  },
  methods: {
    sortIndex(i) {
      let text = '';
      if (i > 0) {
        text = `排序：${i}`;
      }
      return text;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
