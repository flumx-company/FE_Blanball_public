<template>
  <div class="b-events-page">
    <ContextMenu
      v-if="isContextMenuActive"
      :client-x="contextMenuX"
      :client-y="contextMenuY"
      :menu-text="mockData.menu_text"
      @close-modal="isContextMenuActive = false"
    />
    <div class="b-events-page__main-body">
      <div class="b-events-page__header-block">
        <div class="b-events-page__left-part">
          <div class="b-events-page__title">{{ $t('events.title') }}</div>
          <div class="b-events-page__subtitle">{{ $t('events.subtitle') }}</div>
          <div class="b-events-page__event-switcher">
            <div
              class="b-events-page__general-events"
              @click="switchEvents"
            >
              {{ $t('events.general-events') }}
            </div>
            <div
              class="b-events-page__my-events"
            >
              {{ $t('events.my-events') }}
            </div>
          </div>
        </div>
        <div class="b-events-page__right-part">
          <GreenBtn
            :text="$t('buttons.create-event')"
            :width="168"
            :icon="'../../../assets/img/plus.svg'"
            :height="40"
            @click-function="goToCreateEvent"
          />
        </div>
      </div>

      <div class="b-events-page__main-search-block">
        <SearchBlockEvents
          :sport-type-dropdown="mockData.sport_type_dropdown"
          :gender-dropdown="mockData.gender_dropdown"
          :cities-dropdown="mockData.cities_dropdown"
        />
        <div class="b-events-page__my-events-block" ref="scrollComponent">
          <MyEventCard
            v-for="card of eventCards"
            :key="card.id"
            :card="card"
            @card-right-click="myCardRightClick"
          />
        </div>
      </div>
    </div>

  <RightSidebar />
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'
import dayjsUkrLocale from 'dayjs/locale/uk'
import { useI18n } from 'vue-i18n'

import GreenBtn from '../../../components/GreenBtn.vue'
import Dropdown from '../../../components/Dropdown.vue'
import InputComponent from '../../../components/InputComponent.vue'
import ContextMenu from '../../../components/ContextMenuModal.vue'
import EventCard from '../../../components/event-components/EventCard.vue'
import SmallLoader from '../../../components/SmallLoader.vue'
import SearchBlockEvents from '../../../components/SearchBlockEvents.vue'
import MyEventCard from '../../../components/MyEventCard.vue'
import RightSidebar from '../../../components/RightSidebar.vue'

import CONSTANTS from '../../../consts/index'

import {ROUTES} from '../../../router'

import { API } from "../../../workers/api-worker/api.worker";

const COLORS = {
  green: '#148581',
  grey: '#DFDEED',
}

