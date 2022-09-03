<template>
  <div>
    <button
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#formModal"
    >
      TAMBAH ITEM
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="formModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog widthModal">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Tambah Entry</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitData">
              <label>Nama</label><br />
              <input
                v-model="dataNew.name"
                class="input"
                type="text"
                required
                placeholder="Nasi Uduk"
                onkeydown="return /[a-z A-Z]/i.test(event.key)"
              /><br />
              <label>Harga</label><br />
              <input
                v-model="dataNew.cost"
                class="input"
                type="number"
                placeholder="5000"
                required
              /><br />
              <div class="text-end mt-2">
                <button
                  type="button"
                  class="btn btn-cancel btn-secondary mx-2"
                  data-bs-dismiss="modal"
                >
                  BATAL
                </button>
                <button
                  type="submit"
                  class="btn btn-color"
                  data-bs-dismiss="modal"
                  @click="submitData"
                >
                  KIRIM
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
export default {
  name: "ButtonModal",
  props: {
    msg: String,
  },
  setup() {
    const store = useStore();
    const dataNew = reactive({
      name: "",
      cost: "",
    });

    const resetModal = () => {
      dataNew.name = "";
      dataNew.cost = "";

      return;
    };

    
    const submitData = async () => {
      const time = new Date().toTimeString().slice(0, 8);
      const randomId = "id" + Math.random().toString(16).slice(2)
      const payload = {
        id: randomId, //axios need random id for the request
        jam: time.slice(0, 5),
        tanggal: "19 Februari 2020",
        nama: dataNew.name,
        pengeluaraan: +dataNew.cost,
      };
      console.log("Payload =>", payload);
      await store.dispatch("addEntry", payload).then(() => {
        dataNew.name = "";
        dataNew.cost = "";
      });
    };

    return {
      dataNew,
      submitData,
      resetModal,
    };
  },
};
</script>

<style scoped>
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
