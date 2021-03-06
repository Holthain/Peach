export default {
  default: {
    export: "DEFAULT_Export"
  },
  Product: {
    loadProducts: "PRODUCT_loadProducts",
    productExists: "PRODUCT_productExists",
    syncToSystel: "PRODUCT_syncToSystel",
    createProduct: "PRODUCT_createProduct",
    mutateProducts: "PRODUCT_mutateProducts",
    composeProduct: "PRODUCT_composeProduct",
    deleteProducts: "PRODUCT_deleteProducts",
    inStock: "PRODUCT_inStock",
    outStock: "PRODUCT_outStock"
  },
  Sell: {
    load: "SELL_load",
    saveSell: "SELL_saveSell"
  },
  Total: {
    load: "TOTAL_load",
    makeCierre: "TOTAL_makeCierre"
  },
  Log: {
    getLog: "LOG_getLog",
    saveLog: "LOG_saveLog",
    mutateMov: "LOG_mutateMov",
    deleteMov: "LOG_deleteMov"
  },
  Chart: {
    topProducts: "CHART_topProducts",
    general: "CHART_general",
    dailySell: "CHART_dailySell",
    monthlySell: "CHART_monthlySell"
  }
};
