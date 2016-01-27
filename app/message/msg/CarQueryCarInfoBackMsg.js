/**
 * QueryCarInfoBack消息
 * Created by auto tool.
 */

'use strict';

module.exports = function (data){
  this.msgType = 10306;
  if(!_.isUndefined(data) && !_.isNull(data)){
    this.id = data.id || 0;
    this.sellId = data.sellId || 0;
    this.sellDesc = data.sellDesc || '';
    this.sellTelephone = data.sellTelephone || '';
    this.sellNickname = data.sellNickname || '';
    this.sellImg = data.sellImg || '';
    this.appraiserId = data.appraiserId || 0;
    this.appraiserDesc = data.appraiserDesc || '';
    this.apprTitle = data.apprTitle || '';
    this.apprTelephone = data.apprTelephone || '';
    this.apprNickname = data.apprNickname || '';
    this.apprImg = data.apprImg || '';
    this.brandId = data.brandId || 0;
    this.price = data.price || 0;
    this.distance = data.distance || 0;
    this.city = data.city || 0;
    this.startTime = data.startTime || '';
    this.srvPrice = data.srvPrice || 0;
    this.firstLoanPrice = data.firstLoanPrice || 0;
    this.monthLoanPrice = data.monthLoanPrice || 0;
    this.color = data.color || 0;
    this.tag = data.tag || '';
    this.seriesId = data.seriesId || 0;
    this.modelId = data.modelId || 0;
    this.modelName = data.modelName || '';
    this.carType = data.carType || 0;
    this.transmission = data.transmission || 0;
    this.imgList = data.imgList || 0;
    
  }
  
  this.setId = function(id){
    this.id = id;
  };
  this.setSellid = function(sellId){
    this.sellId = sellId;
  };
  this.setSelldesc = function(sellDesc){
    this.sellDesc = sellDesc;
  };
  this.setSelltelephone = function(sellTelephone){
    this.sellTelephone = sellTelephone;
  };
  this.setSellnickname = function(sellNickname){
    this.sellNickname = sellNickname;
  };
  this.setSellimg = function(sellImg){
    this.sellImg = sellImg;
  };
  this.setAppraiserid = function(appraiserId){
    this.appraiserId = appraiserId;
  };
  this.setAppraiserdesc = function(appraiserDesc){
    this.appraiserDesc = appraiserDesc;
  };
  this.setApprtitle = function(apprTitle){
    this.apprTitle = apprTitle;
  };
  this.setApprtelephone = function(apprTelephone){
    this.apprTelephone = apprTelephone;
  };
  this.setApprnickname = function(apprNickname){
    this.apprNickname = apprNickname;
  };
  this.setApprimg = function(apprImg){
    this.apprImg = apprImg;
  };
  this.setBrandid = function(brandId){
    this.brandId = brandId;
  };
  this.setPrice = function(price){
    this.price = price;
  };
  this.setDistance = function(distance){
    this.distance = distance;
  };
  this.setCity = function(city){
    this.city = city;
  };
  this.setStarttime = function(startTime){
    this.startTime = startTime;
  };
  this.setSrvprice = function(srvPrice){
    this.srvPrice = srvPrice;
  };
  this.setFirstloanprice = function(firstLoanPrice){
    this.firstLoanPrice = firstLoanPrice;
  };
  this.setMonthloanprice = function(monthLoanPrice){
    this.monthLoanPrice = monthLoanPrice;
  };
  this.setColor = function(color){
    this.color = color;
  };
  this.setTag = function(tag){
    this.tag = tag;
  };
  this.setSeriesid = function(seriesId){
    this.seriesId = seriesId;
  };
  this.setModelid = function(modelId){
    this.modelId = modelId;
  };
  this.setModelname = function(modelName){
    this.modelName = modelName;
  };
  this.setCartype = function(carType){
    this.carType = carType;
  };
  this.setTransmission = function(transmission){
    this.transmission = transmission;
  };
  this.setImglist = function(imgList){
    this.imgList = imgList;
  };

  this.setResult = function(result) {
    this.ret = result;
  }
};