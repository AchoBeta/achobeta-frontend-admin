<script>
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/vue3'

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
      },
    }
  },
}
</script>

<template>
  <FullCalendar day-headers="false" style="width: 100%; height: 100%;" :options="calendarOptions" />
</template>

<style scoped>
.fc .fc-toolbar-title {
  color: red !important;
}

.fc-daygrid-day-frame {
  background-color: aquamarine !important;

}

.fc-theme-standard {
  background-color: #ffffff !important;
}

.fc-daygrid-day.fc-day-today {
  background-color: #dd8484 !important;

}

.fc-daygrid-day-top {
  background-color: #dd8484 !important;
  display: flex !important;
  justify-content: center !important;
}

.fc-daygrid-day-events {
  background-color: #dd8484 !important;

}
</style>
