<template>
  <div class="preferencesGrid">
    <div class="header">
      <button @click="goBack()">
        Volver atras
      </button>
      <div class="route">
        <div class="icon">
          <fontawesome icon="sliders-h" />
        </div>
        <div class="label">
          Preferencias
        </div>
      </div>
    </div>
    <div class="body">
      <div class="container">
        <div class="settings" v-loading="isLoading">
          <template v-for="(preference, i) in pList">
            <div :key="preference + i" class="preference">
              <!-- App name input -->
              <template v-if="preference === 'appName'">
                <div class="label">
                  {{pNames[i]}}:
                </div>
                <div class="switch">
                  <el-input placeholder="Nombre" v-model="data[preference]"/>
                </div>
              </template>
              <!-- Otras opciones -->
              <template v-else>
                <div class="label">
                  {{pNames[i]}}:
                </div>
                <div class="switch">
                  <el-switch
                    v-model="data[preference]"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                </div>
              </template>

            </div>
          </template>
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
import * as path from "path";

export default Vue.extend({
  name: "app-settings",
  mounted() {
    this.$store.dispatch(types.loadPreferences).then(() => {
      this.data = { ...this.preferences };
    });
  },
  data: () => ({
    data: {} as any,
    pList: [
      "appName",
      "systel",
      "autoStart",
      "newP",
      "mutableP",
      "deleteP",
      "recargoCreditoPorIndice"
    ] as any,
    pNames: [
      "Nombre del negocio",
      "Sincronizacion con systel",
      "Iniciar con windows",
      "Creacion de productos",
      "Modificacion de productos",
      "Eliminacion de productos",
      "Recargo por indice"
    ] as any
  }),
  computed: mapState({
    isLoading: (state: any) => state.Settings.loading,
    preferences: (state: any) => state.Settings.preferences
  }),
  methods: {
    autoStart() {
      const app = require("electron").remote.app;
      if (this.data["autoStart"]) {
        app.setLoginItemSettings({
          openAtLogin: true,
          args: ["--hidden"]
        });
      } else {
        app.setLoginItemSettings({
          openAtLogin: false
        });
      }
    },
    goBack() {
      this.$router.replace({ path: "/settings" });
    },
    save() {
      this.$store.dispatch(types.savePreferences, this.data).then(() => {
        this.autoStart();
        this.$notify({
          title: "Se han guardado las preferencias con exito.",
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