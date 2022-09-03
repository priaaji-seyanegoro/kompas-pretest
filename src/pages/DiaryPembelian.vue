<template>
  <div class="diary-pembelian">
    <h2 class="mt-4">Diari Jajan Februari 2021</h2>
    <p>Pengeluaran Bulan ini Rp {{total.toLocaleString('id-ID')}}</p>
    <ButtonModal />

    <div class="container mb-4">
      <div class="row">
        <CatalogDiary
          class="d-flex justify-content-center"
          v-for="(item, i) in data"
          :key="i"
          :item="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {computed,  defineAsyncComponent, onMounted } from "vue";
import {useStore} from 'vuex'
export default {
  name: "DiaryPembelian",
  components: {
    ButtonModal: defineAsyncComponent(() =>
      import("../components/ButtonModal.vue")
    ),
    CatalogDiary: defineAsyncComponent(() =>
      import("../components/CatalogDiary.vue")
    ),
  },
  props: {},
  setup() {
    const store = useStore();

    const getData = () => {
      store.dispatch('fetchItem')
    }

    const data = computed(() => {
      return store.state.data
    })

     const total = computed(() => {
      return store.state.total
    })

    onMounted(() => {
      getData()
      console.log(store.state.datas)
    })

    return {
      data,
      total
    }
  },
};
</script>

<style scoped>
.center {
  text-align: center;
}
.btn-color {
  background-color: darkblue;
  color: white;
  font-size: 12px;
}
.btn-color:hover {
  border: 1px solid darkblue;
  background-color: white;
  color: darkblue;
  font-size: 12px;
}
.btn-cancel {
  font-size: 12px;
}
.input {
  width: 100%;
}
.widthModal {
  width: 300px;
}
</style>
