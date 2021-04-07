/*
 * @Author: your name
 * @Date: 2021-04-07 11:05:11
 * @LastEditTime: 2021-04-07 11:06:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \alunchen\vue-component\src\components\helloworld\index.js
 */
import HelloWorld from './HelloWorld'

HelloWorld.install = (Vue) => {
    Vue.component(HelloWorld.name, HelloWorld)
}

export default HelloWorld