export default {
  name: 'EventsPage',
  components: {
    GreenBtn,
    Dropdown,
    InputComponent,
    ContextMenu,
    EventCard,
    SmallLoader,
    SearchBlockEvents,
    MyEventCard,
    RightSidebar,
  },
  setup() {
    const scrollComponent = ref(null)
    const currentPage = ref(null)
    const totalPages = ref(null)
    const route = useRoute()
    const router = useRouter()
    const eventCards = ref([])
    const { t } = useI18n()
    const isLoaderActive = ref(false)
    const contextMenuX = ref(null)
    const contextMenuY = ref(null)
    const isContextMenuActive = ref(false)

    const mockData = computed(() => {
      return {
        event_cards: CONSTANTS.event_page.event_cards,
        my_events: CONSTANTS.event_page.my_events,
        sport_type_dropdown: CONSTANTS.event_page.sport_type_dropdown,
        gender_dropdown: CONSTANTS.event_page.gender_dropdown,
        cities_dropdown: CONSTANTS.event_page.cities_dropdown,
        calendar: CONSTANTS.event_page.calendar,
        menu_text: CONSTANTS.event_page.menu_text,
      }
    })

    function switchEvents() {
      router.push(ROUTES.APPLICATION.EVENTS.absolute)
    }

    function getDate(date) {
      return dayjs(date).locale(dayjsUkrLocale).format('D MMMM')
    }
    function getTime(time) {
      return dayjs(time).locale(dayjsUkrLocale).format('HH:mm')
    }

    function getCards() {
      if (currentPage.value < totalPages.value) {
        currentPage.value = currentPage.value + 1
        isLoaderActive.value = true
        API.EventService.getAllEvents(currentPage.value).then((res) => {
          eventCards.value.push(
            ...res.data.results.map(handlingIncomeData)
          )
          isLoaderActive.value = false
        })
      }
    }
    function handlingIncomeData(item) {
      return {
        ...item,
        date: getDate(item.date_and_time),
        time: getTime(item.date_and_time),
        labels: [
          item.type,
          item.gender === 'Man' ? t('events.men') : t('events.women'),
          item.need_form
            ? t('events.need-uniform')
            : t('events.do-not-need-uniform'),
        ],
      }
    }
    function handleScroll() {
      const element = scrollComponent.value
      const difference = element.scrollHeight - element.offsetHeight

      if (element.scrollTop === difference) {
        getCards()
      }
    }

    function myCardRightClick(e) {
      console.log('click')
      contextMenuX.value = e.clientX
      contextMenuY.value = e.clientY
      isContextMenuActive.value = true
    }

    function goToEventPage() {
      router.push('/application/events/3')
    }

    function goToCreateEvent() {
      console.log('first')
      router.push('/application/events/create')
    }

    onMounted(() => {
      scrollComponent.value.addEventListener('scroll', handleScroll)
      currentPage.value = 1
      totalPages.value = route.meta.eventData.total_pages
      eventCards.value = route.meta.eventData.data.results.map(handlingIncomeData)
    })

    onUnmounted(() => {
      if (scrollComponent.value) {
        scrollComponent.value.removeEventListener('scroll', handleScroll)
      }
    })

    return {
      scrollComponent,
      eventCards,
      isLoaderActive,
      mockData,
      myCardRightClick,
      goToEventPage,
      goToCreateEvent,
      switchEvents,
      isContextMenuActive
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'v-calendar/dist/style.css';
.b-events-page {
  display: grid;
  grid-template-columns: 1fr 256px;
  grid-gap: 28px;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
  .b-events-page__main-body {
    height: 90vh;
    overflow-y: scroll;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none; /* for Chrome, Safari, and Opera */
    }
    .b-events-page__header-block {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .b-events-page__left-part {
        .b-events-page__title {
          font-family: 'Exo 2';
          font-style: normal;
          font-weight: 700;
          font-size: 22px;
          line-height: 32px;
          color: #262541;
          margin-bottom: 4px;
        }
        .b-events-page__subtitle {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 20px;
          color: #575775;
          @media (min-width: 992px) {
            display: none;
          }
        }
        .b-events-page__event-switcher {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 20px;
          text-align: center;
          color: #262541;
          display: flex;
          @media (max-width: 992px) {
            display: none;
          }
          .b-events-page__general-events {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 10px;
            width: 100px;
            height: 28px;
            border-radius: 6px 0px 0px 6px;
            border-top: 1px solid #F0F0F4;
            border-left: 1px solid #F0F0F4;
            border-bottom: 1px solid #F0F0F4;
            cursor: pointer;
          }
          .b-events-page__my-events {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 10px;
            width: 100px;
            height: 28px;
            border-radius: 0px 6px 6px 0px;
            border: 1px solid #148581;
            cursor: pointer;
          }
        }
      }
      .b-events-page__right-part {
        @media (max-width: 992px) {
          display: none;
        }
        a {
          text-decoration: none;
        }
      }
    }
    .b-events-page__main-search-block {
      margin-top: 36px;
      position: relative;
      @media (max-width: 992px) {
        padding: 0;
      }
      .b-events-page__all-events-block {
        position: relative;
        margin-top: 23px;
        height: 76vh;
        overflow: hidden;
        .b-events-page__cards-event-wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          overflow-y: scroll;
          height: 100%;
          -ms-overflow-style: none; /* for Internet Explorer, Edge */
          scrollbar-width: none; /* for Firefox */
          &::-webkit-scrollbar {
            display: none; /* for Chrome, Safari, and Opera */
          }
        }
      }
      .b-events-page__my-events-block {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 23px;
      }
    }
  }
}
</style>