<template>
  <div class="preferencesGrid">
    <div class="header">
      <button @click="goBack()">
        Volver atras
      </button>
      <div class="route">
        <div class="icon">
          <fontawesome icon="database" />
        </div>
        <div class="label">
          Base de datos
        </div>
      </div>
    </div>
    <div class="body">
      <div class="container">
        <div class="settings" v-loading="isLoading">
          <!-- Is this instance a server -->
          <div class="preference">
            <div class="label">
              Es servidor:
            </div>
            <div class="switch">
              <el-switch
                v-model="data['isServer']"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <!-- Path to Systel FDB -->
          <div v-if="data['isServer']" class="preference">
            <div class="label">
              Systel Path:
            </div>
            <div class="switch">
              <el-input
                v-model="data['systel']"
                placeholder="Ingresar path" />
            </div>
          </div>
          <!-- Server IP -->
          <div v-if="!data['isServer']" class="preference">
            <div class="label">
              Server IP:
            </div>
            <div class="switch">
              <el-input
                v-model="data['host']"
                placeholder="Ingresar IP" />
            </div>
          </div>
        </div>
        <div class="bottom">
          <button @click="save()">
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { settings as types } from "@/vuexTypes";

export default Vue.extend({
  name: "app-settings",
  mounted() {
    this.$store.dispatch(types.loadDatabase).then(() => {
      this.data = { ...this.database };
    });
  },
  data: () => ({
    data: {} as any
  }),
  computed: mapState({
    isLoading: (state: any) => state.Settings.loading,
    database: (state: any) => state.Settings.database
  }),
  methods: {
    goBack() {
      this.$router.replace({ path: "/settings" });
    },
    save() {
      this.$store.dispatch(types.saveDatabase, this.data).then(() => {
        this.$notify({
          title: "Se han guardado los cambios con exito.",
          message: "",
          type: "success",
          duration: 5000,
          offset: 70
        });
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.preferencesGrid {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .header {
    height: 100px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: calc(10% - 60px);
    justify-content: flex-start;
    .route {
      margin-right: calc(130px + calc(10% - 60px));
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .icon {
        font-size: 30px;
      }
      .label {
        font-family: Lato;
        font-weight: bold;
        font-size: 30px;
        margin: 0 20px;
      }
    }
    button {
      color: black;
      background-color: #fdd835;
      height: 55px;
      min-width: 130px;
      border: none;
      padding: 15px 20px;
      text-decoration: none;
      text-transform: uppercase;
      border-radius: 40px;
      font-family: Lato;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      transition: 300ms;
      &:hover {
        color: #ff5722;
      }
    }
  }
  .body {
    flex: 1;
    width: 80%;
    padding: 30px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .container {
      flex: 1;
      height: 100%;
      width: 100%;
      background-color: #e1e2e1;
      overflow: hidden;
      .settings {
        padding: 10px;
        flex: 1;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        height: calc(100% - 95px);
        overflow: hidden;
        .preference {
          flex: 1 1 1;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          margin-bottom: 4px;
          .label {
            font-family: Lato;
            font-weight: bold;
            font-size: 16px;
            margin-right: 10px;
            text-transform: uppercase;
          }
          .switch {
          }
        }
      }
      .bottom {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        padding: 10px;
        button {
          color: black;
          background-color: #ff7043;
          height: 55px;
          min-width: 130px;
          border: none;
          padding: 15px 20px;
          text-decoration: none;
          text-transform: uppercase;
          border-radius: 40px;
          font-family: Lato;
          font-size: 20px;
          font-weight: bold;
          cursor: pointer;
          transition: 300ms;
        }
      }
    }
  }
}
</style>