<template>
  <div class="b-small-event-card">
    <div class="b-small-event-card__close">&times;</div>
    <div class="b-small-event-card__top-line">
      <div class="b-small-event-card__icon-pic">
        <img src="../assets/img/hands-shake.svg" alt="" />
      </div>
      <div class="b-small-event-card__text-data">
        <div class="b-small-event-card__top-line b_small_event_card_name">
          {{ $t('events.friendly-match') }}
        </div>
        <div class="b-small-event-card__bottom-line">
          <div class="b-small-event-card__time">12:00 – 14:00</div>
          <div class="b-small-event-card__date">
            16 {{ $t('events.months.June') }}
          </div>
        </div>
      </div>
    </div>
    <div class="b-small-event-card__address">
      <img src="../assets/img/location-point.svg" alt="" />
      <p>Запоріжжя, Центральна, стадіон «Торпеда»</p>
    </div>
    <div class="b-small-event-card__labels">
      <div class="b-small-event-card__label">{{ $t('events.football') }}</div>
      <div class="b-small-event-card__label">{{ $t('events.men') }}</div>
      <div class="b-small-event-card__label">...</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.b-small-event-card {
  position: relative;
  width: 100%;
  background: #ffffff;
  border: 1px solid #dfdeed;
  border-radius: 6px;
  padding: 10px 12px;
  margin-bottom: 16px;
  .b-small-event-card__close {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 20px;
    cursor: pointer;
  }
  .b-small-event-card__top-line {
    display: flex;
    align-items: center;
    .b-small-event-card__text-data {
      margin-left: 8px;
      .b-small-event-card__name {
        font-family: 'Exo 2';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 16px;
        color: #262541;
      }
      .b-small-event-card__bottom-line {
        display: flex;
        align-items: center;
        margin-top: 4px;
        .b-small-event-card__time {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          text-align: right;
          color: #575775;
          margin-right: 21px;
        }
        .b-small-event-card__date {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 16px;
          text-align: right;
          color: #262541;
        }
      }
    }
  }
  .b-small-event-card__address {
    display: flex;
    background: #fafafa;
    padding: 0px 4px;
    margin-top: 4px;
    img {
      margin-right: 5px;
    }
    p {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      color: #575775;
      border-radius: 4px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
  .b-small-event-card__labels {
    display: flex;
    align-items: center;
    margin-top: 12px;
    .b-small-event-card__label {
      margin-right: 4px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      color: #575775;
      padding: 0px 8px;
      border: 1px solid #efeff6;
      border-radius: 100px;
    }
  }
}
</style>