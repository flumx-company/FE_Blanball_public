<template>
  <div class="b-reset">
    <div class="b-reset__background-tab">
      <img src="../../assets/img/registration-back-tab4.svg" alt="background image tablet" />
    </div>
    <div class="b-reset__background-mob">
      <img src="../../assets/img/registration-back-mob4.svg" alt="background image mobile" />
    </div>
    <div class="b-reset__central-block">
      <div class="b-reset__left-part">
        <Stepper/>
      </div>
      <div class="b-reset__right-part">
        <div class="b-reset__google-play-block">
          <img src="../../assets/img/google-play.svg" alt="" />
          <span>
            {{ $t('reset.load-app') }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Stepper from '../../components/reset-components/Stepper.vue'

export default {
  name: 'reset',
  components: {
    Stepper
  }
}
</script>

<style lang="scss" scoped>
.b-reset {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 576px) and (max-width: 992px) {
    padding-top: 132px;
    overflow: hidden;
  }
  @media (max-width: 576px) {
    padding-top: 140px;
  }
  .b-reset__background-tab {
    display: none;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    @media (min-width: 576px) and (max-width: 992px) {
      display: block;
    }
    img {
      width: 100%;
    }
  }
  .b-reset__background-mob {
    display: none;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    @media (max-width: 576px) {
      display: block;
      width: 100%;
    }
    img {
      width: 100%;
    }
  }
  .b-reset__central-block {
    height: 555px;
    width: 992px;
    display: flex;
    background: #ffffff;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    @media (max-width: 576px) {
      border-radius: 28px 28px 0px 0px;
    }
    .b-reset__ball-big {
      position: absolute;
      width: 80px;
      top: -30px;
      left: -30px;
      @media (min-width: 576px) {
        display: none;
      }
    }
    .b-reset__ball-small {
      position: absolute;
      top: 0;
      right: 0;
      @media (min-width: 576px) {
        display: none;
      }
    }
    @media (min-width: 992px) and (max-width: 1200px) {
      width: 890px;
    }
    @media (min-width: 576px) and (max-width: 992px) {
      width: 464px;
      box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
      border-radius: 8px;
    }
    @media (max-width: 576px) {
      width: 100%;
    }
    .b-reset__left-part {
      width: 432px;
      @media (max-width: 992px) {
        width: 100%;
      }
    }
    .b-reset__right-part {
      background-image: url('../../assets/img/registration-back-4.svg');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      width: 560px;
      position: relative;
      @media (max-width: 992px) {
        display: none;
      }
      .b-reset__google-play-block {
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        color: #575775;
        padding: 24px;
        img {
          margin-right: 12px;
        }
        span {
          width: 280px;
        }
      }
    }
  }
}
</style>