<template>
  <div 
    class="b-dropdown"
    :style="dropdownStyle"
    >
    <div 
      v-if="isOpened"
      class="b-dropdown__back-layer"
      @click="toggleDropdown"
    ></div>
    <div v-if="outsideTitle" class="b-dropdown__outer-title">
      <span>{{mainTitle}}</span>
    </div>
    <div v-if="outsideTitleLeft" class="b-dropdown__outer-title-left">
      <span>{{outsideTitleLeft}}</span>
    </div>
    <div v-if="insideTitle" class="b-dropdown__inner-title">
      <span>{{mainTitle}}</span>
    </div>
    <div ref="wrapper" class="b-dropdown__current-wrapper">
      <div class="b-dropdown__drop-current" @click="toggleDropdown">
        <slot name="drop-icon"></slot>
        <div class="b-dropdown__current-name">{{currentValue}}</div>
        <div class="b-dropdown__arrow-down">
          <img src="../assets/img/arrow-down-background.svg" alt="">
        </div>
      </div>
      <ul 
        v-if="isOpened" 
        :style="ulStyle"
      >
        <li 
          v-for="item of options"
          :key="item.id"
          @click="setNewValue(item.value)"
        >
          {{item.value}}
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  name: 'dropdown-component',
  props: {
    insideTitle: {
      type: Boolean,
      default: false
    },
    outsideTitle: {
      type: Boolean,
      default: false
    },
    outsideTitleLeft: {
      type: String,
      default: ''
    },
    mainTitle: {
      type: String,
      default: 'Title'
    },
    options: {
      type: Array,
      default: () => []
    },
    width: {
      type: Number,
      default: null
    },
    height: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      currentWindowWidth: null,
      isOpened: false,
      currentValue: this.options[0].value
    }
  },
  computed: {
    dropdownStyle() {
      return {
        width: this.width ? this.width + 'px' : '100%',
        height: this.height ? this.height + 'px' : '38px',
      }
    },
    ulStyle() {
      return {
        top: this.height + 'px',
        width: this.currentWindowWidth + 'px'
      }
    }
  },
  mounted() {
    this.currentWindowWidth = this.$refs.wrapper.clientWidth
    this.$emit('new-value', this.options[0].value)
  },
  methods: {
    toggleDropdown() {
      this.isOpened = !this.isOpened
    },
    setNewValue(val) {
      this.currentValue = val
      this.$emit('new-value', val)
      this.isOpened = !this.isOpened
    }
  }
}
</script>

<style lang="scss" scoped>
  .b-dropdown {
    width: 100%;
    border: 1px solid #DFDEED;
    border-radius: 6px;
    display: flex;
    position: relative;
    .b-dropdown__back-layer {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 998;
    }
    .b-dropdown__outer-title {
      height: 16px;
      background: linear-gradient(180deg, #F9F9FC 0%, #FFFFFF 100%);
      border-radius: 4px;
      position: absolute;
      top: -8px;
      left: 8px;
      z-index: 1;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      color: #262541;
      display: flex;
      justify-content: center;
      align-items: center;

      &-left {
        padding: 0px 2px;
        position: absolute;
        top: -8px;
        right: 5px;
        background: #EFEFF6;
        border-radius: 4px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: #A8A8BD;
      }
    }
    .b-dropdown__inner-title {
      width: 108px;
      min-width: 108px;
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      color: #575775;
      background: #fff;
      border-radius: 6px 0 0 6px;
      border-right: 1px solid #DFDEED;
      display: flex;
      align-items: center;
      span {
        text-align: left;
        padding-left: 12px;
      }
    }
    .b-dropdown__current-wrapper {
      height: 100%;
      width: 100%;
      .b-dropdown__drop-current {
        display: flex;
        flex-basis: 100%;
        padding: 0 12px;
        justify-content: space-between;
        align-items: center;
        user-select: none;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 24px;
        color: #262541;
        height: 100%;
      }
    }
    ul {
      width: 100%;
      background: #fff;
      border-right: 1px solid #DFDEED;
      border-left: 1px solid #DFDEED;
      border-bottom: 1px solid #DFDEED;
      z-index: 999;
      position: absolute;
      li {
        list-style: none;
        padding: 2px 12px;
        background: #fff;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 24px;
        color: #262541;
        &:hover {
          background: rgba(47, 32, 255, 0.795);
          color: #fff;
        }
      }
    }
  }
</style>