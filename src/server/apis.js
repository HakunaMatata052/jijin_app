import Axios from "./axios";

class Api extends Axios {
  /**
   * 获取商品数据
   * @param {Object} params typeid
   */
  async sendchecknum(params = {}) {
    return await this.axios("POST", "User/smscode", params);
  }
  async register(params = {}) {
    return await this.axios("POST", "User/register", params);
  }
  async login(params = {}) {
    return await this.axios("POST", "User/login", params);
  }
  async setpassword(params = {}) {
    return await this.axios("POST", "User/pwdup", params);
  }
  async stock_type_list(params = {}) {
    return await this.axios("POST", "stock/stock_type_list", params);
  }
  async stock_list(params = {}) {
    return await this.axios("POST", "Stock/stock_list", params);
  }
  async stock_like_up(params = {}) {
    return await this.axios("POST", "Stock/stock_like_up", params);
  }
  async stock_like_list(params = {}) {
    return await this.axios("POST", "Stock/stock_like_list", params);
  }
  async stock_index(params = {}) {
    return await this.axios("POST", "Stock/stock_index", params,{LOADINGHIDE:true});
  }
  async funddetails(params = {}) {
    return await this.axios("POST", "funddetails/index", params,{LOADINGHIDE:true});
  }
  async rate(params = {}) {
    return await this.axios("POST", "rate/index", params);
  }
  async logout(params = {}) {
    return await this.axios("POST", "User/logout", params);
  }
  async stock_jingzhi_list(params = {}) {
    return await this.axios("POST", "Stock/stock_jingzhi_list", params);
  }
  async deallog(params = {}) {
    return await this.axios("POST", "Stocklog/deallog", params);
  }
  async report(params = {}) {
    return await this.axios("POST", "report/index", params);
  }
  async reportDetails(params = {}) {
    return await this.axios("POST", "report/details", params);
  }
  async income(params = {}) {
    return await this.axios("POST", "Money/income", params);
  }
  async my_money(params = {}) {
    return await this.axios("POST", "money/my_money", params);
  }
  async hotsearch(params = {}) {
    return await this.axios("POST", "hotsearch/index", params);
  }
  async fundcustomize(params = {}) {
    return await this.axios("POST", "Stock/xianjinbao", params);
  }
  async fundtheme(params = {}) {
    return await this.axios("POST", "fundtheme/index", params);
  }
  async fund_hot(params = {}) {
    return await this.axios("POST", "fundtheme/fund_hot", params);
  }
  async stockBuy(params = {}) {
    return await this.axios("POST", "Stock/stockBuy", params);
  }
  async profit(params = {}) {
    return await this.axios("POST", "Stocklog/yingkui", params);
  }
  async stockBuy(params = {}) {
    return await this.axios("POST", "Stock/stockBuy", params);
  }
  async liandong(params = {}) {
    return await this.axios("POST", "Stock/liandong", params);
  }
  async ajaxBuyState(params = {}) {
    return await this.axios("POST", "Stock/ajaxBuyState", params);
  }
  async stock_detail(params = {}) {
    return await this.axios("POST", "Stock/stock_detail", params);
  }
  async faceup(params = {}) {
    return await this.axios("POST", "User/faceup", params);
  }
  async tradepwdup_auth(params = {}) {
    return await this.axios("POST", "User/tradepwdup_auth", params);
  }
  async tradepwdup(params = {}) {
    return await this.axios("POST", "User/tradepwdup", params);
  }
  async pwdup(params = {}) {
    return await this.axios("POST", "User/pwdup", params);
  }
  async realname(params = {}) {
    return await this.axios("POST", "User/realname", params);
  }
  async bankup(params = {}) {
    return await this.axios("POST", "User/bankup", params);
  }
  async redeemIndex(params = {}) {
    return await this.axios("POST", "Redeem/index", params);
  }
  async redeemSubmit(params = {}) {
    return await this.axios("POST", "Redeem/submit", params);
  }
  async uploadfile(params = {}) {
    return await this.axios("POST", "User/upload", params);
  }
  async stock_buy_detail(params = {}) {
    return await this.axios("POST", "Stock/stock_buy_detail", params);
  }
  async buy_jingzhi(params = {}) {
    return await this.axios("POST", "Stock/buy_jingzhi", params,{LOADINGHIDE:true});
  }
  async ProfitIndex(params = {}) {
    return await this.axios("POST", "Profit/index", params);
  }
  
  async Publiccon(params = {}) {
    return await this.axios("POST", "Publiccon/index", params);
  }
  async chart_day(params = {}) {
    return await this.axios("POST", "Profit/chart_day", params);
  }
  
}



export default new Api();