import Vue from 'vue';
import Demo from '../../../src/views/Demo.vue';

describe('Demo.vue', () => {
  let vm = null;

  before(() => {
    const Ctor = Vue.extend(Demo);
    vm = new Ctor().$mount();
  });

  it('methods: foo()', () => {
    expect(vm.foo()).to.equal(42);
  });
});
