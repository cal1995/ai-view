import HelloWorld from './components/helloworld';
import SelectInput from './components/selectinput';

const components = [HelloWorld, SelectInput];

const install = (Vue) => {
  if (install.installed) {
    return;
  }
  //
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
  //
  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }
};
console.log('test');
export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  //
  HelloWorld,
  SelectInput
};
