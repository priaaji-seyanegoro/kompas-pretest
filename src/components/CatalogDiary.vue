<template>
  <div class="mt-3 col-md-3 col-sm-6 center">
    <div class="card" style="width: 30rem;">
      <div class="card-body">
        <h5 class="card-title" style="text-align: left; font-weight: bold">
          {{ formattedDate }}
        </h5>
        <table class="table-style">
          <tbody>
            <tr v-for="list in sortingDatas" :key="list.id">
              <td class="size"> {{list.jam}} </td>
              <td>{{ list.nama }}</td>
              <td>Rp {{ list.pengeluaraan.toLocaleString('id-ID') }}</td>
            </tr>
            <tr class="bold">
              <th></th>
              <th style="text-align: right">Total</th>
              <th>Rp {{ totalAmount.toLocaleString('id-ID') }}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  name: "CatalogDiary",
  props: ["item"],
  setup(props) {
    const compare = (a, b) => {
      if (a.tanggal < b.tanggal) {
        return -1;
      }
      if (a.tanggal > b.tanggal) {
        return 1;
      }
      return 0;
    };
    const sortingDatas = computed(() => {
      const items = [...props.item.items];
      return items.sort(compare);
    });

    const totalAmount = computed(() => {
      const total = props.item.items.reduce((currentTotal, item) => {
        return item.pengeluaraan + currentTotal;
      }, 0);
      return total;
    });

    const formattedDate = computed(() => {
      const months = {
        0: "Januari",
        1: "Februari",
        2: "Maret",
        3: "April",
        4: "Mei",
        5: "Juni",
        6: "Juli",
        7: "Agustus",
        8: "September",
        9: "Oktober",
        10: "November",
        11: "Desember",
      };
      const d = new Date(props.item.date);
      const date = d.getDate(); // 23
      const monthName = months[d.getMonth()];
      const formatted = `${date} ${monthName}`;
      return formatted;
    });

    return {
      sortingDatas,
      totalAmount,
      formattedDate
    };
  },
};
</script>

<style>
.center {
  text-align: center;
}
th {
  font-size: 14px;
}
td {
  font-size: 14px;
  border-bottom: 1px solid #999;
  border-top: 1px solid #999;
}
.bold {
  border-top: 2px solid #444;
}
.table-style {
  width: 100%;
  text-align: left;
  
}
</style>
