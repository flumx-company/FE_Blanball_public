<template>
  <div class="b-security">
    <div class="b-security__confidentiality">
      <div class="b-security__title">
        {{ $t('profile.confidentiality') }}
      </div>
      <div class="b-security__subtitle">
        {{ $t('profile.set-personal-details') }}
      </div>
      <div class="b-security__settings-block">
        <div class="b-security__personal-settings">
          <p>{{ $t('profile.phone-number') }}</p>
          <Switcher :id="'phone'" />
        </div>
        <div class="b-security__personal-settings">
          <p>{{ $t('profile.e-mail') }}</p>
          <Switcher :id="'email'" />
        </div>
        <div class="b-security__personal-settings">
          <p>{{ $t('profile.my-feedbacks') }} <span>(Деякі)</span></p>
          <Switcher :id="'feedback'" />
        </div>
      </div>
    </div>
    <div class="b-security__top-table">
      <div class="b-security__title">
        {{ $t('profile.safety') }}
      </div>
      <div class="b-security__subtitle-security">
        {{ $t('profile.change-login&password') }}
      </div>
      <div class="b-security__email-input">
        <InputComponent
          :title="'E-mail'"
          :placeholder="userEmail"
          :title-width="0"
          :outside-title="true"
          :has-icon="true"
          :icon="[sortArrowHorizontal]"
          @icon-click="changeEmailIconClick"
        />
      </div>
      <div class="b-security__change-pass-btn" @click="toggleModal('change_password')">
        {{ $t('profile.change-password') }}
        <img src="../assets/img/lock.svg" alt="" />
      </div>
    </div>
    <div class="b-security__delete-account" @click="toggleModal('delete_acc')">
      {{ $t('profile.delete-account') }}
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import Switcher from '../components/Switcher.vue'
import sortArrowHorizontally from '../assets/img/sort-arrows-horizontal.svg'
import InputComponent from '../components/InputComponent.vue'

export default {
  name: 'SecurityBlock',
  components: {
    Switcher,
    InputComponent
  },
  props: {
    userEmail: {
      type: String,
      default: ''
    }
  },
  emits: ['toggleModal'],
  setup(props, context) {
    const sortArrowHorizontal = computed(() => sortArrowHorizontally)

    function changeEmailIconClick() {
      context.emit('toggleModal')
    }

    return {
      sortArrowHorizontal,
      changeEmailIconClick,
    }
  },
}
</script>

<style lang="scss" scoped>
.b-security {
  background: #ffffff;
  box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
  border-radius: 8px;
  padding: 20px 16px;
  height: fit-content;
  @media (max-width: 768px) {
    width: 100%;
    min-width: 100%;
  }
  @media (min-width: 1200px) {
    width: 320px;
    min-width: 320px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    width: 344px;
    min-width: 344px;
    margin-top: 28px;
  }
  @media (max-width: 992px) {
    width: 100%;
    min-width: 100%;
    order: 3;
    margin-bottom: 10px;
  }
  .b-security__email-input {
    height: 40px;
    margin-bottom: 12px;
    margin-top: 20px;
  }
  .b-security__confidentiality {
    .b-security__title {
      margin-bottom: 4px;
      font-family: 'Exo 2';
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      color: #262541;
    }
    .b-security__subtitle {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 20px;
      color: #575775;
    }
    .b-security__settings-block {
      padding-top: 8px;
      padding-bottom: 8px;
      margin-top: 20px;
      border-top: 1px solid #dfdeed;
      .b-security__personal-settings {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #262541;
        padding: 12px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  .b-security__top-table {
    .b-security__title {
      font-family: 'Exo 2';
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      color: #262541;
    }
    .b-security__subtitle-security {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 20px;
      color: #575775;
    }
    .b-security__change-pass-btn {
      padding-left: 16px;
      padding-right: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      background: #d3f8f7;
      border-radius: 6px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      color: #148783;
      cursor: pointer;
      margin-bottom: 16px;
    }
  }
  .b-security__delete-account {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    text-decoration-line: underline;
    color: #575775;
    text-align: right;
    cursor: pointer;
  }
}
</style>