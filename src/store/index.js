import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    total: 0,
    data: [],
  },
  mutations: {
    setTotal(state, payload) {
      let totalCost = 0;
      payload.forEach((el) => {
        totalCost += el.pengeluaraan;
      });
      state.total = totalCost;
    },
    setData(state, payload) {
      const dataPerMonths = [];
      payload.forEach((item) => {
        const createdDate = item.tanggal;
        let flag = false;
        dataPerMonths.find((el) => {
          if (el.date === createdDate) {
            el.items.push(item);
            flag = true;
          }
        });
        if (flag === false) {
          dataPerMonths.push({
            date: createdDate,
            items: [item],
          });
        }
      });
      function compare(a, b) {
        if (a.date < b.date) {
          return 1;
        }
        if (a.date > b.date) {
          return -1;
        }
        return 0;
      }
      dataPerMonths.sort(compare);
      console.log("dataPerMonts => ", dataPerMonths);
      state.data = dataPerMonths;
    },
  },
  actions: {
    fetchItem(context) {
      axios({
        method: "GET",
        url: "http://localhost:3000/detail",
      })
        .then(({ data }) => {
          context.commit("setTotal", data);
          context.commit("setData", data);
          console.log("data =>", data);
        })
        .catch((err) => console.log(err));
    },
    addEntry(context, payload) {
      return axios({
        method: "POST",
        url: "http://localhost:3000/detail",
        data: payload,
      })
        .then(async () => {
          await context.dispatch("fetchItem");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
