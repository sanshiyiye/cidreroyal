/**
 * LoadInitDataBack消息
 * Created by auto tool.
 */

'use strict';

module.exports = function (data){
  this.msgType = 10212;
  if(!_.isUndefined(data) && !_.isNull(data)){
    this.brandlist = data.brandlist || 0;
    this.carTypeList = data.carTypeList || 0;
    this.cityList = data.cityList || 0;
    this.carColorList = data.carColorList || 0;
    this.tagsList = data.tagsList || 0;
    this.carSeriesList = data.carSeriesList || 0;
    
  }
  
  this.setBrandlist = function(brandlist){
    this.brandlist = brandlist;
  };
  this.setCartypelist = function(carTypeList){
    this.carTypeList = carTypeList;
  };
  this.setCitylist = function(cityList){
    this.cityList = cityList;
  };
  this.setCarcolorlist = function(carColorList){
    this.carColorList = carColorList;
  };
  this.setTagslist = function(tagsList){
    this.tagsList = tagsList;
  };
  this.setCarserieslist = function(carSeriesList){
    this.carSeriesList = carSeriesList;
  };

  this.setResult = function(result) {
    this.ret = result;
  }
};